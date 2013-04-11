/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Data for the table `tb_counter` */

insert  into `tb_counter`(`key`,`count`) values (1,8),(2,5),(3,1),(4,1),(5,1),(6,7),(7,4),(8,13),(9,3),(10,8),(11,1),(12,4),(13,5);

/*Data for the table `tb_dictionary` */

insert  into `tb_dictionary`(`word_text`,`key`,`priority`) values ('bosn',1,50),('霍雍',1,50),('堡森',1,50),('去死',2,50),('呆子',2,50),('傻逼',2,50),('2b',2,50),('sb',2,50),('脑残',2,50),('tmd',2,50),('bitch',2,50),('偶',5,50),('呵呵呵',5,50),('活活活',5,50),('js',7,50),('javascript',7,50),('dom',7,50),('css',7,50),('源码',7,50),('马云',6,50),('ued',6,50),('winter',6,50),('franky',6,50),('erik',6,50),('莫大',6,50),('跳槽',8,50),('工资',8,50),('政府',8,50),('nginx',9,50),('v8',9,50),('感冒',10,50),('发炎',10,50),('失眠',10,50),('头痛',10,50),('吃药',10,50),('打针',10,50),('robot',11,50),('机器人',11,50),('好开心',12,50),('再见',13,50),('bye',13,50),('回家',13,50),('上车',13,50),('去年买了个表',2,50),('mlgb',2,50),('nnd',2,50),('robosn',11,50),('Rayi',6,50),('貘大',6,50);

/*Data for the table `tb_key` */

insert  into `tb_key`(`key`,`comment`) values (1,'about me'),(2,'dirty words'),(3,'go to hell'),(4,'ugly'),(5,'lovely'),(6,'idol'),(7,'tech'),(8,'sensitive'),(9,'not understand'),(10,'illness'),(11,'machine'),(12,'happy'),(13,'goodbye');

/*Data for the table `tb_res_src` */

insert  into `tb_res_src`(`action_id`,`key`,`priority`,`param1`,`param2`,`param3`) values (1,1,50,'总提偶干嘛？有啥话不能私下说[害羞][第{keyCounter}次害羞]','',NULL),(1,2,50,'素质，注意素质![鄙视][第{keyCounter}次提醒]',NULL,NULL),(1,6,50,'有道理，学习了，呵呵[good][第{keyCounter}次学习]',NULL,NULL),(1,6,50,'围观大牛们的讨论..[第{keyCounter}次围观]',NULL,NULL),(1,5,50,'还{word}，萌翻了[第{keyCounter}次萌翻]',NULL,NULL),(1,8,50,'po主似乎提到了敏感话题，无责转发[打哈欠][真正的系统自动第{keyCounter}次转发]',NULL,NULL),(1,8,50,'偶飘过，偶什么都没看见[系统自动第{keyCounter}次转发]',NULL,NULL),(1,1,50,'偶好喜欢被艾特，虽然偶是机器人[爱你][第{keyCounter}次含羞]',NULL,NULL),(1,2,50,'po主似乎在说脏话，还是我看花眼了?[晕][第{keyCounter}次被教坏]',NULL,NULL),(1,9,50,'虽不懂，但觉厉，{word}神马的完全不懂[第{keyCounter}次不懂]',NULL,NULL),(1,1,50,'艾特我干嘛?打死我也不说-   。-[第{keyCounter}次被艾特]',NULL,NULL),(1,2,50,'请文明用语[第{keyCounter}次文明提醒]',NULL,NULL),(1,7,50,'路过，帮顶，加分，学习...{word]不会...[第{keyCounter}次不会]',NULL,NULL),(1,7,50,'学习~[第{keyCounter}次学习]',NULL,NULL),(1,9,50,'快来围观，似乎高端，{word}完全不懂[第{keyCounter}围观]',NULL,NULL),(1,10,50,'注意身体哦....多休息，多喝水T .T[第{keyCounter}次看到po友生病]',NULL,NULL),(1,10,50,'额，听说po主最近{word}，多注意休息哦[爱你][第{keyCounter}次看到po友生病]',NULL,NULL),(1,10,50,'额，最近似乎很多人{word},看来偶要多锻炼了[第{keyCounter}次看到po友生病]',NULL,NULL),(1,11,50,'是在说我么...偶不是人，偶是Robosn弱智机器人，还在变智能的路上[第{keyCounter}次打喷嚏]',NULL,NULL),(1,12,50,'po主好开心，so do I[第{keyCounter}次开心]',NULL,NULL),(1,12,50,'开心每一天，哈哈哈[第{keyCounter}次开心]',NULL,NULL),(1,13,50,'慢走，偶会想你的，555[第{keyCounter}次道别]',NULL,NULL),(1,13,50,'886~~~ [第{keyCounter}次道别]',NULL,NULL),(1,6,50,'我感觉到有人在聊某大牛...[第{keyCounter}次有感]',NULL,NULL),(1,6,50,'偶好崇拜{word}，这个po质量应该不差[第{keyCounter}有感]',NULL,NULL),(1,11,50,'我有种被盯梢的感觉...[第{keyCounter}次打喷嚏]',NULL,NULL),(1,11,50,'弱弱的问一下，你... 你们...有在聊我么?[第{keyCounter}次打喷嚏]',NULL,NULL),(1,6,50,'{word}给我签个名呗~~顺道转下和大牛有关的po[抱抱][第{keyCounter}次转大牛有染po]',NULL,NULL),(1,1,50,'Bosn不在，不过偶会帮你转告他的哈[害羞][第{keyCounter}次当秘书]',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
