## 1.版本控制

### 1.2常见的版本控制工具

主流的版本控制器有如下这些：

- **Git**
- **SVN**（Subversion）
- **CVS**（Concurrent Versions System）
- **VSS**（Micorosoft Visual SourceSafe）
- **TFS**（Team Foundation Server）
- Visual Studio Online

​	版本控制产品非常的多（Perforce、Rational ClearCase、RCS（GNU Revision Control System）、Serena Dimention、SVK、BitKeeper、Monotone、Bazaar、Mercurial、SourceGear Vault），现在影响力最大且使用最广泛的是Git与SVN



### 1.3版本控制分类

#### **1.3.1 本地版本控制**

记录文件每次的更新，可以对每个版本做一个快照，或是记录补丁文件，适合个人用，如RCS。

![image-20220325165002684](https://tse2-mm.cn.bing.net/th/id/OIP-C.jl4pPK40IUmDL_-Wu0yMqgHaEK?w=324&h=182&c=7&r=0&o=5&dpr=1.1&pid=1.7)



#### **1.3.2集中版本控制  SVN**

​	所有的版本数据都保存在服务器上，协同开发者从服务器上同步更新或上传自己的修改


​**所有的版本数据都存在服务器上**，用户的本地只有自己以前所同步的版本，如果不连网的话，用户就看不到历史版本，也无法切换版本验证问题，或在不同分支工作。而且，所有数据都保存在单一的服务器上，有很大的风险这个服务器会损坏，这样就会丢失所有的数据，当然可以定期备份。代表产品：SVN、CVS、VSS

| 表头 | 内容     |
| ---- | -------- |
| key1 | content1 |
| key2 | content2 |



## 2.Git 环境配置

### 2.1Git配置

所有的配置文件，其实都保存在本地！

查看配置 git config -l


查看不同级别的配置文件：

```java
#查看系统config
git config --system --list
　　
#查看当前用户（global）配置
git config --global  --list
```


