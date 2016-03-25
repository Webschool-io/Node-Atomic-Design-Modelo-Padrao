# Modelo Padrão

Para me diferenciar um pouco do Atomic Design criado especificamente para o Frontend, estou nomeando como Modelo Padrão a arquitetura/metodologia atômica que utilizamos com Node.js, porém esse nome não quer dizer que ele deva ser um modelo ou um padrão, mas sim faz analogia com O [Modelo Padrão](https://pt.wikipedia.org/wiki/Modelo_padr%C3%A3o) da Física.

Espero que você curta um pouco de Física para que essa leitura não fique chata, **caso você não curta nem precisa ler o resto.**

> We’re not designing pages, we’re designing systems of components. — Stephen Hay

Citação no site do [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) no qual estou me baseando.

Porém o Brad Frost que me desculpe mas a Metodologia dele, **na minha opinião**, é incompleta pois ele não coloca **Comportamento/Ações** em seus componentes e eu sim com o [Atomic Design Behavior](http://www.infoq.com/br/presentations/atomic-design-behavior), mas isso é para o Frontend, nosso assunto aqui é BACKEND!

## Atomic Design

Nessa arquitetura o conceito inicial é:

> Cada Model é 1 Organismo que usa o Schema é 1 Molécula, onde campo do Schema é 1 Átomo, sendo esse Átomo feito de mais de 1 Quark.

Deixa eu exemplificar melhor.

Vamos pensar em **Entidades**.

Por exemplo a **Entidade Usuário**, ela em si é composta de alguns campos:

- name
- email
- password

Porém cada campo tem suas próprias definições, como:

- validate
- get
- set
- index
- required
- etc

Então veja o campo email, ele irá sempre precisar de uma função no `validate`para validar emails corretos.

Nisso podemos ver que um campo pode ser 1 Átomo formado por subpartículas chamadas Quarks e o agrupamento de mais de 1 Átomo forma 1 Molécula, que nesse caso é a **Entidade Usuário**.

Entretando estou me baseando no [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) criado para o Frontend e nele temos ainda o **Organismo** que é o agrupamento de mais Moléculas, porém nesse caso ele está sendo a **Entidade Usuário**(Schema/Molécula) com a adição de **Actions** que são funções adicionais, por exemplo do CRUD.

Vamos ver como fica uma definição simples para essa Entidade:

- **Quarks**:

```js
// quark-toUpper.js
module.exports = (v) => v.toUpperCase();
```

```js
// quark-toLower.js
module.exports = (v) => v.toLowerCase();
```

```js
// nameMongooseValidate
module.exports = (value) => {
  let isEmpty = require('./quarks/isEmpty')(value);
  let isString = require('./quarks/isString')(value);
  if(isEmpty) return false;
  if(!isString) return false;
  return value.length > 3;
}
```

- **Átomo do campo name**:

```js
// atom-name
const Atom = {
  type: String
, get: require('./../quarks/toUpper')
, set: require('./../quarks/toLower')
, validate: require('./../quarks/nameMongooseValidate')
, required: true
}

module.exports = Atom;
```

- **Molécula do User**:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Molecule = {
  name: require('./fields/field-name')
}

module.exports = new Schema(Molecule);
```

- **Organismo**:

```js
require('./db/config');
const mongoose = require('mongoose');
const Schema = require('./schema');
const Model = mongoose.model('User', Schema);

// Precisa passar o Model para as ações
const create = require('./actions/action-create')(Model);
const find = require('./actions/action-find')(Model);
const findOne = require('./actions/action-findOne')(Model);
const update = require('./actions/action-update')(Model);
const remove = require('./actions/action-remove')(Model);

const CRUD = {
  create
, find
, findOne
, update
, remove
};

module.exports = CRUD;
```

*Não colocarei as Actions para não ficar muito longo, mas estão na nossa aula sobre Mongoose Atomic Design.*

Vamos analisar a **Molécula do User**, perceba que o `module.exports` dela é diretamente a criação do *Schema* então se eu quiser criar [campos virtuais](https://github.com/Webschool-io/be-mean-instagram/blob/master/Apostila/module-nodejs/pt-br/mongoose.md#virtuals) nesse *Schema* eu só posso fazer isso no Organismo, o que não seria da sua responsabilidade.

Obviamente se quisermos podemos refatorar para:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Molecule = {
  name: require('./fields/field-name')
}

const Mol = new Schema(Molecule);

Mol
  .virtual('name.full')
  .get(function () {
    return this.name.first + ' ' + this.name.last;
  });

module.exports = Mol;
```

E como você pode ver na [nossa aula eu separei os Quarks em 3 tipos](https://github.com/Webschool-io/Node-Atomic-Design_QUARKS#padrão):

- to{Name}
- is{Name}
- {Name}MongooseValidate

Até aí nenhum problema, porém veja meu Quark `{Name}MongooseValidate`:

```js
// nameMongooseValidate
module.exports = {
  validator: require('./quark-isStringGTE3')
, message: require('./quark-isStringGTE3-message')
};
```

Você percebeu então que ele na verdade **não adiciona NENHUMA lógica**, apenas utiliza 1 ou mais Quarks em uma estrutura nova.

Nisso a minha cabeça como um físico curioso não aceitou muito bem, sabe por quê?

> Porque esse Quark é um agrupamento de outros Quarks.

Aí você deve se perguntar?

**Mas e daí qual problema?**

> O problema é o agrupamento de Quarks cria outras partículas maiores como Prótons e Neutrons, porém apenas 1 Próton ou 1 Neutron não compõe 1 Átomo.

Conseguiu agora perceber minha dúvida?

Fora que:

> Existem seis tipos de quarks, conhecidos como sabores: up, down, strange, charm, bottom, e top[4] . Os quarks up e down possuem as menores massas entre todos os quarks.

*fonte: [https://pt.wikipedia.org/wiki/Quark](https://pt.wikipedia.org/wiki/Quark)*

Então podemos ver claramente que os Quarks *up* e *bottom* serão nossos Quarks:

- is
- to

Pois os mesmos são os mais básicos dentro da nossa arquitetura.

Você pode pensar:

**- Ah! Para solucionar então é só nomear com os outros Quarks, não?**

Até poderia ser, porém complicaria demais algo que tende a ser muito simples.

> Então como resolver isso?

## Solução

Bom para solucionar esse problema nessa arquitetura nós podemos adicionar um grupo novo de Quarks chamado:

### Hádrons

Vamos ver o que a [Wikipedia](https://pt.wikipedia.org/wiki/H%C3%A1dron) nos diz sobre:

> ...é uma partícula composta, formada por um estado ligado de quarks. Os hádrons mantêm a sua coesão interna devido à interação forte, de um modo análogo à que mantém os átomos unidos pela força electromagnética. Os hádrons mais conhecidos são os prótons e os neutrons.

Então podemos pensar que o Quark de validação do Mongoose pode ser um Hádron em vez de um Quark, já que o mesmo não muda suas características e sim apenas agrupa Quarks diferentes para criar uma partícula nova.

No Modelo Padrão da Física os Quarks sempre existem como um agrupamento(confinamento) de, pelo menos 3 Quarks:

> Nenhuma pesquisa para quarks livres ou carga elétrica fracionária produziu uma evidência convincente. A ausência de quarks livres foi então sendo incorporada na noção de confinamento, o qual, acredita-se, a teoria de quark deve possuir.

*fonte: [https://pt.wikipedia.org/wiki/Quark#Quarks_livres](https://pt.wikipedia.org/wiki/Quark#Quarks_livres)*

É por isso que nomeamos nosso módulos atômicos como Quarks, pois ele sozinho não fará nada, só funcionará quando estiver dentro de um Hádron ou Átomo.

Então com esse conceito nossa arquitetura ficará assim:

```
[QUARKS]
- is
- to
[HADRONS]
- MongooseValidate
[ATOMOS]
- Campos do Schema
[MOLECULA]
- Schema
[ORGANISMO]
- Model/Actions(falarei adiante)
[CONTROLLER]
- usa ORGANISMO
```

Então para um módulo ser um Hádron ele precisa agregar mais de 1 Quark e não pode adicionar **NENHUMA** lógica nova, ele deverá apenas utilizar os quarks respondendo eles com uma estrutura especial dele.

### Molécula

Beleza resolvemos *esse problema*, agora vamos subir um pouco para a Molécula, como ela é um Schema nós podemos criar 1 Schema baseado em outros Schemas.

**- HEIN!??**

Por exemplo a Molécula Aluno pode ser escrita assim:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./molecules/user');
const Molecule = {
  user: User
, cpf: require('./fields/field-cpf')
, cursos: [require('./fields/field-cursos')]
}

module.exports = new Schema(Molecule);
```

Utilizando a Molécula User:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Molecule = {
  name: require('./fields/field-name')
, email: require('./fields/field-email')
, password: require('./fields/field-password')
}

module.exports = new Schema(Molecule);
```

Simplificando, ele se transforma nisso:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./molecules/user');
const Molecule = {
  user: {
    name: require('./fields/field-name')
  , email: require('./fields/field-email')
  , password: require('./fields/field-password')
  }
, cpf: require('./fields/field-cpf')
, cursos: [require('./fields/field-cursos')]
}

module.exports = new Schema(Molecule);
```

Você ainda não deve ter percebido o problema, mas para mim foi essa composição de uma Molécula maior com 1 ou mais Moléculas menores.

Fiquei pensando e pensando como é que eu pdia nomear algo assim e rapidamente veio-me na cabeça: **reações químicas**.

> Reação Química é um fenômeno onde os átomos permanecem intactos. Durante as reações, as moléculas iniciais são "desmontadas" e os seus átomos são reaproveitados para "montar" novas moléculas.

Quero que você entenda **muito bem isso aqui**:

> ... é um fenômeno onde os átomos permanecem intactos.

**OU SEJA, NUNCA MODIFIQUE SEUS ÁTOMOS!!!**

**- Mas que tipo de reação usaremos então?**

>Absorção na química é um fenômeno ou processo físico ou químico em que átomos, moléculas ou íons introduzem-se em alguma outra fase, normalmente mais massiva, e fixam-se.
>...
>A absorção é basicamente quando algo toma lugar em outra substância.

*fonte: [https://pt.wikipedia.org/wiki/Absor%C3%A7%C3%A3o_(qu%C3%ADmica)](https://pt.wikipedia.org/wiki/Absor%C3%A7%C3%A3o_(qu%C3%ADmica))*

Então nesse caso vimos que a Molécula User tomou o lugar onde seriam seus átomos, caso não reaproveitassemos a Molécula User.

Podemos até pensar em ter uma função para essa reação, por exemplo:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./molecules/user');
const Aluno = require('./molecules/aluno');

const absorver = (MoleculeReceive, MoleculeIn, name) => {
  MoleculeReceive[name] = MoleculeIn;
  return MoleculeReceive;
};

Aluno = absorver(Aluno, User, 'user');
module.exports = new Schema(Aluno);
```


Bom isso corrobora nosso conceito até agora.

### Organismo

Essa é a nossa última etapa, amém Odin, onde podemos fazer uma analogia do Organismo como uma Célula, já vamos entender o porquê. Para isso vamos recordar do código do Organimo:

```js
require('./db/config');
const mongoose = require('mongoose');
const Molecule = require('./molecules/user');
const Organism = mongoose.model('User', Molecule);

// Precisa passar o Model para as ações
const create = require('./organelles/organelle-create')(Organism);
const find = require('./organelles/organelle-find')(Organism);
const findOne = require('./organelles/organelle-findOne')(Organism);
const update = require('./organelles/organelle-update')(Organism);
const remove = require('./organelles/organelle-remove')(Organism);

const Cell = {
  create
, find
, findOne
, update
, remove
};

module.exports = Cell;
```

Para ter um embasamento teórico adequado, nessa parte, tive a ajuda do meu caro aluno/amigo/tetudo-macio [Carlos Machel](https://github.com/carlosmachel).

O conceito biológico nesse código é o seguinte:

> Iremos criar um Organismo novo que possui suas Organelas, as quais fazem as ações dentro de uma Célula.

```js
// Iremos criar um Organismo
const Organism = mongoose.model('User', Molecule);
```


```js
// que possui suas Organelas
const create = require('./organelles/organelle-create')(Organism);
const find = require('./organelles/organelle-find')(Organism);
const findOne = require('./organelles/organelle-findOne')(Organism);
const update = require('./organelles/organelle-update')(Organism);
const remove = require('./organelles/organelle-remove')(Organism);
```


```js
// as quais fazem as ações dentro de uma Célula
const Cell = {
  create
, find
, findOne
, update
, remove
};

module.exports = Cell;
```

#### Organelas

Você percebeu então que acabamos mudando a nomenclatura das ***Actions*** para ***Organelles*** para que o conceito biológico por trás estivesse correto.

Pode parecer loucura minha querer embasar essa *Arquitetura* o máximo possível na Biologia, Química e Física; porém **para mim** faz total sentido.

Eu acho que se cada coisa já possui seu nome então devemos utilizar ele.

Inicialmente precisamos identificar qual sua estrutura padrão, nesse caso usando Express (com `req` e `res`):

```js
'use strict';

module.exports = (Organism) => {
  return (req, res) => {
  };
}
```

Perceba então que uma Organela só atua realmente dentro do Organismo.

**AINDA PRECISO PENSAR NA NOMENCLATURA DAS ACOES Q ELA USA!!!**


### Testes

Olha que coisa louca essa Física e como ela corrobora meus conceitos, até porque não sou burro de criar algo sem **muito embasamento teórico** né?

Vamos ver se você consegue conceber o seguinte conceito:

> Cada partícula subatômica é descrita por um pequeno conjunto de números quânticos tais como spin J, paridade P, e massa m. Usualmente estas propriedades são diretamente identificadas por experimentos. Contudo, o confinamento torna impossível medir estas propriedades nos quarks. Ao invés disto, elas devem ser inferidas pela medição das propriedades das partículas compostas que são feitas de quarks.

*fonte: [https://pt.wikipedia.org/wiki/Quark#Confinamento_e_propriedades_dos_quarks](https://pt.wikipedia.org/wiki/Quark#Confinamento_e_propriedades_dos_quarks)*

Quero que você analise comigo essa frase:

> Contudo, o confinamento torna impossível medir estas propriedades nos quarks. Ao invés disto, elas devem ser inferidas pela medição das propriedades das partículas compostas que são feitas de quarks.

Nesse caso o confinamento é nosso Hádron, que nesse exemplo é o `{name}MogooseValidate`: 

```js
// nameMongooseValidate
module.exports = {
  validator: require('./quark-isStringGTE3')
, message: require('./quark-isStringGTE3-message')
};
```

Se fossemos levar ao pé da letra esse conceito físico nós não **conseguiríamos** medir/testar seus Quarks, apenas mediríamos/testaríamos o Hádron. Mas como sabemos podemos testar cada Quark **separadamente**.

Pois então aí que está o pulo do gato, quando você vai testar esse módulo de validação do Mongoose você não testa diretamente OU o `validator` ou a `message`, mas sim a resposta(*medição das propriedades das partículas compostas que são feitas de quarks*). Então você não irá testar somente a validação ou somente a mensagem de erro, mas sim essa composição das 2.

***Perceba que estou adaptando os conceitos para nosso contexto e não apenas seguindo cegamente a Física/Química.***


## Atomic Design - Actions

Bom eu falei um monte, porém não falei nada sobre as *Actions*, por quê?

Basicamente a ideia de uma *Action* é bem parecida com um Quark, contudo vamos analisar o código de uma:

```js
// action-create.js
const callback = require('./action-response-200-json');

module.exports = (Model) => {
  return (req, res) => {
    let queryData = '';

    req.on('data', (data) => {
      queryData += data;
    });

    req.on('end', () => {
      const obj = require('querystring').parse(queryData);
      Model.create(obj, (err, data) => callback(err, data, res));
    });
  };
};
```

Claramente vemos que ela utiliza outra *Action*:

```js
// action-response-200-json.js
module.exports = (err, data, res) => {
    if (err) return console.log('Erro:', err);

  res.writeHead(200, {'Content-Type': 'application/json'});
  return res.end(JSON.stringify(data));
};
```

Eu iniciei essa Arquitetura com esse nome de *Action* pois na hora fazia mais sentido, porém agora preciso colocar isso na nossa nomenclatura.

Como nós fazemos composição de mais de 1 Quark, respondendo com outra estrutura, com o Hádron.

**Mas lembra do que eu falei anteriormente?**

> Então para um módulo ser um Hádron ele precisa agregar mais de 1 Quark e não pode adicionar **NENHUMA** lógica nova, ele deverá apenas utilizar os quarks respondendo eles com uma estrutura especial dele.

Analisando essa *Action* ja percebemos que ela adiciona lógica, logo não pode ser um Hádron.

E também tem mais um ponto importante:

```js
const create = require('./actions/action-create')(Model);
```

Essa Action *maior* sempre irá depender do Model para funcionar.

Foi aqui que aina não achei uma nomenclatura clara para conseguir separar essa Action *maior* das menores.

## DNA

**Pare com isso Suissa, já deu!**

![](https://media.giphy.com/media/l2QZWOgzaWBt4VWZW/giphy.gif)

Óbvio que não criamos um padrão de Arquitetura/Nomenclatura a toa né?

Criamos esse padrão para que possamos gerar nossos módulos mais dinamicamente, como por exemplo: a partir de um JSON de configuração.

Como o DNA está dentro da Célula iremos começar nela:

```js
require('./db/config');
const mongoose = require('mongoose');
const Molecule = require('./molecules/user');
const Organism = mongoose.model('User', Molecule);

// Precisa passar o Model para as ações
const create = require('./organelles/create')(Organism);
const find = require('./organelles/find')(Organism);
const findOne = require('./organelles/findOne')(Organism);
const update = require('./organelles/update')(Organism);
const remove = require('./organelles/remove')(Organism);

const Cell = {
  create
, find
, findOne
, update
, remove
};

module.exports = Cell;
```

Antes de definir a estrutura do nosso DNA, precisamos analisar esse Organismo para refatorá-lo para algo mais genérico:

```js

const moleculesPath = './molecules/';
const organellesPath = './organelles/';
const OrganismName = 'User';
const Molecule = require(moleculesPath+OrganismName.toLowecase());
const Organism = mongoose.model(OrganismName, Molecule);

const Organelles = ['create', 'find', 'findOne', 'update', 'remove'];

const create = require(organellesPath+'create')(Organism);
const find = require(organellesPath+'find')(Organism);
const findOne = require(organellesPath+'findOne')(Organism);
const update = require(organellesPath+'update')(Organism);
const remove = require(organellesPath+'remove')(Organism);

const Cell = {
  create
, find
, findOne
, update
, remove
};

module.exports = Cell;
```

### Refatoração

**Já imaginou por que criei o *Array* `Organelles`?**

Então confira comigo abaixo:

```js
const moleculesPath = './molecules/';
const organellesPath = './organelles/';
const OrganismName = 'User';
const Molecule = require(moleculesPath+OrganismName.toLowecase());
const Organism = mongoose.model(OrganismName, Molecule);

let Cell = {};
const Organelles = ['create', 'find', 'findOne', 'update', 'remove'];

const createOrganelles = (element, index) => {
  Cell[element] =  require(organellesPath+'organelle-'+element)(Organism);
};

Organelles.forEach(createOrganelles);

module.exports = Cell;
```

Olhe que maravilha que ficou o código agora, não?

Com isso podemos inferir algumas coisas:

```js
const moleculesPath = './molecules/';
const organellesPath = './organelles/';
```

**Essa configuração é PADRÃO PARA TODOS OS ORGANISMOS**, logo podemos deixar ela de fora do DNA.

```js
const OrganismName = 'User';
const Molecule = require(moleculesPath+OrganismName.toLowecase());
const Organism = mongoose.model(OrganismName, Molecule);
```

Precisamos converter esse código em uma representação em JSON, que tal essa?

```js
const DNA = {
  name: 'User'
}
```

Sim daquelas 3 linhas só deixamos o `name` pois a `Molecule` e o `Organism` só dependem desse valor que pode variar o resto **SERÁ SEMPRE A MESMA COISA.**

E também não precisamos adicionar nada sobre o CRUD pois o mesmo também é **SEMPRE A MESMA COISA**, porém teremos que adicionar outras funcionalidades e para isso precisamos adicionar no DNA, por exemplo:

```js
const DNA = {
  name: 'User'
, organelles: ['findByName', 'findByEmail']
}
```

Com isso já conseguimos gerar nosso Organismo, **você duvida?**

Então vamos lá!

```js
'use strict';

const mongoose = require('mongoose');
const moleculesPath = './molecules/';
const organellesPath = './organelles/';

module.exports = (DNA) => {
  const OrganismName = DNA.name;
  const Molecule = require(moleculesPath+OrganismName);
  const Organism = mongoose.model(OrganismName, Molecule);

  let Cell = {};
  let Organelles = ['create', 'find', 'findOne', 'update', 'remove'];

  DNA.organelles.forEach()

  const createOrganelles = (element, index) => {
    Cell[element] =  require(organellesPath+element)(Organism);
    console.log(element, Cell[element]);
  };

  Organelles.forEach(createOrganelles);
  return Cell;
};
```

Nomei esse módulo, por hora como `GOD.js` e ele é usado assim:

```js
'use strict';

const DNA = {
  name: 'User'
, organelles: ['findByName', 'findByEmail']
}

const Cell = require('./GOD')(DNA);
```

E pronto! Agora para criarmos novos Organismos precisamos apenas passar o nome dele e suas Organelas específicas já que **TODOS ORGANISMOS SEMPRE TERÃO AS FUNÇÕES DE CRUD**.

Logicamente você deverá criar as Organelas específicas, caso elas ainda não existam.

Legal conseguimos gerar o Organismo, mas será que conseguimos para a Molécula também? Vamos ver:

```js
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserMolecule = require('./molecules/user');
let AlunoMolecule = require('./molecules/aluno');

const absorver = (MoleculeReceive, MoleculeIn, name) => {
  MoleculeReceive[name] = MoleculeIn;
  return MoleculeReceive;
};

AlunoMolecule = absorver(AlunoMolecule, UserMolecule, 'user');

module.exports = new Schema(AlunoMolecule);
```

Nessa caso em que temos uma Molécula composta necessitamos definir quais são essas moléculas.

```js
const DNA = {
  name: 'User'
, organelles: ['findByName', 'findByEmail']
, molecules: ['user', 'aluno']
}
```

Nesse momento precisamos criar um módulo que possa criar nossas moléculas dinamicamente utilizando a configuração do nosso DNA, veja como irá ficar:

```js
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moleculesPath = './molecules/';

module.exports = (DNA) => {

  const absorver = (MoleculeReceive, MoleculeIn, name) => {
    MoleculeReceive[name] = MoleculeIn;
    return MoleculeReceive;
  };

  let Molecules = [];

  DNA.molecules.forEach((element, index) => {
    Molecules[element] = require(moleculesPath+element);
  });

  const Molecule = absorver(Molecules['aluno'], Molecules['user'], 'user');

  return new Schema(Molecule);
};
```

Utilizei a mesma lógica dos Organismos para gerar as Moléculas:

```js
DNA.molecules.forEach((element, index) => {
  Molecules[element] = require(moleculesPath+element);
});
```

Para depois fazer com que uma Molécula absorva a outra:

```js

const Molecule = absorver(Molecules['aluno'], Molecules['user'], 'user');
```

