# Auditoria de veracidade — Portal Católico (relatório interno)

Documento interno; não é exibido no site.

## Corrigidos

### Sacramentos (`src/lib/data/sacramentos.ts`)
- **Confirmação — ministro.** Antes: "O ministro ordinário é o bispo, embora o presbítero possa confirmar em circunstâncias determinadas pelo direito." Problema: impreciso quanto às hipóteses previstas no direito. Agora: bispo como ministro ordinário no rito latino (CIC § 1312); presbíteros conforme cân. 883 (batismo de adultos, recepção na plena comunhão); qualquer sacerdote em perigo de morte (cân. 883, § 3; 884); prática oriental junto ao Batismo. Fontes: CIC §§ 1285-1321, 1312-1314; CDC cân. 882-884.
- **Matéria e forma** (Batismo, Eucaristia, Penitência, Confirmação, Ordem, Unção). Antes: apresentadas como fórmula direta. Agora: explicitadas como categorias da teologia sacramental tradicional. Fonte: CIC §§ 1131, 1145-1155 (sinal sacramental).
- **Matrimônio — ministro.** Reforçado: na Igreja Latina os próprios esposos são os ministros pelo consentimento (cân. 1057); o sacerdote/diácono assiste como testemunha qualificada exigida para validade (cân. 1108); nas Igrejas Orientais católicas a bênção do sacerdote é requerida.
- **Unção dos Enfermos.** Removida imprecisão sobre "idealmente"/matéria vaga. Agora: perigo por doença grave ou idade avançada (CIC § 1514; cân. 1004), repetição possível, óleo vegetal bento, unção da fronte e das mãos no rito romano, ministros apenas bispos e presbíteros (cân. 1003; Tg 5,14).

### Catecismo (`src/routes/catecismo.tsx`)
- **§ 2267 (pena de morte).** Antes: dava a entender atualização pela Congregação. Agora: nova redação aprovada pelo Papa Francisco (11.05.2018) e promulgada por rescriptum da CDF (01.08.2018); conteúdo doutrinal atual preservado.
- Autoridade do Catecismo mantida na formulação de *Fidei Depositum* ("texto de referência seguro e autêntico").

### Bíblia (`src/routes/biblia.index.tsx`) — verificado, já correto
- Hebreus indicada como de autoria anônima, tradicionalmente associada ao círculo paulino.
- Septuaginta apresentada com precisão histórica (importância entre judeus de língua grega e primeiros cristãos, frequentemente citada no NT).
- Cânon: tradição anterior (Hipona 393, Cartago 397, Inocêncio I 405, Florença 1442) e definição solene de Trento (Sessão IV, 1546) em contexto de controvérsia.

### Santos (`src/lib/data/santos.ts`)
Qualificados como tradição/hagiografia (antes apresentados como fato):
- São Tomé (missão na Índia e martírio em Mailapur — tradição antiga siríaca/malabar).
- São Simão Zelote (Pérsia, forma do martírio, divergência de tradições).
- São Filipe (Hierápolis, serpente, forma da morte — divergência de fontes).
- São Mateus (Etiópia/Pérsia; martírio ao altar = hagiografia).
- São Judas Tadeu (Pérsia, machado; devoção difundida a partir do séc. XVIII).
- São Tiago Menor (fato do martírio atestado por Josefo/Eusébio; detalhes de Hegésipo).
- Santo André (crucifixão em X = Atos apócrifos).
- São Marcos (Alexandria e martírio = tradição de Eusébio).
- São Tiago Maior (túmulo identificado no séc. IX segundo a tradição).
- Santa Cecília (Paixão hagiográfica sécs. V–VI).
- São Bento (milagres e profecia = Diálogos de São Gregório Magno).
- Santa Margarida Maria Alacoque (revelações privadas).
- São Maximiliano Kolbe (visão das duas coroas = relato próprio).
- São Francisco de Assis (estigmas segundo a tradição franciscana).
- Santa Catarina de Sena (estigmas invisíveis segundo os confessores).
- Santa Gema Galgani (cura de 1899 = relato hagiográfico).
- Santa Maria Goretti (visão de Serenelli = relato próprio).
- Santa Helena (reconhecimento da Vera Cruz).
- São Nicolau (tempestades; "manná di San Nicola").
- São Pedro Claver (profecia de Afonso Rodríguez).
- São José de Anchieta (poema na areia).
- Santo Atanásio (autoria da *Vida de Santo Antão* tradicionalmente atribuída).
- São Luís IX (relíquias da Paixão: "o que se venerava como").
- São Juan Diego (relato guadalupano, Nican Mopohua).
- São Bartolomeu, São Matias, Santa Ana e São Joaquim: já qualificados em auditoria anterior — mantidos.

### Orações (`src/lib/data/oracoes.ts`)
- *Sub tuum praesidium*: datação do papiro corrigida para sécs. III–IV, sem consenso.
- Oração a São Miguel (Leão XIII): relato da visão papal marcado como tradição piedosa sem comprovação documental.
- Terço da Divina Misericórdia: revelações privadas de Santa Faustina; 2000 = instituição do Domingo da Divina Misericórdia por João Paulo II.
- Santo Expedito: "venerado pela tradição popular como mártir".
- Oração da Paz: tratamento já correto (atribuição tradicional a São Francisco, forma atual do séc. XX) — mantido como padrão.

### Fontes e metodologia (`src/routes/fontes.tsx`)
- Adicionados os princípios editoriais pedidos: distinção entre ensino oficial, tradição, história e teologia; e apresentação de divergências entre tradições em vez de escolha arbitrária.

## Mantidos (analisados e considerados corretos)
- Filioque (`src/routes/fe-catolica.tsx`), dogmas marianos e aparições (`src/routes/maria.tsx`), cânon bíblico e introduções (`src/lib/data/biblia/introducoes.ts`), sistema de selos (`src/components/SeloConfiabilidade.tsx`), fundações históricas documentadas (São Frei Galvão, Santa Dulce), Santo Inácio de Antioquia, São Lucas, São Martinho de Porres.

## Incertos (divergência entre tradições, apresentada como tal)
- Local e forma do martírio de São Matias, São Simão, São Mateus, São Filipe.
- Missão de São Bartolomeu (Índia/Armênia).
- Datação do papiro do *Sub tuum praesidium*.

## Removidos
- Nenhuma informação foi removida: os casos frágeis foram qualificados, não suprimidos.
