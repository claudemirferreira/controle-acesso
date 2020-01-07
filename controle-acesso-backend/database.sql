DROP TABLE IF EXISTS `site`.`user`;
CREATE TABLE  `site`.`user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `autorizado` varchar(1) DEFAULT NULL,
  `perfil` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;