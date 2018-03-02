export enum Phase {
    ToDo,
    //调查
    Analysis,
    //代码中
    InProgress,
    //被阻塞
    Blocked,
    //代码Review中
    Reviewing,
    //完成，发布到生产中
    Deployed
}