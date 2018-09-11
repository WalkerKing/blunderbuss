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
