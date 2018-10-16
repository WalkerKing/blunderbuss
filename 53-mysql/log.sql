mysql> desc admin_user
    -> ;
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| user_name | char(20)     | NO   |     |         |                |
| password  | varchar(255) | NO   |     |         |                |
| role      | int(11)      | NO   |     | 0       |                |
| enable    | tinyint(1)   | NO   |     | 0       |                |
+-----------+--------------+------+-----+---------+----------------+
5 rows in set (0.01 sec)

mysql> 
mysql> 
mysql> 
mysql> 
mysql> Terminal close -- exit!
Aborted
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| hb                 |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.01 sec)

mysql> use hb;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
+--------------+
1 row in set (0.00 sec)

mysql> desc admin_user;
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| user_name | char(20)     | NO   |     |         |                |
| password  | varchar(255) | NO   |     |         |                |
| role      | int(11)      | NO   |     | 0       |                |
| enable    | tinyint(1)   | NO   |     | 0       |                |
+-----------+--------------+------+-----+---------+----------------+
5 rows in set (0.01 sec)

mysql> insert into admin_user (id, user_name, password, role) values (2, 'abc', '123456', 'manager')
    -> ;
ERROR 1366 (HY000): Incorrect integer value: 'manager' for column 'role' at row 1
mysql> insert into admin_user (id, user_name, password, role) values (2, 'abc', 'abc123', 123)
    -> ;
Query OK, 1 row affected (0.01 sec)

mysql> select * from admin_user;
+----+-----------+----------+------+--------+
| id | user_name | password | role | enable |
+----+-----------+----------+------+--------+
|  2 | abc       | abc123   |  123 |      0 |
|  6 | admin     | admin    |    0 |      1 |
+----+-----------+----------+------+--------+
2 rows in set (0.00 sec)

mysql> insert into admin_user (user_name, password, role) values ('bcd', '123456', 1);
Query OK, 1 row affected (0.01 sec)

mysql> select * from admin_user;
+----+-----------+----------+------+--------+
| id | user_name | password | role | enable |
+----+-----------+----------+------+--------+
|  2 | abc       | abc123   |  123 |      0 |
|  6 | admin     | admin    |    0 |      1 |
|  7 | bcd       | 123456   |    1 |      0 |
+----+-----------+----------+------+--------+
3 rows in set (0.00 sec)

mysql> insert into admin_user (user_name, password) values ('ab', '123ab'), ('ac', '123ac'), ('bc', '123bc');
Query OK, 3 rows affected (0.01 sec)
Records: 3  Duplicates: 0  Warnings: 0

mysql> select * from admin_user;
+----+-----------+----------+------+--------+
| id | user_name | password | role | enable |
+----+-----------+----------+------+--------+
|  2 | abc       | abc123   |  123 |      0 |
|  6 | admin     | admin    |    0 |      1 |
|  7 | bcd       | 123456   |    1 |      0 |
|  8 | ab        | 123ab    |    0 |      0 |
|  9 | ac        | 123ac    |    0 |      0 |
| 10 | bc        | 123bc    |    0 |      0 |
+----+-----------+----------+------+--------+
6 rows in set (0.00 sec)

mysql> exit
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| hb                 |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

mysql> use hb;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
+--------------+
1 row in set (0.01 sec)

mysql> desc admin_user;
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| user_name | char(20)     | NO   |     |         |                |
| password  | varchar(255) | NO   |     |         |                |
| role      | int(11)      | NO   |     | 0       |                |
| enable    | tinyint(1)   | NO   |     | 0       |                |
+-----------+--------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)

mysql> select * from admin_user;
+----+-----------+----------+------+--------+
| id | user_name | password | role | enable |
+----+-----------+----------+------+--------+
|  2 | abc       | abc123   |  123 |      0 |
|  6 | admin     | admin    |    0 |      1 |
|  7 | bcd       | 123456   |    1 |      0 |
|  8 | ab        | 123ab    |    0 |      0 |
|  9 | ac        | 123ac    |    0 |      0 |
| 10 | bc        | 123bc    |    0 |      0 |
+----+-----------+----------+------+--------+
6 rows in set (0.00 sec)

mysql> inset into admin_user values (null, 'cd', '123bdd', 1, 1);
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'inset into admin_user values (null, 'cd', '123bdd', 1, 1)' at line 1
mysql> insert into admin_user values (null, 'cd', '123bdd', 1, 1);
Query OK, 1 row affected (0.01 sec)

mysql> select * from admin_user;
+----+-----------+----------+------+--------+
| id | user_name | password | role | enable |
+----+-----------+----------+------+--------+
|  2 | abc       | abc123   |  123 |      0 |
|  6 | admin     | admin    |    0 |      1 |
|  7 | bcd       | 123456   |    1 |      0 |
|  8 | ab        | 123ab    |    0 |      0 |
|  9 | ac        | 123ac    |    0 |      0 |
| 10 | bc        | 123bc    |    0 |      0 |
| 11 | cd        | 123bdd   |    1 |      1 |
+----+-----------+----------+------+--------+
7 rows in set (0.00 sec)

mysql> update admin_user set enble = 2 where id = 2
    -> ;
ERROR 1054 (42S22): Unknown column 'enble' in 'field list'
mysql> update admin_user set enable = 2 where id = 2;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select * from admin_user;
+----+-----------+----------+------+--------+
| id | user_name | password | role | enable |
+----+-----------+----------+------+--------+
|  2 | abc       | abc123   |  123 |      2 |
|  6 | admin     | admin    |    0 |      1 |
|  7 | bcd       | 123456   |    1 |      0 |
|  8 | ab        | 123ab    |    0 |      0 |
|  9 | ac        | 123ac    |    0 |      0 |
| 10 | bc        | 123bc    |    0 |      0 |
| 11 | cd        | 123bdd   |    1 |      1 |
+----+-----------+----------+------+--------+
7 rows in set (0.00 sec)

mysql> 
mysql> delete from admin_user where enable=2
    -> ;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    4
Current database: hb

Query OK, 1 row affected (0.02 sec)

mysql> select * from admin_user'
    '> ;
    '> ^C
mysql> select * from admin_user;
+----+-----------+----------+------+--------+
| id | user_name | password | role | enable |
+----+-----------+----------+------+--------+
|  6 | admin     | admin    |    0 |      1 |
|  7 | bcd       | 123456   |    1 |      0 |
|  8 | ab        | 123ab    |    0 |      0 |
|  9 | ac        | 123ac    |    0 |      0 |
| 10 | bc        | 123bc    |    0 |      0 |
| 11 | cd        | 123bdd   |    1 |      1 |
+----+-----------+----------+------+--------+
6 rows in set (0.00 sec)

mysql> delete from admin_user where enable=0 and role=1;
Query OK, 1 row affected (0.01 sec)

mysql> select * from admin_user;
+----+-----------+----------+------+--------+
| id | user_name | password | role | enable |
+----+-----------+----------+------+--------+
|  6 | admin     | admin    |    0 |      1 |
|  8 | ab        | 123ab    |    0 |      0 |
|  9 | ac        | 123ac    |    0 |      0 |
| 10 | bc        | 123bc    |    0 |      0 |
| 11 | cd        | 123bdd   |    1 |      1 |
+----+-----------+----------+------+--------+
5 rows in set (0.00 sec)

mysql> exit
mysql> create table 'class' ( 'sname' varchar(20) not null commit '用户名', 'age' tinyint(4) not null default 0 commit '年龄', 'score' tinyint(3) unsigned not null default 0 commit '学分', )engine=innodb auto_increment = 6 default charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''class' ( 'sname' varchar(20) not null commit '用户名', 'age' tinyint(4) not ' at line 1
mysql> create table 'class' ( 'sname' varchar(20) not null, 'age' tinyint(4) not null default 0 commit '年龄', 'score' tinyint(3) unsigned not null default 0 commit '学分', )engine=innodb auto_increment = 6 default charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''class' ( 'sname' varchar(20) not null, 'age' tinyint(4) not null default 0 comm' at line 1
mysql> create table 'class' ( 'sname' varchar(20) not null, 'age' tinyint(4) not null default '0' commit '年龄', 'score' tinyint(3) unsigned not null default 0 commit '学分', )engine=innodb auto_increment = 6 default charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''class' ( 'sname' varchar(20) not null, 'age' tinyint(4) not null default '0' co' at line 1
mysql> 
mysql> 
mysql> show tables;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    4
Current database: hb

+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
| salary       |
+--------------+
2 rows in set (0.01 sec)

mysql> create table 'class' ( 'sname' varchar(20) not null, 'age' tinyint(4) not null default '0' commit '年龄', 'score' tinyint(3) unsigned not null default 0 commit '学分', )engine=innodb auto_increment = 6 default charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''class' ( 'sname' varchar(20) not null, 'age' tinyint(4) not null default '0' co' at line 1
mysql> create table 'class' ( 'sname' char(20) not null, 'age' tinyint(4) not null default '0' commit '年龄', 'score' tinyint(3) unsigned not null default 0 commit '学分', )engine=innodb auto_increment = 6 default charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''class' ( 'sname' char(20) not null, 'age' tinyint(4) not null default '0' commi' at line 1
mysql> 
mysql> 
mysql> create table 'class' ( 'sname' char(20) not null comment '用户名', 'age' tinyint(4) not null default '0' comment '年龄', 'score' tinyint(3) unsigned not null default 0 comment '学分', )engine=innodb auto_increment = 6 default charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''class' ( 'sname' char(20) not null comment '用户名', 'age' tinyint(4) not nu' at line 1
mysql> create table 'class' ( sname char(20) not null comment '用户名', 'age' tinyint(4) not null default '0' comment '年龄', 'score' tinyint(3) unsigned not null default 0 comment '学分', )engine=innodb auto_increment = 6 default charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''class' ( sname char(20) not null comment '用户名', 'age' tinyint(4) not null' at line 1
mysql> create table 'class' ( sname char(20) not null comment '用户名', 'age' tinyint(4) not null default '0' comment '年龄', 'score' tinyint(3) unsigned not null default 0 comment '学分', )engine=myisam charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''class' ( sname char(20) not null comment '用户名', 'age' tinyint(4) not null' at line 1
mysql> create table class ( sname char(20) not null comment '用户名', 'age' tinyint(4) not null default '0' comment '年龄', 'score' tinyint(3) unsigned not null default 0 comment '学分', )engine=myisam charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''age' tinyint(4) not null default '0' comment '年龄', 'score' tinyint(3) unsig' at line 1
mysql> create table class ( sname char(20) not null comment '用户名', age tinyint(4) not null default '0' comment '年龄', 'score' tinyint(3) unsigned not null default 0 comment '学分', )engine=myisam charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''score' tinyint(3) unsigned not null default 0 comment '学分', )engine=myisam ' at line 1
mysql> create table class ( sname char(20) not null comment '用户名', age tinyint(4) not null default '0' comment '年龄', score tinyint(3) unsigned not null default 0 comment '学分', )engine=myisam charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ')engine=myisam charset = utf8' at line 1
mysql> create table class ( sname char(20) not null comment '用户名', age tinyint(4) not null default '0' comment '年龄', score tinyint(3) unsigned not null default 0 comment '学分', )engine myisam charset = utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ')engine myisam charset = utf8' at line 1
mysql> create table class ( sname char(20) not null comment '用户名', age tinyint(4) not null default '0' comment '年龄', score tinyint(3) unsigned not null default 0 comment '学分', )engine myisam charset utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ')engine myisam charset utf8' at line 1
mysql> create table class ( sname char(20) not null comment '用户名', age tinyint(4) not null default '0' comment '年龄', score tinyint(3) unsigned not null default 0 comment '学分' )engine myisam charset utf8;
Query OK, 0 rows affected (0.02 sec)

mysql> show tables'
    '> ;
    '> ^C
mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
| class        |
| salary       |
+--------------+
3 rows in set (0.00 sec)

mysql> drop table class
    -> ;
Query OK, 0 rows affected (0.01 sec)

mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
| salary       |
+--------------+
2 rows in set (0.00 sec)

mysql> create table "class" ( "sname" char(20) not null comment '用户名', age tinyint(4) not null default '0' comment '年龄', score tinyint(3) unsigned not null default 0 comment '学分' )engine myisam charset utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '"class" ( "sname" char(20) not null comment '用户名', age tinyint(4) not null' at line 1
mysql> create table "class" ( sname char(20) not null comment '用户名', age tinyint(4) not null default '0' comment '年龄', score tinyint(3) unsigned not null default 0 comment '学分' )engine myisam charset utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '"class" ( sname char(20) not null comment '用户名', age tinyint(4) not null d' at line 1
mysql> create table `class` ( sname char(20) not null comment '用户名', age tinyint(4) not null default '0' comment '年龄', score tinyint(3) unsigned not null default 0 comment '学分' )engine myisam charset utf8;
Query OK, 0 rows affected (0.03 sec)

mysql> desc class;
+-------+---------------------+------+-----+---------+-------+
| Field | Type                | Null | Key | Default | Extra |
+-------+---------------------+------+-----+---------+-------+
| sname | char(20)            | NO   |     | NULL    |       |
| age   | tinyint(4)          | NO   |     | 0       |       |
| score | tinyint(3) unsigned | NO   |     | 0       |       |
+-------+---------------------+------+-----+---------+-------+
3 rows in set (0.00 sec)

mysql> insert into class (sname, age) values (123,123)
    -> ;
Query OK, 1 row affected (0.00 sec)

mysql> select * from class;
+-------+-----+-------+
| sname | age | score |
+-------+-----+-------+
| 123   | 123 |     0 |
+-------+-----+-------+
1 row in set (0.00 sec)

mysql> alter table class age1 tinyint(1) not null default 0;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'age1 tinyint(1) not null default 0' at line 1
mysql> alter table `class` age1 tinyint(1) not null default 0;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'age1 tinyint(1) not null default 0' at line 1
mysql> alter table `class` `age1` tinyint(1) not null default 0;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '`age1` tinyint(1) not null default 0' at line 1
mysql> alter table class add age1 tinyint(1) not null default 0;
Query OK, 1 row affected (0.03 sec)
Records: 1  Duplicates: 0  Warnings: 0

mysql> desc class;
+-------+---------------------+------+-----+---------+-------+
| Field | Type                | Null | Key | Default | Extra |
+-------+---------------------+------+-----+---------+-------+
| sname | char(20)            | NO   |     | NULL    |       |
| age   | tinyint(4)          | NO   |     | 0       |       |
| score | tinyint(3) unsigned | NO   |     | 0       |       |
| age1  | tinyint(1)          | NO   |     | 0       |       |
+-------+---------------------+------+-----+---------+-------+
4 rows in set (0.00 sec)

mysql> insert into class (sname, age1) values ('M的意思', 3);
Query OK, 1 row affected (0.00 sec)

mysql> select * from class;
+------------+-----+-------+------+
| sname      | age | score | age1 |
+------------+-----+-------+------+
| 123        | 123 |     0 |    0 |
| M的意思    |   0 |     0 |    3 |
+------------+-----+-------+------+
2 rows in set (0.00 sec)

mysql> insert into class (sname, age1) values ('再看', 99);
Query OK, 1 row affected (0.00 sec)

mysql> select * from class;
+------------+-----+-------+------+
| sname      | age | score | age1 |
+------------+-----+-------+------+
| 123        | 123 |     0 |    0 |
| M的意思    |   0 |     0 |    3 |
| 再看       |   0 |     0 |   99 |
+------------+-----+-------+------+
3 rows in set (0.00 sec)

mysql> 
mysql> 
mysql> 
mysql> 
mysql> alter table add snum smallint(5) zerofill not null default 0;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'add snum smallint(5) zerofill not null default 0' at line 1
mysql> alter table class add snum smallint(5) zerofill not null default 0;
Query OK, 3 rows affected (0.03 sec)
Records: 3  Duplicates: 0  Warnings: 0

mysql> select * from class;
+------------+-----+-------+------+-------+
| sname      | age | score | age1 | snum  |
+------------+-----+-------+------+-------+
| 123        | 123 |     0 |    0 | 00000 |
| M的意思    |   0 |     0 |    3 | 00000 |
| 再看       |   0 |     0 |   99 | 00000 |
+------------+-----+-------+------+-------+
3 rows in set (0.00 sec)

mysql> insert into class (sname, snum) values (zerofill, 222)
    -> ;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'zerofill, 222)' at line 1
mysql> insert into class (sname, snum) values ('zerofill', 222);
Query OK, 1 row affected (0.00 sec)

mysql> select * from class;
+------------+-----+-------+------+-------+
| sname      | age | score | age1 | snum  |
+------------+-----+-------+------+-------+
| 123        | 123 |     0 |    0 | 00000 |
| M的意思    |   0 |     0 |    3 | 00000 |
| 再看       |   0 |     0 |   99 | 00000 |
| zerofill   |   0 |     0 |    0 | 00222 |
+------------+-----+-------+------+-------+
4 rows in set (0.00 sec)

mysql> desc class'
    '> ^C
mysql> desc class ;
+-------+-------------------------------+------+-----+---------+-------+
| Field | Type                          | Null | Key | Default | Extra |
+-------+-------------------------------+------+-----+---------+-------+
| sname | char(20)                      | NO   |     | NULL    |       |
| age   | tinyint(4)                    | NO   |     | 0       |       |
| score | tinyint(3) unsigned           | NO   |     | 0       |       |
| age1  | tinyint(1)                    | NO   |     | 0       |       |
| snum  | smallint(5) unsigned zerofill | NO   |     | 00000   |       |
+-------+-------------------------------+------+-----+---------+-------+
5 rows in set (0.00 sec)

mysql> create table salary (
    -> sname varchar(10) not null default '',
    -> gongzi float (6,2),
    -> )engine myisam charset utf8;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    5
Current database: hb

ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ')engine myisam charset utf8' at line 4
mysql> create table salary ( sname varchar(10) not null default '', gongzi float (6,2))engine myisam charset utf8;
ERROR 1050 (42S01): Table 'salary' already exists
mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
| class        |
| salary       |
+--------------+
3 rows in set (0.01 sec)

mysql> select * from salary;
Empty set (0.00 sec)

mysql> drop table salary;
Query OK, 0 rows affected (0.01 sec)

mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
| class        |
+--------------+
2 rows in set (0.01 sec)

mysql> create table salary ( sname varchar(10) not null default '', gongzi float (6,2))engine myisam charset utf8;
Query OK, 0 rows affected (0.02 sec)

mysql> insert into salary values('张三', -100.01);
Query OK, 1 row affected (0.01 sec)

mysql> insert into salary values('李四', 999.78);
Query OK, 1 row affected (0.00 sec)

mysql> select * from salary;
+--------+---------+
| sname  | gongzi  |
+--------+---------+
| 张三   | -100.01 |
| 李四   |  999.78 |
+--------+---------+
2 rows in set (0.01 sec)

mysql> alter table salary add bonus float(5,2) unsigned not null default 0.00;
Query OK, 2 rows affected (0.03 sec)
Records: 2  Duplicates: 0  Warnings: 0

mysql> desc salary;
+--------+---------------------+------+-----+---------+-------+
| Field  | Type                | Null | Key | Default | Extra |
+--------+---------------------+------+-----+---------+-------+
| sname  | varchar(10)         | NO   |     |         |       |
| gongzi | float(6,2)          | YES  |     | NULL    |       |
| bonus  | float(5,2) unsigned | NO   |     | 0.00    |       |
+--------+---------------------+------+-----+---------+-------+
3 rows in set (0.01 sec)

mysql> insert into salary (sname, bonus) values ('王五', 999);
Query OK, 1 row affected (0.00 sec)

mysql> select * from salary;
+--------+---------+--------+
| sname  | gongzi  | bonus  |
+--------+---------+--------+
| 张三   | -100.01 |   0.00 |
| 李四   |  999.78 |   0.00 |
| 王五   |    NULL | 999.00 |
+--------+---------+--------+
3 rows in set (0.00 sec)

mysql> create table ca_test (
    -> ca char(6) not null default '',
    -> vca varchar(6) not null default ''
    -> )engine myisam charset utf8;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    6
Current database: hb

Query OK, 0 rows affected (0.04 sec)

mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
| ca_test      |
| class        |
| salary       |
+--------------+
4 rows in set (0.01 sec)

mysql> select * from ca_test;
Empty set (0.01 sec)

mysql> insert into ca_test values('hello', 'hello');
Query OK, 1 row affected (0.00 sec)

mysql> select * from ca_test;
+-------+-------+
| ca    | vca   |
+-------+-------+
| hello | hello |
+-------+-------+
1 row in set (0.00 sec)

mysql> select concat(ca,'!'),concat(vca, '!') from test;
ERROR 1146 (42S02): Table 'hb.test' doesn't exist
mysql> select concat(ca,'!'),concat(vca, '!') from ca_test;
+----------------+------------------+
| concat(ca,'!') | concat(vca, '!') |
+----------------+------------------+
| hello!         | hello!           |
+----------------+------------------+
1 row in set (0.01 sec)

mysql> insert into ca_test values('aa', 'aa');
Query OK, 1 row affected (0.00 sec)

mysql> select concat(ca,'!'),concat(vca, '!') from ca_test;
+----------------+------------------+
| concat(ca,'!') | concat(vca, '!') |
+----------------+------------------+
| hello!         | hello!           |
| aa!            | aa!              |
+----------------+------------------+
2 rows in set (0.00 sec)

mysql> insert into ca_test values('aa', 'aa ');
Query OK, 1 row affected (0.00 sec)

mysql> insert into ca_test values('aa ', 'aa ');
Query OK, 1 row affected (0.00 sec)

mysql> select concat(ca,'!'),concat(vca, '!') from ca_test;
+----------------+------------------+
| concat(ca,'!') | concat(vca, '!') |
+----------------+------------------+
| hello!         | hello!           |
| aa!            | aa!              |
| aa!            | aa !             |
| aa!            | aa !             |
+----------------+------------------+
4 rows in set (0.00 sec)

mysql> insert into ca_test ('中国人','华夏民族源头');
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''中国人','华夏民族源头')' at line 1
mysql> insert into ca_test values ('中国人','华夏民族源头');
Query OK, 1 row affected (0.00 sec)

mysql> select * from ca_test'
    '> ^C
mysql> select * from ca_test;
+-----------+--------------------+
| ca        | vca                |
+-----------+--------------------+
| hello     | hello              |
| aa        | aa                 |
| aa        | aa                 |
| aa        | aa                 |
| 中国人    | 华夏民族源头       |
+-----------+--------------------+
5 rows in set (0.00 sec)

mysql> insert into va_test values('hello', 'pretty-woman');
ERROR 1146 (42S02): Table 'hb.va_test' doesn't exist
mysql> insert into ca_test values('hello', 'pretty-woman');
ERROR 1406 (22001): Data too long for column 'vca' at row 1
