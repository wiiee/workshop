package com.workshop.domain.service;

import com.wiiee.core.domain.security.IAccessCtrl;
import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.platform.util.tree.Node;
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
public class TeamService extends BaseService<Team, String> implements IAccessCtrl {
    //团队成员的根节点
    private Set<Node<String>> rootMemberIds;
    //团队的根节点
    private Set<Node<String>> rootTeamIds;

    //所有的团队Ids
    private Set<String> teamIds;

    //各个成员的高度
    private Map<String, Integer> heights;

    @Autowired
    public TeamService(MongoRepository<Team, String> repository) {
        super(repository, Team.class);

        rootMemberIds = new HashSet<>();
        rootTeamIds = new HashSet<>();

        teamIds = new HashSet<>();
        heights = new HashMap<>();
    }

    @PostConstruct
    public void buildTree() {
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
    }

    public int getHeight(String memberId){
        if(heights.containsKey(memberId)){
            return heights.get(memberId);
        }

        return 0;
    }

    //id1是否为id2的上级
    public boolean isBoss(String id1, String id2) {
        for(Node<String> root : rootMemberIds){
            if(find(root, id1, id2, false)){
                return true;
            }
        }

        return false;
    }

    //id1, id2是否在同一条路径下面
    private boolean find(Node<String> node, String id1, String id2, boolean isFind1){
        //id1已经找着了，又找到了id2，表示在同一条路径下面
        if(isFind1 && node.getData().equals(id2)){
            return true;
        }

        //找着了id1，标记为true
        if(node.getData().equals(id1)){
            isFind1 = true;
        }

        //已经到了叶子节点，没有找到id2，重置isFind1为false
        if(node.getChildren() == null){
            isFind1 = false;
        }

        for(Node<String> child : node.getChildren()){
            if(find(child, id1, id2, isFind1)){
                return true;
            }
        }

        return false;
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
                else{
                    team.userIds.forEach(o -> {
                        if(!ownerId.equals(o)){
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

    @Override
    public boolean isAllowed(String authUserId, String opUserId) {
        if(StringUtils.isEmpty(authUserId) || StringUtils.isEmpty(opUserId)){
            return false;
        }

        return isBoss(authUserId, opUserId);
    }
}
