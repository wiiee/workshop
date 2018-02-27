package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.domain.service.ServiceResult;
import com.wiiee.core.platform.exception.CoreException;
import com.wiiee.core.platform.util.tree.Node;
import com.workshop.domain.constant.Role;
import com.workshop.domain.entity.user.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TeamService extends BaseService<Team, String> {
    //团队成员的根节点
    private Set<Node<String>> rootMemberIds;
    //团队的根节点
    private Set<Node<String>> rootTeamIds;

    //所有的团队Ids
    private Set<String> teamIds;

    //各个成员的高度
    private Map<String, Integer> heights;

    //下属名单
    private Map<String, Set<String>> subordinates;

    @Autowired
    private UserService userService;

    @Autowired
    public TeamService(MongoRepository<Team, String> repository) {
        super(repository);

        rootMemberIds = new HashSet<>();
        rootTeamIds = new HashSet<>();

        teamIds = new HashSet<>();
        heights = new HashMap<>();

        subordinates = new HashMap<>();
    }

    private void clear() {
        rootMemberIds.clear();
        rootTeamIds.clear();
        teamIds.clear();
        heights.clear();
        subordinates.clear();
    }

    @PostConstruct
    public void buildTree() {
        clear();

        List<Team> teams = get().datum;

        for (Team team : teams) {
            getOrBuildParentNode(team, teams);
        }

        //移除掉非根节点
        rootTeamIds = rootTeamIds.stream().filter(o -> o.getParent() == null).collect(Collectors.toSet());

        //根据部门节点部署成员节点
        rootTeamIds.forEach(o -> buildMemberTree(null, o, teams));

        //计算各个成员的高度
        rootMemberIds.forEach(o -> {
            Set<Node<String>> leaves = new HashSet<>();
            o.buildLeaves(null, leaves);

            Set<String> memberIds = new HashSet<>();
            o.buildDescendants(null, o.getData(), memberIds);

            memberIds.forEach(p -> {
                heights.put(p, o.getHeight(leaves, p));
            });
        });

        rootMemberIds.forEach(o -> {
            Set<String> parents = new HashSet<>();
            buildSubordinates(parents, o);
        });
    }

    @Override
    public ServiceResult<Team> update(Team entity) {
        ServiceResult<Team> result = super.update(entity);
        buildTree();
        return result;
    }

    @Override
    public ServiceResult<Team> delete(String id) {
        ServiceResult<Team> result = super.delete(id);
        buildTree();
        return result;
    }

    @Override
    public ServiceResult<Team> create(Team entity) {
        if(entity == null){
            return ServiceResult.getByException(CoreException.EXCEPTION_NULL_PARAMETERS);
        }

//        if (entity.parentId != null) {
//            entity.parentId = entity.parentId.trim();
//            if (entity.parentId.equals("")) {
//                entity.parentId = null;
//            }
//        }

        if (entity.parentId != null) {
            Team parentTeam = get(entity.parentId).data;

            //检查父Team，存在更新父Team的成员，不存在就返回异常
            if (parentTeam != null) {
                boolean isOwnersExist = true;

                for (String ownerId : entity.ownerIds) {
                    if (!parentTeam.userIds.contains(ownerId)) {
                        parentTeam.userIds.add(ownerId);
                        isOwnersExist = false;
                    }
                }

                if (!isOwnersExist) {
                    super.update(parentTeam);
                }
            } else {
                return ServiceResult.getByException(CoreException.EXCEPTION_INVALID_DATA);
            }
        }

        ServiceResult<Team> result = super.create(entity);
        buildTree();
        return result;
    }

    private void buildSubordinates(Set<String> parents, Node<String> node) {
        if (node.getChildren().isEmpty()) {
            return;
        } else {
            //保存当前父节点
            Set<String> rawParents = new HashSet<>(parents);

            for (Node<String> child : node.getChildren()) {
                //恢复当前父节点
                parents = new HashSet<>(rawParents);

                //所有子节点加入当前父节点的儿子
                parents.add(node.getData());
                parents.forEach(o -> {
                    if (subordinates.containsKey(o)) {
                        subordinates.get(o).add(child.getData());
                    } else {
                        subordinates.put(o, new HashSet<>(Arrays.asList(child.getData())));
                    }
                });

                //递归计算子节点
                buildSubordinates(parents, child);
            }
        }
    }

    public int getHeight(String memberId) {
        if (heights.containsKey(memberId)) {
            return heights.get(memberId);
        }

        return 0;
    }

    //id1是否为id2的上级
    public boolean isBoss(String id1, String id2) {
        if (StringUtils.isEmpty(id1) || StringUtils.isEmpty(id2)) {
            return false;
        }

        return subordinates.containsKey(id1) && subordinates.get(id1).contains(id2);
    }

    //parent为员工父节点，node为部门节点
    private void buildMemberTree(Node<String> parent, Node<String> node, List<Team> teams) {
        Team team = teams.stream().filter(o -> o.getId().equals(node.getData())).findFirst().orElse(null);

        if (team != null) {
            for (String ownerId : team.ownerIds) {
                Node<String> ownerNode = new Node<>(ownerId);

                if (parent == null) {
                    rootMemberIds.add(ownerNode);
                } else {
                    parent.addChild(ownerNode);
                }

                //存在子节点时，继续向下遍历
                if (!CollectionUtils.isEmpty(node.getChildren())) {
                    node.getChildren().forEach(o -> buildMemberTree(ownerNode, o, teams));
                }
                //没有子节点时，添加成员
                else {
                    team.userIds.forEach(o -> {
                        if (!ownerId.equals(o)) {
                            Node<String> userNode = new Node<>(o);
                            ownerNode.addChild(userNode);
                        }
                    });
                }
            }
        }
    }

    private Node<String> getOrBuildParentNode(Team team, List<Team> teams) {
        //team不存在，跳过
        if (team == null) {
            return null;
        }

        //该节点没有创建过，就创建
        if (!teamIds.contains(team.getId())) {
            //创建节点，添加到树里面
            Node<String> node = new Node<>(team.getId());
            rootTeamIds.add(node);
            teamIds.add(team.getId());

            if (team.parentId != null) {
                Team parentTeam = teams.stream().filter(o -> o.getId().equals(team.parentId)).findFirst().orElse(null);
                Node<String> parentNode = getOrBuildParentNode(parentTeam, teams);

                if (parentNode != null) {
                    parentNode.addChild(node);
                }
            }

            return node;
        }
        //该节点创建过，直接返回即可
        else {
            return rootTeamIds.stream().filter(o -> o.getData().equals(team.getId())).findFirst().orElse(null);
        }
    }

    public boolean isAllowed(String authUserId, String opUserId) {
        if (StringUtils.isEmpty(authUserId) || StringUtils.isEmpty(opUserId)) {
            return false;
        }

        if (authUserId.equals(opUserId) || userService.get(authUserId).data.role == Role.Admin) {
            return true;
        }

        return isBoss(authUserId, opUserId);
    }
}
