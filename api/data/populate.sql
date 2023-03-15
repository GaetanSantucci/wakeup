INSERT INTO public.plate(name, subtitle, description, image, price, slug)
	VALUES ( 'plateau sunshine', 'Conseillé pour 2-3 personnes', '3 viennoiseries artisanales\n
			Pain artisanal tranché\n 6 mini crêpes vanillées (fait-maison)\n Cake saveur vanille (fait-maison)\n Fruits frais\n 1 bouteille de jus d''orange frais (pressé maison de 25cl)\n Pâte à tartiner et confiture (Alain Milliat)', 
			'http://localhost:3000/images/sunshine.jpg',
			29.90, 
			'sunshine'),
			( 'plateau veggie', 'Conseillé pour 2-3 personnes', 
			'3 viennoiseries artisanales\n Pain artisanal tranché\n 6 mini crêpes vanillées (fait-maison)\n 6 madeleines aux pépites de chocolat (fait-maison)\n Cake saveur vanille (fait-maison)\n 4 gaufres salées emmental, tomates séchées et basilic frais (fait-maison)\n Cream cheese à l''huile d''olive et basilic frais\n
			Fruits frais, légumes croquants\n 1 bouteille de jus d''orange frais (pressé maison de 25cl)\n Pâte à tartiner et confiture (Alain Milliat)', 
			'http://localhost:3000/images/veggie.jpg', 
 			34.90, 
 			'veggie'),
			( 'plateau best-seller', 'Conseillé pour 2-3 personnes', 
			'3 viennoiseries artisanales\n Pain artisanal tranché\n 6 mini crêpes vanillées (fait-maison)\n 4 madeleines aux pépites de chocolat (fait-maison)\n Cake saveur vanille (fait-maison)\n 4 gaufres salées emmental, tomates séchées et basilic frais (fait-maison)\n 4 crescentine (petits pains italien fait-maison) au jambon Serrano 			affinage 12 mois\n Cantal entre deux AOP (lait cru)\n 
			Fruits frais, légumes croquants\n 1 bouteille de jus d''orange frais (pressé maison de 25cl)\n Pâte à tartiner et confiture (Alain Milliat)', 
			'http://localhost:3000/images/bestseller.jpg', 
 			42.90, 
 			'bestseller'),
			( 'plateau dolce vita', 'Conseillé pour 2-3 personnes', 
			'3 viennoiseries artisanales\n Pain artisanal tranché\n 6 mini crêpes vanillées (fait-maison)\n 4 madeleines aux pépites de chocolat (fait-maison)\n Cake saveur vanille (fait-maison)\n 4 gaufres salées emmental, tomates séchées et basilic frais (fait-maison)\n 4 crescentines (petits pains italien fait-maison) au jambon de 			Parme\n Jambon de Parme 16 mois d''affinage\n 
			Pecorino DOP (fromage de brebis au lait pasteurisé) et Burrata à l''huile d''olive\n Fruits frais, légumes croquants et olives vertes\n Pâte à tartiner et confiture (Alain Milliat)', 
			'http://localhost:3000/images/dolcevita.jpg', 
 			49.90, 
 			'dolcevita'),
			( 'plateau apéritif', 'Conseillé pour 4-5 personnes', 
			'Pain artisanal tranché\n 6 gaufres salées emmental, tomates séchées et basilic frais (fait-maison)\n Cantal entre deux AOP (lait cru)\n Bleu d''Auvergne AOP (lait cru)\n Bûche cendrée au lait de chèvre\n Jambon Serrano\n Bresaola (boeuf séché)\n Pistaches et figues séchées\n Fruits frais, légumes croquants et olives vertes\n 			Confiture (Alain Milliat) et miel (de notre apiculteur local)', 
			'http://localhost:3000/images/aperitive.jpg', 
 			69.90, 
 			'aperitif');

INSERT INTO public.addon_sales(
	name, subtitle, description, image, price)
	VALUES ('jus d''orange pressé', '', 'Bouteille de 25cl de jus d''orange frais pressé maison', 'http://localhost:3000/images/orange.jpeg', 3.90),
	('prosecco riccadonna', '', 'Bouteille de Prosecco Riccadona de 20cl', 'http://localhost:3000/images/prosecco.jpeg', 6.90),
	('thé noir dammann', '', 'Sachet de the noir breakfast dammann', 'http://localhost:3000/images/the_dammann.jpeg', 0.90);

	INSERT INTO public.plate_has_addon_sales(
	addon_sales_id, plate_id)
	VALUES (1, 1),
	(3, 1),
	(1, 2),
	(3, 2),
	(1, 3),
	(2, 3),
	(3, 3),
	(1, 4),
	(2, 4),
	(2, 5);

	INSERT INTO public.blog(
	title, description, image, interaction, slug)
	VALUES ('Découvrez nos plateaux', 'Succombez à  nos plateaux gourmands, élégants et raffinés et passez un moment convivial et de partage avec vos proches. \n Nous sélectionnons des produits gourmands, et de qualité pour vous proposer le meilleur. \n Vous pouvez également accompagner vos plateaux brunch avec une bouteille de Prosecco Riccadonna. Ce vin blanc pétillant aux fines bulles caractérisé par sa fraicheur et ses notes fruitées accompagnera parfaitement l''un de nos brunch ou notre plateau apéritif.', 'http://localhost:3000/images/brunch_dolce.webp', 'Découvrir', 'plateau'),
	('Offrez un moment de partage unique', 'Surprenez vos proches et offrez leur un petit-déjeuner gourmand livré à domicile ! Une idée originale pour un anniversaire ou pour les fêtes de fin d''année. \n Notre carte cadeau prête à offrir sera parfaite pour n''importe quelles occasions avec une jolie carte cadeau et son enveloppe élégante voila le cadeau parfait pour offrir un cadeau original et très gourmand ! \n N''hésitez pas à nous contactez par mail à contact@wakeupbox.fr ou à nous faire votre demande dans la rubrique Contact.', 'http://localhost:3000/images/carte_cadeau.webp', 'En savoir plus', 'prestation#carte_cadeau'),
	('Pour vos évènements', 'WAKE UP vous accompagne pour vos évènements tel qu''un anniversaire, un baptême, pour un apéritif dinatoire ou un lendemain de mariage.\n Nous sommes disponibles pour échanger avec vous concernant vos envies pour cet évènement.\n Pour toute demande, merci de nous contacter au minimum 2 semaines à l''avance.', 'http://localhost:3000/images/plateau_aperitif_homepage.jpg', 'Contact', 'contact'),
	('Pour vos entreprises', 'Découvrez nos plateaux business pour vos petits-déjeuners d''entreprise, vos réunions, vos teams building ou tout autre évènement d''entreprise. \n Du petit-déjeuner classique au petit-déjeuner avec une touche salée, nos plateaux s''adapterons à toutes les envies. \n Livraison pour une commande minimum de 5 personnes.Pour toute demande, merci de nous contacter au minimum 2 semaines à l''avance.', 'http://localhost:3000/images/business_homepage.jpeg', 'En savoir plus', 'prestation');

INSERT INTO public.review (description, author, date, star)
	VALUES ('Comment ne pas mettre 5 étoiles? Déjà c''est incroyablement beau. Plein de couleur et de relief. Et puis tout est très bon. Des viennoiseries aux fruits, du pain aux fromages etc... Rien n''est laissé au hasard. Bref à ne pas louper. Juste incroyable', 'AurelASM', '02-2023', 5),
					('Commande ce jour d’un plateau best seller, incroyablement complet et variés et surtout, produits de qualité extrêmement bons!', 'Ludwig D.', '02-2023', 5),
					('Que dire de plus si ce n´est parfait 👌 Le froid est venu frapper à notre porte quand soudain Wake up est arrivé ! De la chaleur et des douceurs au petit déjeuner préparées avec sincérité et qualité. C´était une surprise pour un anniversaire qui débuta dans l´originalité, la simplicité le tout fait maison, de saison et avec raison. Je recommencerai sans hésiter !👏', 'Johanna R', '01-2023', 5),
					('Parfait! Des produits frais et fait maison et un joli packagin pour offrir ou se faire plaisir !^^', 'Rachel B.', '12-2022', 5),
					('Une équipe au top, très arrangeante et gentille ! Petit déjeuner livré à domicile dans une jolie box un vrai moment de douceur et gourmandise ! Des fruits de saison, des viennoiseries, crêpes madeleines délicieuses, jus d’orange frais… très copieux et gourmand et plein d’autres petits plaisirs salés… et les gaufres sont mon coup de cœur 😉 Je recommande à 100%', 'Nadia E.', '11-2022', 5),
					('On s''est régalé, un vrai moment de partage et de bonheur en famille ! Merci encore ! On se fera ça de nouveau rapidement 😄', 'Lise B.', '11-2022', 5),
					('Comme d''habitude, expérience au top : produits délicieux, choisis et cuisinés avec soin, box de qualité et joliment présentée. Quantités plus que généreuse, au top !', 'Lucas M.', '12-2022', 5),
					('Nous avons pris la box Best Sellers et c’était vraiment parfait. On sent que que les produits sont frais et fait maison. C’est très complet, varié en sucré et salé et pour 2 personnes c’est le top. On s’est régalé. Je recommande ☺️', 'Johanna G.', '11-2022', 5),
					('Profiter d''un dimanche cocooning avec un délicieux brunch en famille. La box est joliment présentée, les produits sont excellents et de qualité (crêpes, gâteau, madelaines, etc. fait maison)Vivement la prochaine commande!', 'Fanny M.', '11-2022', 5),
					('Nous avons pris le plateau DOLCE VITA et nous n’avons pas été déçu! Une box complète avec du sucré et du salé qui nous a totalement comblé, ce qui est sûr, c’est qu’on recommandera', 'Tamara E.', '11-2022', 5),
					('Plateau brunch délicieux et copieux. Des produits frais et de qualité ! La présentation est magnifique, c’est aussi beau que bon :-), l’heure de livraison est parfaitement respectée. Tout est parfait. Déjà hâte de passer une nouvelle commande.', 'Anne-Sophie M.', '11-2022', 5),
					('Petit déjeuner bien présenté, délicieux, et personne en charge de la livraison très aimable !!!', 'MI R', '10-2022', 5),
					('Box brunch au top, livraison sympathique à l''heure annoncée. On avait choisi la box à 39euro, le contenu est d''un bon rapport qualité/prix. Si on pinaille, on aurait apprécié quelques crudités (carottes ?) pour aller avec la sauce et une bouteille de jus un peu plus grande, c''était juste pour deux. À mon sens les pailles biodégradables sont sympathiques mais superflues. Dans l''ensemble c''était donc très bien, je recommande ! :D', 'Maïlys D.', '10-2022', 5),
					('Qu’est ce qu’on s’est régalés ! Petits et grands ! Vous pouvez y aller les yeux fermés ! Merci à l’équipe WAKE UP !', 'Thomas L.', '10-2022', 5),
					('Très beau rendu visuel, produits supers gourmands, livraison parfaite et horaires respectées ! Super moment passé entre copines.', 'Laetitia M.', '09-2022', 5),
					('C''est la 3 ème fois que nous prenons cette box et c''est toujours super bon , des produits de qualité et prix juste . Bravo 👏', 'Stéphane M.', '09-2022', 5),
					('J''ai commandé une box sucrée. Il s''agit de ma 3 ème dégustation Wake Up et la qualité est toujours au RDV. La box est super bien garnie et présentée. Les viennoiseries ont un feuilletage de dingue, et les fruits sont délicieux. Encore merci ☺️ à une prochaine fois !', 'Lion Lulu', '07-2022', 5),
					('La box Dreamy porte bien son nom ! C''était un rêve de déguster ce délicieux petit déjeuner, tout est parfait, bien présenté, très complet, service au top, je recommande +++ c''était pour faire une surprise pour un anniversaire, et bien c''est réussi ! J''ai hâte de refaire ma prochaine commande ! Merci à vous', 'Océane', '05-2022', 5),
					('Avons partagé à 2 le brunch, ce fut un délice. Fait de viennoiserie fait maison et de produits annexes de d''excellentes qualités, pâte à tartiner et confiture. La livraison a été effectuée dans les temps impartis avec en prime le sourire de la personne qui nous a livrée. Excellente première expérience, sûr je renouvellerai l''expérience sans hésiter. Merci à toute l''équipe Wakeup', 'Myriam T.', '01-2022', 5),
					('Je suis très satisfait du service. J''ai acheté un petit-déjeuner pour mon petit ami d''Argentine et la livraison a été un succès. Ils ont inclus un message personnel que je leur ai demandé de faire, ils sont arrivés à l''heure et la meilleure chose était que les produits étaient très bons. Ils m''ont fait me sentir proche de mon petit ami lors d''une journée spéciale et ils ont parfaitement compris ce dont j''avais besoin. Je recommande ce service à 100%.', 'Nadia G.', '03-2022', 5);

INSERT INTO public.delivery_area(city, zipcode, price)
	VALUES ('Aulnat','63510',3.5),
		('Lussat','63360',3.5),
		('Riom','63200',5.5),
		('Chamalières','63400',3.5),
		('Clermont-Fd','63100',3.5),
		('Clermont-Fd','63000',3.5),
		('Beaumont','63110',5.5),
		('Pont du Château','63430',3.5),
		('Gerzat','63360',3.5),
		('Aubière','63170',3.5),
		('Lempdes','63370',3.5),
		('Romagnat','63540',5.5),
		('Cébazat','63118',3.5),
		('Ceyrat','63122',5.5),
		('Le Cendre','63670',5.5),
		('Royat','63130',5.5),
		('Les Martres de Veyre','63730',5.5),
		('Mozac','63200',5.5),
		('Blanzat','63112',3.5),
		('Orcines','63870',5.5),
		('Châteaugay','63119',5.5),
		('Orcet','63670',5.5),
		('Pérignat lès Sarliève ','63170',5.5),
		('Pérignat sur Allier','63800',5.5),
		('Ennezat','63720',5.5),
		('Sayat','63530',5.5),
		('Mezel','63115',5.5),
		('Saint-Beauzire','63360',3.5),
		('Les Martres d''Artière','63430',3.5),
		('Durtol','63830',3.5),
		('Nohanent','63830',3.5),
		('Ménétrol','63200',5.5),
		('Chappes','63720',3.5),
		('Dallet','63111',3.5),
		('Malauzat','63200',5.5),
		('Joze','63350',5.5),
		('Malintrat','63510',3.5),
		('Chavaroux','63720',3.5),
		('Cournon d''Auvergne','63800',5.5);