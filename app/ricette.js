// Ricette dei piatti, cercate per nome (minuscolo). Dosi per 2 adulti e 2 bambini piccoli.
// passi: testo semplice, oppure [testo, impostazioni Bimby] con le impostazioni separate da " · "
// (tempo · temperatura · velocità · antiorario), come nell'app del Bimby.
self.RICETTE = {
  'pastina e piselli in brodo (bimby)': {
    tempo: '40 min', bimby: true,
    dosi: ['pastina 150 g', 'piselli surgelati 150 g', '1 carota, 1 costa di sedano, ½ cipolla piccola, 1 patata (verdure per il brodo)', 'acqua 1100 g', 'olio extravergine 10 g', 'sale q.b.', 'parmigiano grattugiato per servire'],
    passi: [
      ['Lava e pela le verdure, tagliale a pezzi e mettile nel boccale con l’olio.', '5 sec · vel. 5'],
      ['Aggiungi l’acqua e un pizzico di sale.', '20 min · 100° · vel. 1'],
      ['Aggiungi i piselli.', '4 min · 100° · cucchiaio'],
      ['Aggiungi la pastina e cuoci per il tempo scritto sulla confezione.', '6 min · 100° · cucchiaio'],
      'Lascia riposare 2 minuti e servi con il parmigiano.'
    ]
  },
  'pasta al pomodoro con tonno e zucchine': {
    tempo: '25 min',
    dosi: ['pasta 280 g', 'passata di pomodoro 400 g', 'tonno al naturale 2 scatolette (160 g sgocciolato)', 'zucchine 2', 'olio extravergine 3 cucchiai', 'sale q.b.'],
    passi: [
      'Metti sul fuoco una pentola d’acqua per la pasta.',
      'Lava le zucchine e tagliale a cubetti piccoli.',
      'In una padella larga scalda l’olio, aggiungi le zucchine e un pizzico di sale e cuoci 8 minuti a fuoco medio, mescolando ogni tanto.',
      'Aggiungi la passata e cuoci 10 minuti a fuoco basso.',
      'Quando l’acqua bolle sala e butta la pasta.',
      'Due minuti prima che la pasta sia pronta aggiungi al sugo il tonno sgocciolato e sbriciolato.',
      'Scola la pasta, versala nella padella e mescola per 1 minuto a fuoco vivace.'
    ]
  },
  'pasta e ceci (bimby)': {
    tempo: '30 min', bimby: true,
    dosi: ['pasta corta piccola (ditalini) 200 g', 'ceci cotti 2 barattoli (480 g sgocciolati)', 'carota 1', 'aglio 1 spicchio', 'rosmarino 1 rametto', 'olio extravergine 30 g più un filo a crudo', 'acqua 900 g', 'sale q.b.'],
    passi: [
      ['Metti nel boccale la carota a pezzi e l’aglio sbucciato.', '5 sec · vel. 5'],
      ['Riporta tutto sul fondo con la spatola, aggiungi l’olio.', '3 min · 120° · vel. 1'],
      ['Aggiungi i ceci sciacquati e gli aghi di rosmarino.', '2 min · 120° · vel. 1 · antiorario'],
      ['Aggiungi l’acqua e il sale.', '10 min · 100° · vel. 1'],
      ['Frulla appena, per avere metà crema e metà ceci interi.', '10 sec · vel. 5'],
      ['Aggiungi la pasta e cuoci 1 minuto più di quanto dice la confezione. Non si scola: la pasta cuoce nel brodo e lo assorbe.', '11 min · 100° · cucchiaio'],
      'Lascia riposare 2 minuti nel boccale, poi servi con un filo d’olio a crudo.'
    ]
  },
  'pasta zucca e ricotta': {
    tempo: '35 min',
    dosi: ['pasta corta 280 g', 'zucca pulita 500 g', 'ricotta 200 g', 'cipolla ½', 'parmigiano grattugiato 40 g', 'olio extravergine 2 cucchiai', 'sale q.b.'],
    passi: [
      'Taglia la cipolla finissima e la zucca a cubetti.',
      'In una padella scalda l’olio e cuoci la cipolla 5 minuti a fuoco dolce.',
      'Aggiungi la zucca, un pizzico di sale e mezzo bicchiere d’acqua. Copri e cuoci 15 minuti, finché la zucca si schiaccia con la forchetta.',
      'Intanto metti sul fuoco l’acqua per la pasta, salala quando bolle e butta la pasta.',
      'Schiaccia la zucca con la forchetta (o frullala col minipimer), spegni il fuoco e aggiungi ricotta e parmigiano.',
      'Scola la pasta tenendo da parte un mestolo d’acqua di cottura, versala nella padella e mescola, aggiungendo un po’ d’acqua se è troppo densa.'
    ]
  },
  'pollo al forno con patate e carote': {
    tempo: '1 ora',
    dosi: ['cosce o sovracosce di pollo 800 g', 'patate 700 g', 'carote 3', 'rosmarino 2 rametti', 'olio extravergine 4 cucchiai', 'sale q.b.'],
    passi: [
      'Accendi il forno a 200° (190° se ventilato).',
      'Pela patate e carote e tagliale a pezzi simili, non troppo grandi.',
      'Mettile in una teglia con olio, sale e rosmarino e mescola con le mani.',
      'Appoggia sopra il pollo, salalo e ungilo con un filo d’olio.',
      'Inforna per 50 minuti; a metà gira il pollo e mescola le verdure.',
      'Il pollo è pronto quando, bucandolo vicino all’osso, il succo esce trasparente e non rosa.',
      'Prima di servire togli pelle e ossa ai pezzi dei bambini e taglia la carne a pezzetti.'
    ]
  },
  'frittata di zucchine al forno con pane': {
    tempo: '35 min',
    dosi: ['uova 6', 'zucchine 2', 'parmigiano grattugiato 40 g', 'olio extravergine 2 cucchiai', 'sale q.b.', 'pane per accompagnare'],
    passi: [
      'Accendi il forno a 180° e fodera una teglia di circa 24 cm con carta forno.',
      'Taglia le zucchine a rondelle sottili e cuocile in padella con l’olio e un pizzico di sale per 7 minuti.',
      'In una ciotola sbatti le uova con il parmigiano e un pizzico di sale.',
      'Unisci le zucchine alle uova, mescola e versa nella teglia.',
      'Inforna per 20–25 minuti: è pronta quando è soda al centro e dorata sopra.',
      'Servi a fette con il pane.'
    ]
  },
  'polpette al sugo con piselli (bimby)': {
    tempo: '45 min', bimby: true,
    dosi: ['carne macinata 400 g', 'uovo 1', 'pangrattato 40 g', 'parmigiano grattugiato 30 g', 'passata di pomodoro 500 g', 'piselli surgelati 200 g', 'cipolla ½ (50 g)', 'olio extravergine 20 g', 'acqua 100 g', 'sale q.b.', 'pane per la scarpetta'],
    passi: [
      'In una ciotola impasta con le mani carne, uovo, pangrattato, parmigiano e un pizzico di sale. Forma polpette piccole, grandi come una noce, e mettile nel Varoma (anche sul vassoio).',
      ['Metti la cipolla nel boccale.', '5 sec · vel. 5'],
      ['Riporta sul fondo con la spatola, aggiungi l’olio.', '3 min · 120° · vel. 1'],
      'Aggiungi passata, piselli, acqua e un pizzico di sale.',
      ['Chiudi il boccale, appoggia sopra il Varoma con le polpette e il suo coperchio.', '25 min · Varoma · vel. 1 · antiorario'],
      'Togli il Varoma, versa le polpette nel boccale e mescola piano con la spatola.',
      ['Lascia insaporire le polpette nel sugo.', '3 min · 100° · cucchiaio'],
      'Servi con il pane.'
    ]
  },
  'pasta al pesto': {
    tempo: '15 min',
    dosi: ['pasta 280 g', 'pesto 1 vasetto (circa 130 g)', 'parmigiano grattugiato per servire', 'sale q.b.'],
    passi: [
      'Metti sul fuoco una pentola d’acqua, salala quando bolle e butta la pasta.',
      'Metti il pesto in una ciotola grande e allungalo con 2–3 cucchiai d’acqua di cottura della pasta.',
      'Scola la pasta, versala nella ciotola e mescola bene.',
      'Servi con il parmigiano.'
    ]
  },
  'minestrone con pasta e fagioli (bimby)': {
    tempo: '45 min', bimby: true,
    dosi: ['verdure per minestrone surgelate 600 g', 'fagioli borlotti cotti 1 barattolo (240 g sgocciolati)', 'pasta corta piccola 150 g', 'olio extravergine 20 g più un filo a crudo', 'acqua 800 g', 'sale q.b.', 'parmigiano grattugiato per servire'],
    passi: [
      ['Metti l’olio nel boccale.', '2 min · 120° · vel. 1'],
      ['Aggiungi le verdure surgelate, l’acqua e il sale.', '25 min · 100° · cucchiaio'],
      ['Aggiungi i fagioli sciacquati e la pasta e cuoci per il tempo della confezione. Non si scola: è una minestra.', '9 min · 100° · cucchiaio'],
      'Lascia riposare 5 minuti, poi servi con olio a crudo e parmigiano.'
    ]
  },
  'petto di pollo con riso e verdure': {
    tempo: '30 min',
    dosi: ['petto di pollo 500 g', 'riso 240 g', 'zucchine 2', 'carote 2', 'olio extravergine 3 cucchiai', 'sale q.b.'],
    passi: [
      'Metti sul fuoco una pentola d’acqua salata e, quando bolle, cuoci il riso per il tempo della confezione (di solito 15 minuti).',
      'Taglia le carote a rondelle sottili e le zucchine a cubetti; taglia il pollo a bocconcini.',
      'In una padella larga scalda l’olio, aggiungi le carote con 3 cucchiai d’acqua e cuoci 5 minuti.',
      'Aggiungi zucchine e pollo con un pizzico di sale e cuoci 10 minuti a fuoco medio, mescolando, finché il pollo è bianco anche dentro.',
      'Scola il riso, versalo nella padella e mescola 1 minuto.'
    ]
  },
  'salmone al forno con patate e fagiolini': {
    tempo: '45 min',
    dosi: ['filetti di salmone 500 g', 'patate 600 g', 'fagiolini 300 g (anche surgelati)', 'limone 1', 'olio extravergine 4 cucchiai', 'sale q.b.'],
    passi: [
      'Accendi il forno a 200°.',
      'Pela le patate, tagliale a spicchi, mettile in teglia con olio e sale e inforna per 20 minuti.',
      'Intanto lessa i fagiolini in acqua salata per 8 minuti (10 se surgelati) e scolali.',
      'Togli la teglia, sposta le patate di lato, appoggia il salmone, salalo, aggiungi qualche fetta di limone e un filo d’olio. Inforna per altri 15 minuti.',
      'Prima di servire controlla bene che nei pezzi dei bambini non ci siano spine. Condisci i fagiolini con olio e sale.'
    ]
  },
  'pizza con verdure': {
    tempo: '30 min',
    dosi: ['impasto per pizza pronto 1 confezione (circa 500 g)', 'passata di pomodoro 200 g', 'mozzarella 250 g', 'zucchine 2', 'olio extravergine 2 cucchiai', 'sale q.b.'],
    passi: [
      'Accendi il forno al massimo (230–250°, statico) e tira fuori la mozzarella dal frigo: tagliala a cubetti e lasciala scolare.',
      'Stendi l’impasto sulla teglia con la sua carta forno.',
      'Condisci la passata con olio e un pizzico di sale e spalmala sull’impasto.',
      'Aggiungi le zucchine tagliate a rondelle sottilissime.',
      'Inforna nella parte bassa per 10 minuti.',
      'Aggiungi la mozzarella e inforna altri 5–8 minuti, finché i bordi sono dorati.'
    ]
  },
  'pasta ricotta e spinaci': {
    tempo: '25 min',
    dosi: ['pasta 280 g', 'spinaci surgelati 300 g', 'ricotta 250 g', 'parmigiano grattugiato 40 g', 'olio extravergine 1 cucchiaio', 'sale q.b.'],
    passi: [
      'Metti sul fuoco l’acqua per la pasta.',
      'In una padella cuoci gli spinaci con l’olio, 3 cucchiai d’acqua e un pizzico di sale per 10 minuti, finché sono morbidi e asciutti.',
      'Tritali finemente col coltello (o col minipimer) e mettili in una ciotola grande con ricotta e parmigiano.',
      'Sala l’acqua che bolle e cuoci la pasta.',
      'Allunga la crema con un mestolo d’acqua di cottura, scola la pasta, versala nella ciotola e mescola.'
    ]
  },
  'pasta e lenticchie (bimby)': {
    tempo: '50 min', bimby: true,
    dosi: ['lenticchie secche piccole 150 g (non serve l’ammollo)', 'pasta corta piccola 150 g', 'carota 1, costa di sedano 1, cipolla ½ (in tutto circa 100 g)', 'olio extravergine 20 g più un filo a crudo', 'acqua 1000 g', 'sale q.b.'],
    passi: [
      'Sciacqua bene le lenticchie sotto l’acqua corrente.',
      ['Metti nel boccale carota, sedano e cipolla a pezzi.', '5 sec · vel. 5'],
      ['Riporta sul fondo con la spatola, aggiungi l’olio.', '3 min · 120° · vel. 1'],
      ['Aggiungi lenticchie e acqua.', '30 min · 100° · cucchiaio'],
      ['Aggiungi il sale e la pasta e cuoci per il tempo della confezione. Non si scola: la pasta cuoce nel brodo e lo assorbe. Se è troppo densa aggiungi 100 g d’acqua.', '9 min · 100° · cucchiaio'],
      'Lascia riposare 5 minuti e servi con un filo d’olio.'
    ]
  },
  'tacchino al limone con riso e carote': {
    tempo: '30 min',
    dosi: ['fettine di tacchino 500 g', 'limone 1', 'farina 2 cucchiai', 'riso 240 g', 'carote 3', 'olio extravergine 3 cucchiai', 'sale q.b.'],
    passi: [
      'Metti sul fuoco una pentola d’acqua salata. Quando bolle aggiungi le carote a rondelle e dopo 5 minuti il riso; cuoci per il tempo della confezione.',
      'Spremi il limone. Passa le fettine nella farina da entrambi i lati, scuotendo quella in più.',
      'In una padella larga scalda l’olio e cuoci le fettine 2–3 minuti per lato, poi sala.',
      'Aggiungi il succo di limone e mezzo bicchiere d’acqua e cuoci altri 2 minuti, finché si forma una cremina.',
      'Scola riso e carote, condiscili con un filo d’olio e servi accanto al tacchino, tagliato a pezzetti per i bambini.'
    ]
  },
  'orata al forno con patate e pomodorini': {
    tempo: '45 min',
    dosi: ['filetti di orata 500 g (chiedi al banco di sfilettarla)', 'patate 600 g', 'pomodorini 250 g', 'limone 1', 'olio extravergine 4 cucchiai', 'sale q.b.'],
    passi: [
      'Accendi il forno a 200°.',
      'Pela le patate, tagliale a fette sottili, mettile in teglia con olio e sale e inforna per 20 minuti.',
      'Taglia i pomodorini a metà.',
      'Togli la teglia, appoggia sopra le patate i filetti con la pelle in basso, i pomodorini, sale, qualche fetta di limone e un filo d’olio.',
      'Inforna per 12–15 minuti, finché il pesce si sfalda con la forchetta.',
      'Controlla bene che non ci siano spine nei pezzi dei bambini.'
    ]
  },
  'merluzzo al forno con patate e zucchine': {
    tempo: '45 min',
    dosi: ['filetti di merluzzo 500 g (se surgelati, scongelati in frigo dalla sera prima)', 'patate 600 g', 'zucchine 2', 'limone 1', 'olio extravergine 4 cucchiai', 'sale q.b.'],
    passi: [
      'Accendi il forno a 200°.',
      'Pela le patate, tagliale a cubetti, mettile in teglia con olio e sale e inforna per 20 minuti.',
      'Taglia le zucchine a rondelle e asciuga bene il merluzzo con carta da cucina.',
      'Aggiungi in teglia zucchine e merluzzo, sala, irrora con succo di limone e un filo d’olio.',
      'Inforna per 15 minuti, finché il pesce è bianco e si sfalda.',
      'Controlla che non ci siano spine prima di servire.'
    ]
  },
  'uova strapazzate con spinaci e pane': {
    tempo: '20 min',
    dosi: ['uova 6', 'spinaci surgelati 300 g', 'parmigiano grattugiato 2 cucchiai', 'olio extravergine 2 cucchiai', 'sale q.b.', 'pane 4 fette'],
    passi: [
      'In una padella antiaderente cuoci gli spinaci con l’olio, 3 cucchiai d’acqua e un pizzico di sale per 10 minuti, finché sono asciutti. Tritali grossolanamente nella padella.',
      'Sbatti le uova con il parmigiano e un pizzico di sale.',
      'Versa le uova sugli spinaci a fuoco basso e mescola con una spatola per 3–4 minuti, finché sono ben cotte e asciutte.',
      'Intanto tosta il pane (tostapane o padella) e servi.'
    ]
  },
  'tortellini in brodo con verdure': {
    tempo: '25 min',
    dosi: ['tortellini 300 g', 'brodo di carne 1,2 litri (pronto, o acqua con 1 dado)', 'carote 2', 'zucchina 1', 'parmigiano grattugiato per servire'],
    passi: [
      'Taglia carote e zucchina a cubetti piccolissimi.',
      'Porta a bollore il brodo, aggiungi le verdure e cuoci 10 minuti a fuoco medio.',
      'Aggiungi i tortellini e cuocili per il tempo della confezione (di solito 4–5 minuti).',
      'Servi con il parmigiano. Ai bambini lascia intiepidire il piatto qualche minuto.'
    ]
  },
  'pasta zucchine e uova': {
    tempo: '25 min',
    dosi: ['pasta 280 g', 'zucchine 3', 'uova 3', 'parmigiano grattugiato 50 g', 'olio extravergine 3 cucchiai', 'sale q.b.'],
    passi: [
      'Metti sul fuoco l’acqua per la pasta.',
      'Taglia le zucchine a rondelle sottili e cuocile in una padella larga con l’olio e un pizzico di sale per 10 minuti.',
      'In una ciotola sbatti le uova con il parmigiano.',
      'Sala l’acqua che bolle e cuoci la pasta. Scolala tenendo da parte un mestolo d’acqua di cottura.',
      'Versa la pasta nella padella con le zucchine, a fuoco basso, aggiungi le uova e mescola continuamente per 1–2 minuti, finché le uova si rapprendono e sono cotte. Se serve aggiungi un po’ d’acqua di cottura.'
    ]
  },
  'risotto piselli e prosciutto cotto (bimby)': {
    tempo: '30 min', bimby: true,
    dosi: ['riso Carnaroli 300 g', 'piselli surgelati 200 g', 'prosciutto cotto a dadini 100 g', 'cipolla ½ (50 g)', 'olio extravergine 20 g', 'brodo vegetale 800 g (o acqua con 1 dado)', 'parmigiano grattugiato 40 g'],
    passi: [
      ['Metti la cipolla nel boccale.', '5 sec · vel. 5'],
      ['Riporta sul fondo con la spatola, aggiungi l’olio.', '3 min · 120° · vel. 1'],
      ['Aggiungi il riso, senza misurino.', '3 min · 120° · vel. 1 · antiorario'],
      ['Aggiungi piselli e brodo. Al posto del misurino metti il cestello sul coperchio.', '16 min · 100° · vel. 1 · antiorario'],
      ['Aggiungi prosciutto cotto e parmigiano.', '1 min · vel. 1 · antiorario'],
      'Versa in una ciotola e lascia riposare 2 minuti prima di servire.'
    ]
  },
  'hamburger al forno con patate e zucchine': {
    tempo: '45 min',
    dosi: ['hamburger 4 (circa 500 g)', 'patate 600 g', 'zucchine 2', 'rosmarino 1 rametto', 'olio extravergine 4 cucchiai', 'sale q.b.'],
    passi: [
      'Accendi il forno a 200°.',
      'Pela le patate, tagliale a cubetti, mettile in teglia con olio, sale e rosmarino e inforna per 20 minuti.',
      'Taglia le zucchine a rondelle e aggiungile in teglia con gli hamburger sopra.',
      'Inforna per 15 minuti, girando gli hamburger a metà. Devono essere ben cotti anche dentro, senza parti rosa.'
    ]
  },
  'crema di lenticchie rosse e carote (bimby) con crostini': {
    tempo: '35 min', bimby: true,
    dosi: ['lenticchie rosse decorticate 200 g', 'carote 2 (150 g)', 'patata 1 (150 g)', 'cipolla ½ (50 g)', 'olio extravergine 20 g più un filo a crudo', 'acqua 800 g', 'sale q.b.', 'pane per i crostini 4 fette'],
    passi: [
      'Sciacqua le lenticchie sotto l’acqua corrente.',
      ['Metti nel boccale carote e cipolla a pezzi.', '5 sec · vel. 5'],
      ['Riporta sul fondo con la spatola, aggiungi l’olio.', '3 min · 120° · vel. 1'],
      ['Aggiungi la patata a cubetti, le lenticchie, l’acqua e il sale.', '20 min · 100° · vel. 1'],
      ['Frulla portando la velocità piano piano da 4 a 8, così la crema calda non schizza.', '1 min · vel. 4→8'],
      'Intanto taglia il pane a cubetti e tostalo in forno a 200° per 8 minuti (o in padella).',
      'Servi la crema con un filo d’olio e i crostini.'
    ]
  },
  'risotto zucca e ceci (bimby)': {
    tempo: '35 min', bimby: true,
    dosi: ['riso Carnaroli 300 g', 'zucca pulita 300 g', 'ceci cotti 200 g (sgocciolati)', 'cipolla ½ (50 g)', 'olio extravergine 20 g', 'brodo vegetale 800 g (o acqua con 1 dado)', 'parmigiano grattugiato 40 g'],
    passi: [
      ['Metti la cipolla nel boccale.', '5 sec · vel. 5'],
      ['Riporta sul fondo con la spatola, aggiungi l’olio.', '3 min · 120° · vel. 1'],
      ['Aggiungi la zucca a pezzi e tritala.', '4 sec · vel. 4'],
      ['Cuoci la zucca.', '4 min · 120° · vel. 1'],
      ['Aggiungi il riso, senza misurino.', '3 min · 120° · vel. 1 · antiorario'],
      ['Aggiungi brodo e ceci sciacquati. Al posto del misurino metti il cestello sul coperchio.', '16 min · 100° · vel. 1 · antiorario'],
      ['Aggiungi il parmigiano.', '1 min · vel. 1 · antiorario'],
      'Versa in una ciotola e lascia riposare 2 minuti prima di servire.'
    ]
  }
};
