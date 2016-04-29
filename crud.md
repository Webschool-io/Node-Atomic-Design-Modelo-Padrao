# Modelo Padrão - Criando um CRUD com Express

Vamos iniciar esse projeto definindo quais as Entidades envolvidas:

- User
- Aluno
- Cursos
- Professor

Onde um 1 Professor ou Aluno é 1 User e cada um tem sua lista de Cursos, bem simples né?

Então vamos definir agora os campos necessários para cada:

- User
    + email
    + password
- Aluno
    + name
    + dateBirth
    + cursos
- Curso
    + name
    + dateBegin
    + link
- Professor
    + name
    + schoolName
    + cursos

Bom e como sabemos cda campo desses é 1 Átomo, nesse momento iremos definir cada um deles.

## Átomos

Veremos aqui que são todos muito iguais.

### email

```js
module.exports = {
  type: String
, validate: require('./../hadrons/emailValidateMongoose')
, required: true
}
```

### password

```js
module.exports = {
  type: String
, validate: require('./../hadrons/passwordValidateMongoose')
, required: true
}
```

### name

Esse átomo é usado em Aluno e Professor:

```js
module.exports = {
  type: String
, validate: require('./../hadrons/nameValidateMongoose')
, required: true
}
```

### dateBirth

```js
module.exports = {
  type: Date
, validate: require('./../hadrons/dateBirthValidateMongoose')
, required: true
}
```

### dateBegin

```js
module.exports = {
  type: Date
, validate: require('./../hadrons/dateBeginValidateMongoose')
, required: true
}
```

### link

```js
module.exports = {
  type: String
, validate: require('./../hadrons/linkValidateMongoose')
, required: true
}
```

### schoolName

```js
module.exports = {
  type: String
, validate: require('./../hadrons/schoolNameValidateMongoose')
, required: true
}
```

Depois de definirmos todos nossos átomos devemos criar ou usar todos os Hádrons necessários chamados no `validate`.

## Hádrons

### emailValidateMongoose

```js
module.exports = {
  validator: require('./../quarks/isEmail')
, message: require('./../quarks/isEmailMessage')
};
```

### passwordValidateMongoose

```js
module.exports = {
  validator: require('./../quarks/isPassword')
, message: require('./../quarks/isPasswordMessage')
};
```

### nameValidateMongoose

```js
module.exports = {
  validator: require('./../quarks/isName')
, message: require('./../quarks/isNameMessage')
};
```

### dateBirthValidateMongoose

```js
module.exports = {
  validator: require('./../quarks/isDateBirth')
, message: require('./../quarks/isDateBirthMessage')
};
```

### dateBeginValidateMongoose

```js
module.exports = {
  validator: require('./../quarks/isDateBegin')
, message: require('./../quarks/isDateBeginMessage')
};
```

### cursoValidateMongoose

```js
module.exports = {
  validator: require('./../quarks/isCurso')
, message: require('./../quarks/isCursoMessage')
};
```

### schoolNameValidateMongoose

```js
module.exports = {
  validator: require('./../quarks/isSchoolName')
, message: require('./../quarks/isSchoolNameMessage')
};
```

Até aí nenhuma lógica ainda foi aplicada, é na etapa da definição dos Quarks que fazemos isso, pois eles são nossos menores elementos com lógica, para termos um alto reaproveitamento.

## Quarks

Agora sim iremos iniciar a definição de nossas regras.

### isEmail

```js
'use strict';

module.exports = (value) => {

  const regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  const isEmpty = require('../isEmpty/isEmpty')(value);
  if(isEmpty) return false;

  const isString = require('../isString/isString')(value);
  if(!isString) return false;

  return regex.test(value);
}
```


### isEmailMessage

```js
module.exports = 'O email {VALUE} não é válido!';
```

### isPassword

```js
'use strict';

module.exports = (value) => {
  const isEmpty = require('../isEmpty/isEmpty')(value);
  const isString = require('../isString/isString')(value);

  if(isEmpty) return false;
  if(!isString) return false;

  return (value.length > 6 && value.length < 20);
}
```

### isPasswordMessage

```js
module.exports = 'O senha {VALUE} precisa ter tamanho maior que 6 e menor que 20!';
```

### isName

```js
'use strict';

module.exports = (value) => {
  const isEmpty = require('../isEmpty/isEmpty')(value);
  const isString = require('../isString/isString')(value);

  if(isEmpty) return false;
  if(!isString) return false;

  return (value.length > 6 && value.length < 20);
}
```

### isNameMessage

```js
module.exports = 'O nome {VALUE} precisa ter tamanho maior que 3 e menor que 80!';
```

### isLink

```js
'use strict';

module.exports = (value) => {
  const regex = /(https?:\/\/(?:www\.|(?!www))?[^\s\.]+\.[^\s]{2,}|\.[^\s]{2,})/i;
  const isEmpty = require('./isEmpty')(value);
  const isString = require('./isString')(value);

  if(isEmpty) return false;
  if(!isString) return false;

  return regex.test(value);
}
```

### isLinkMessage

```js
module.exports = 'O link {VALUE} não é válido!';
```

### isDateBirth

```js
'use strict';

module.exports = (value) => {
  const isEmpty = require('./isEmpty')(value);
  const isDate = require('./isDate')(value);

  if(isEmpty) return false;
  if(!isDate) return false;
  // Data precisa ser maior que a data atual
  const today = new Date();
  return value.setHours(0,0,0,0) < today.setHours(0,0,0,0);
};
```

### isDateBirthMessage

```js
module.exports = 'A data de nascimento {VALUE} precisa ser antes de hoje!';
```

### isDateBegin

```js
'use strict';

module.exports = (value) => {
  const isEmpty = require('./isEmpty')(value);
  const isDate = require('./isDate')(value);

  if(isEmpty) return false;
  if(!isDate) return false;
  // Data precisa ser maior que a data atual
  const today = new Date();
  return value.setHours(0,0,0,0) > today.setHours(0,0,0,0);
};
```

### isDateBeginMessage

```js
module.exports = 'A data de início {VALUE} precisa ser depois de hoje!';
```

Depois de terminado nossos Quarks, podemos partir para as Moléculas, parece estranho, né?

Só não começamos dirtamente com os Quarks ou Hádrons pois antes precisamos saber quais são os Átomos que os utilizam e para saber quais são os Átomos sempre listamos eles a partir de sua Entidade/Molécula.

## Moléculas

Na etapa da definição das Moléculas é onde criamos os Schemas no Mongoose.

### User

- User
    + email
    + password

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Molecule = {
  email: require('./../atoms/email')
, password: require('./../atoms/password')
}

module.exports = new Schema(Molecule);
```

### Aluno

- Aluno
    + name
    + dateBirth
    + cursos

Porém sabemos que o Aluno também é um 1 User, então se quisermos referenciar a coleção de Users precisamos criar esse átomo:

```js
// atoms/userRef.js
module.exports = (Schema) => {
  return { type: Schema.Types.ObjectId, ref: 'users' };
};
```

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Curso = require('./curso');

const Molecule = {
  user_id: require('./../atoms/userRef')(Schema)
, name: require('./../atoms/name')
, dateBirth: require('./../atoms/dateBirth')
, cursos: [Curso]
}

module.exports = new Schema(Molecule);
```

### Curso

- Curso
    + name
    + dateBegin
    + link

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Curso = require('./curso');

const Molecule = {
  name: require('./../atoms/name')
, dateBegin: require('./../atoms/dateBegin')
, link: require('./../atoms/link')
}

module.exports = new Schema(Molecule);
```

### Professor

- Professor
    + name
    + schoolName
    + cursos

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Curso = require('./curso');

const Molecule = {
  name: require('./../atoms/name')
, schoolName: require('./../atoms/schoolName')
, cursos: [Curso]
}

module.exports = new Schema(Molecule);
```

### Testes

Antes de passarmos os testes para Mocha/Chai vamos fazer um *script* bem simples para verificarmos o retorno das nossas moléculas.

```js
const mongoose = require('mongoose');
const MoleculeName = ''; // coloque o nome aqui, ex.: User
const Molecule = require('./molecules/'+MoleculeName.toLowerCase());
const DNA = {}; // Coloque os valores para os campos do Schema

const Organism = mongoose.model(MoleculeName, Molecule);
const Cell = new Organism(DNA);

console.log('Cell', Cell);
```

#### User

```js
const mongoose = require('mongoose');
const MoleculeName = 'User';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase());

const Organism = mongoose.model(MoleculeName, Molecule);

const DNA = {
  email: 'suiss@webschool.io'
, password: 'sdhu889h89d'
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);
```

Executando:

```
➜ node crud/testMolecule.js
Cell { _id: 56f73e785056af5c6b18c754,
  password: 'sdhu889h89d',
  email: 'suiss@webschool.io' }
```

#### Aluno

```js
const mongoose = require('mongoose');
const MoleculeName = 'Aluno';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase());

const Organism = mongoose.model(MoleculeName, Molecule);

const DNA = {
  name: 'Suissa'
, dateBirth: new Date('1984/11/20')
, cursos: [
    {
      name: 'Be MEAN'
    , dateBegin: new Date('2016/06/20')
    , link: 'https://github.com/Webschool-io/be-mean-instagram'
    }
  ]
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);
```

Executando:

```
(Node-Atomic-Design-Modelo-Padrao) ➜ (git:(master) ✗) ➜ node crud/testMolecule.js
Cell { cursos: 
   [ { _id: 56f73ed1f1887a696b116248,
       link: 'https://github.com/Webschool-io/be-mean-instagram',
       dateBegin: 'Mon Jun 20 2016 00:00:00 GMT-0300 (BRT)',
       name: 'Be MEAN' } ],
  _id: 56f73ed1f1887a696b116247,
  dateBirth: 'Tue Nov 20 1984 00:00:00 GMT-0300 (BRT)',
  name: 'Suissa' }
```


#### Curso

```js
const mongoose = require('mongoose');
const MoleculeName = 'Curso';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase());

const Organism = mongoose.model(MoleculeName, Molecule);

const DNA = {
  name: 'Suissa'
, dateBegin: new Date('2016/06/20')
, link: 'https://github.com/Webschool-io/be-mean-instagram'
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);
```

Executando:

```
➜ node crud/testMolecule.js
Cell { _id: 56f73f72628911766b07ac90,
  link: 'https://github.com/Webschool-io/be-mean-instagram',
  name: 'Suissa' }

```


#### Professor

```js
const mongoose = require('mongoose');
const MoleculeName = 'Aluno';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase());

const Organism = mongoose.model(MoleculeName, Molecule);

const DNA = {
  name: 'Suissa'
, dateBirth: new Date('1984/11/20')
, cursos: [
    {
      name: 'Be MEAN'
    , dateBegin: new Date('2016/06/20')
    , link: 'https://github.com/Webschool-io/be-mean-instagram'
    }
  ]
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);
```

Executando:

```
➜ node crud/testMolecule.js
Cell { cursos: 
   [ { _id: 56f73fdf62f069836b539673,
       link: 'https://github.com/Webschool-io/be-mean-instagram',
       dateBegin: 'Mon Jun 20 2016 00:00:00 GMT-0300 (BRT)',
       name: 'Be MEAN' } ],
  _id: 56f73fdf62f069836b539672,
  name: 'Suissa' }

```

Tudo bem porque nesse caso eu quero que Curso não seja uma coleção própria e sempre esteja dentro de Aluno e Professor, mas caso eu tenha uma escola com certeza será melhor separarmos essa coleção.

### Ligação entre Moléculas

**NÃO ESQUEÇA DE LIGAR O MONGODB E ADICIONAR O ARQUIVO `db.js` NA PASTA `config`!**

```js
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/modelo-padrao';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});
mongoose.connection.on('open', function () {
  console.log('Mongoose default connection is open');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
```


#### Aluno

Refatorando essa molécula colocamos a chamada do átomo `cursoRef`:

```js
module.exports = (Schema) => {
  return { type: Schema.Types.ObjectId, ref: 'cursos' };
};
```

Ficando assim:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Molecule = {
  name: require('./../atoms/name')
, dateBirth: require('./../atoms/dateBirth')
, cursos: [ require('./../atoms/cursoRef')(Schema) ]
}

module.exports = new Schema(Molecule);
```

Então antes eu vou inserir o Curso:

```js
require('./config/db');
const mongoose = require('mongoose');
const MoleculeName = 'Curso';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase());

const Organism = mongoose.model(MoleculeName, Molecule);

const DNA = {
  name: 'Be MEAN'
, dateBegin: new Date('2016/06/20')
, link: 'https://github.com/Webschool-io/be-mean-instagram'
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);

Cell.save((err, data) => {
  if(err) console.log('ERRO:', err);
  else console.log('RETORNO', data);
})
```

Executando esse código temos o seguinte:

```
➜ node crud/testMoleculeCurso.js
Cell { _id: 56f749a040671ef66c55c031,
  link: 'https://github.com/Webschool-io/be-mean-instagram',
  dateBegin: 'Mon Jun 20 2016 00:00:00 GMT-0300 (BRT)',
  name: 'Be MEAN' }
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNO { _id: 56f749a040671ef66c55c031,
  link: 'https://github.com/Webschool-io/be-mean-instagram',
  dateBegin: 'Mon Jun 20 2016 00:00:00 GMT-0300 (BRT)',
  name: 'Be MEAN',
  __v: 0 }
```

Agora pegamos o `_id: 56f749a040671ef66c55c031` para passar esse valor em `cursos: ['56f749a040671ef66c55c031']`:

```js
require('./config/db');
const mongoose = require('mongoose');
const MoleculeName = 'Aluno';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase()+'Curso');

const Organism = mongoose.model(MoleculeName, Molecule);

const DNA = {
  name: 'Suissa'
, dateBirth: new Date('1984/11/20')
, cursos: ['56f749a040671ef66c55c031']
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);

Cell.save((err, data) => {
  if(err) console.log('ERRO:', err);
  else console.log('RETORNO', data);
})
```

Testando:

```
➜ node crud/testMoleculeAluno.js
Cell { cursos: [ 56f749a040671ef66c55c031 ],
  _id: 56f749f4428681046d7c1d5c,
  dateBirth: 'Tue Nov 20 1984 00:00:00 GMT-0300 (BRT)',
  name: 'Suissa' }
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNO { cursos: [ 56f749a040671ef66c55c031 ],
  _id: 56f749f4428681046d7c1d5c,
  dateBirth: 'Tue Nov 20 1984 00:00:00 GMT-0300 (BRT)',
  name: 'Suissa',
  __v: 0 }
```

Agora para continuar a testar as funcionalidades de uma Molécula precisamos criar seu Organismo.

## Organismos

É nessa etapa onde iremos definir quais Organelas/Ações nosso Organismo terá, como padrão **TODOS TERÃO UM CRUD**.

### Organelas

Nossas organelas/ações do CRUD são:

- create
- find
- findOne
- update
- remove

Porém antes de tudo vamos definir um *callback* padrão para as Organelas:

#### callback

```js
'use strict';

module.exports = (err, data) => {
  if (err) console.log('Erro:', err);
  else console.log('RETORNOU:', data);
};
```

Depois disso podemos criar as funções do CRUD, para isso usaremos para essas funções as mesma **interface** das funções do Mongoose.

#### create

Nessa função recebemos em `obj` qual o objeto a ser cadastrado.

```js
'use strict';

module.exports = (Organism) => {
  return (obj, callback) => Organism.create(obj, callback);
};
```

#### find

Nessa função recebemos em `obj` o objeto com a *query* da nossa busca.

```js
'use strict';

module.exports = (Organism) => {
  return (obj, callback) => Organism.find(obj, callback);
};
```

#### findOne

Nessa função recebemos em `obj` o objeto com a *query* da nossa busca.

```js
'use strict';

module.exports = (Organism) => {
  return (obj, callback) => Organism.findOne(obj, callback);
};
```

#### update

Nessa função recebemos em `obj` o objeto com a *query* da nossa busca, em `mod` o objeto com os valores a serem mudados, em `options` o objeto se a alteração terá: `upsert` e/ou `multi`.

```js
'use strict';

module.exports = (Organism) => {
  return (obj, mod, options, callback) => Organism.update(obj, mod, options, callback);
};
```

#### remove

Nessa função recebemos em `obj` o objeto com o valor da *query* da busca, para que a Entidade seja removida.

```js
'use strict';

module.exports = (Organism) => {
  return (obj, callback) => Organism.remove(obj, callback);
};
```

### User

Depois da definição das Organelas do CRUD agora podemos criar nossos Organismos.

```js
'use strict';

const mongoose = require('mongoose');
const Molecule = require('./../molecules/user');
const Organism = mongoose.model('User', Molecule);

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

Agora vamos testar essas Organelas/Ações.

#### create - Testando

E para verificar esse código fazemos:

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const callback = require('./organisms/organelles/callback');
const obj = {
  email: 'suissa@webshool.io'
, password: 'Bazingueiro666'
}

Organism.create(obj, callback);
```

```
➜ node testOrganismCreate.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { _id: 56f75f7bc7a357337142a293,
  password: 'Bazingueiro666',
  email: 'suissa@webshool.io',
  __v: 0 }

```

#### find - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const callback = require('./organisms/organelles/callback');
const query = {_id: '56f75f7bc7a357337142a293'}

Organism.find(query, callback);
```

```
➜ node testOrganismFind.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: [ { __v: 0,
    password: 'Bazingueiro666',
    email: 'suissa@webshool.io',
    _id: 56f75f7bc7a357337142a293 } ]
```

Perceba que ele retornou apenas 1 User, passado pelo `_id`, porém vem como *Array* e isso sabemos muito bem o porquê, né?

#### findOne - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const callback = require('./organisms/organelles/callback');
const query = {_id: '56f75f7bc7a357337142a293'}

Organism.findOne(query, callback);
```

```
➜ node testOrganismFind.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { __v: 0,
    password: 'Bazingueiro666',
    email: 'suissa@webshool.io',
    _id: 56f75f7bc7a357337142a293 }
```

#### update - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const query = {_id: '56f75f7bc7a357337142a293'}
const mod = {password: 'MudeiAquiMalandro'}
const options = {};
const callback = require('./organisms/organelles/callback');

Organism.update(query, mod, options, callback);
```

```
➜ node testOrganismUpdate.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { ok: 1, nModified: 1, n: 1 }
```

#### remove - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const query = {_id: '56f75f7bc7a357337142a293'}
const callback = require('./organisms/organelles/callback');

Organism.remove(query, mod, options, callback);
```

```
➜ node testOrganismRemove.js 
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { result: { ok: 1, n: 1 },
  connection: 
   EventEmitter {
     domain: null,
     _events: 
      { close: [Object],
        error: [Object],
        timeout: [Object],
        parseError: [Object],
        connect: [Function] },
     _eventsCount: 5,
     _maxListeners: undefined,
     options: 
      { socketOptions: {},
        auto_reconnect: true,
        host: 'localhost',
        port: 27017,
        cursorFactory: [Object],
        reconnect: true,
        emitError: true,
        size: 5,
        disconnectHandler: [Object],
        bson: {},
        messageHandler: [Function],
        wireProtocolHandler: {} },
     id: 0,
     logger: { className: 'Connection' },
     bson: {},
```

Sim é esse mesmo o retorno do `remove`, infelizmente o MongoDB mudou esse retorno nas versões acima da `3.0`, por isso devemos criar um *callback* mais específico para essa Organela, algo bem simples como isso:

```js
'use strict';

module.exports = (err, data) => {
  if (err) console.log('Erro:', err);
  else console.log('RETORNOU:', data.result);
};
```

**Devemos criar 1 *callback* específico para cada tipo de ação pois o que ele irá fazer pode ser diferente de uma para outra.**

### Curso

```js
'use strict';

const mongoose = require('mongoose');
const Molecule = require('./../molecules/curso');
const Organism = mongoose.model('Curso', Molecule);

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

#### create - Testando

Irei cadastrar sem Cursos por hora.

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/curso');
const callback = require('./organisms/organelles/callback');
const obj = {
  name: 'JS Funcional'
, dateBegin: Date('2016/05/20')
, link: 'https://github.com/Webschool-io/workshop-js-funcional-free'
}

Organism.create(obj, callback);
```

```
 ➜ node testOrganismCreate.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { _id: 56f76ee8053c543373ad29ef,
  link: 'https://github.com/Webschool-io/workshop-js-funcional-free',
  dateBegin: 'Sun Mar 27 2016 02:26:00 GMT-0300 (BRT)',
  name: 'JS Funcional',
  __v: 0 }
```

#### find - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/aluno');
const callback = require('./organisms/organelles/callback');
const query = {}

Organism.find(query, callback);
```

```
➜ node testOrganismFind.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: [ { __v: 0,
    link: 'https://github.com/Webschool-io/be-mean-instagram',
    dateBegin: 'Mon Jun 20 2016 00:00:00 GMT-0300 (BRT)',
    name: 'Suissa',
    _id: 56f747955b319c936cbce9b4 },
  { __v: 0,
    link: 'https://github.com/Webschool-io/be-mean-instagram',
    dateBegin: 'Mon Jun 20 2016 00:00:00 GMT-0300 (BRT)',
    name: 'Be MEAN',
    _id: 56f749a040671ef66c55c031 },
  { __v: 0,
    link: 'https://github.com/Webschool-io/workshop-js-funcional-free',
    dateBegin: 'Sun Mar 27 2016 02:26:00 GMT-0300 (BRT)',
    name: 'JS Funcional',
    _id: 56f76ee8053c543373ad29ef } ]

```


#### findOne - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/curso');
const callback = require('./organisms/organelles/callback');
const query = {_id: '56f76ee8053c543373ad29ef'}

Organism.findOne(query, callback);
```

```
➜ node testOrganismFindOne.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { __v: 0,
  link: 'https://github.com/Webschool-io/workshop-js-funcional-free',
  dateBegin: 'Sun Mar 27 2016 02:26:00 GMT-0300 (BRT)',
  name: 'JS Funcional',
  _id: 56f76ee8053c543373ad29ef }
```

#### update - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/curso');
const query = {_id: '56f76ee8053c543373ad29ef'}
const mod = {name: 'Be MEAN Funcional'}
const options = {};
const callback = require('./organisms/organelles/callback');

Organism.update(query, mod, options, callback);
```

```
➜ node testOrganismUpdate.js 
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { ok: 1, nModified: 1, n: 1 }
```

Depois só rodar o `findOne` para confirmar a mudança do nome para `'Be MEAN Funcional'`:

```
➜ node testOrganismFindOne.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { __v: 0,
  link: 'https://github.com/Webschool-io/workshop-js-funcional-free',
  dateBegin: 'Sun Mar 27 2016 02:26:00 GMT-0300 (BRT)',
  name: 'Be MEAN Funcional',
  _id: 56f76ee8053c543373ad29ef }
```

#### remove - Testando

Vamos apagar um Curso que não estou usando ali no aluno, então vendo o nosso retorno do `find` dos Cursos escolhi esse:

```
{ __v: 0,
    link: 'https://github.com/Webschool-io/be-mean-instagram',
    dateBegin: 'Mon Jun 20 2016 00:00:00 GMT-0300 (BRT)',
    name: 'Suissa',
    _id: 56f747955b319c936cbce9b4 }
```

Então nosso teste ficará assim:

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const query = {_id: '56f747955b319c936cbce9b4'}
const callback = require('./organisms/organelles/callback');

Organism.remove(query, mod, options, callback);
```

E o retorno:

```
➜ (git:(master) ✗) ➜ node testOrganismRemove.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { ok: 1, n: 0 }
```

### Aluno

```js
'use strict';

const mongoose = require('mongoose');
const Molecule = require('./../molecules/aluno');
const Organism = mongoose.model('Aluno', Molecule);

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

#### create - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/aluno');
const callback = require('./organisms/organelles/callback');
const obj = {
  user_id: '56f760cb94e41479715ff29f'
, name: 'Suissa Aluno'
, dateBirth: Date('1984/11/20')
, cursos: ['56f76ee8053c543373ad29ef']
}

Organism.create(obj, callback);
```

```
➜ node testOrganismCreate.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { cursos: [ 56f76ee8053c543373ad29ef ],
  _id: 56f7786a8a5dfec973fcf378,
  dateBirth: 'Sun Mar 27 2016 03:06:34 GMT-0300 (BRT)',
  name: 'Suissa Aluno',
  __v: 0 }

```


#### find - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/aluno');
const callback = require('./organisms/organelles/callback');
const query = {}

Organism.find(query, callback);
```

```
➜ node testOrganismFind.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: [ { cursos: [ 56f749a040671ef66c55c031 ],
    __v: 0,
    dateBirth: 'Tue Nov 20 1984 00:00:00 GMT-0300 (BRT)',
    name: 'Suissa',
    _id: 56f749f4428681046d7c1d5c },
  { cursos: [],
    __v: 0,
    dateBirth: 'Sun Mar 27 2016 02:18:45 GMT-0300 (BRT)',
    name: 'Suissa Aluno',
    user_id: 56f760cb94e41479715ff29f,
    _id: 56f76d35c949c9137395d49a },
  { cursos: [ 56f76ee8053c543373ad29ef ],
    __v: 0,
    dateBirth: 'Sun Mar 27 2016 03:06:34 GMT-0300 (BRT)',
    name: 'Suissa Aluno',
    _id: 56f7786a8a5dfec973fcf378 } ]
```


#### findOne - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/aluno');
const callback = require('./organisms/organelles/callback');
const query = {_id: '56f7786a8a5dfec973fcf378'}

Organism.findOne(query, callback);
```

```
➜ node testOrganismFindOne.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { cursos: [ 56f76ee8053c543373ad29ef ],
  __v: 0,
  dateBirth: 'Sun Mar 27 2016 03:06:34 GMT-0300 (BRT)',
  name: 'Suissa Aluno',
  _id: 56f7786a8a5dfec973fcf378 }
```

#### update - Testando

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const query = {_id: '56f75f7bc7a357337142a293'}
const mod = {password: 'MudeiAquiMalandro'}
const options = {};
const callback = require('./organisms/organelles/callback');

Organism.update(query, mod, options, callback);
```

```
➜ node testOrganismUpdate.js 
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { ok: 1, nModified: 1, n: 1 }
```

Só para confirmar vamos rodar o `findOne` novamente:

```
➜ node testOrganismFindOne.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { cursos: [ 56f76ee8053c543373ad29ef ],
  __v: 0,
  dateBirth: 'Sun Mar 27 2016 03:06:34 GMT-0300 (BRT)',
  name: 'Suissa ALUNO SAPECA',
  _id: 56f7786a8a5dfec973fcf378 }
```

Pronto nosso valor modificado está ali: `name: 'Suissa ALUNO SAPECA'`.

#### remove - Testando

Vamos apagar um Aluno que não estou usando ali no aluno, então vendo o nosso retorno do `find` dos Alunos escolhi esse:

```
{ cursos: [],
    __v: 0,
    dateBirth: 'Sun Mar 27 2016 02:18:45 GMT-0300 (BRT)',
    name: 'Suissa Aluno',
    user_id: 56f760cb94e41479715ff29f,
    _id: 56f76d35c949c9137395d49a }
```

Então nosso teste ficará assim:

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const query = {_id: '56f76d35c949c9137395d49a'}
const callback = require('./organisms/organelles/callback');

Organism.remove(query, mod, options, callback);
```

E o retorno:

```
➜ node testOrganismRemove.js
Mongoose default connection connected to mongodb://localhost/modelo-padrao
Mongoose default connection is open
RETORNOU: { ok: 1, n: 1 }
```


**Não coloquei o exemplo dos Professores pois é a mesma coisa de Alunos.**

> Perceba que não estamos usando TDD, no conceito de fazer os testes antes de criar a função, pois eu precisava mostrar BEM a arquitetura antes se não vocês não entenderiam tão facilmente. Mas não se preocupe, chegaremos lá.

Agora que já temos nosso CRUD funcional vamos começar a integrar ele com nosso Framework de rotas, nesse caso o...

## Express

![epaaaa](https://s-media-cache-ak0.pinimg.com/736x/fb/e2/53/fbe253bb518e4d749c40dbec5c6506dc.jpg)

Demoramos, mas chegamos!

Para facilitar nosso processo vamos iniciar um projeto com o `express-generator`:

```
express crud-express
```

Entre na pasta `crud-express`, execute o `npm install` e logo após instale o mongoose:

```
npm i --save mongoose
```

Depois copie as pastas (config, quarks, hadrons, atoms, molecules e organisms), que criamos anteriormente, para a pasta `modules/`.

**Porém perceba que não criamos as pastas para cada módulo, mas quais serão módulos?**

Lembra das nossas Entidades?

- User
- Aluno
- Cursos
- Professor

Então vamos criar uma pasta para cada um e depois separar seus arquivos corretamente, iniciamos pelo **User**.

Após criar a pasta `modules/User` você irá colar todas as pastas que estavam anteriormente em `modules`, **menos a `config` que deve estar na raiz do projeto**.

Depois disso precisamos remover os arquivos desnecessários para esse módulo, iremos deixar apenas:

- seu Organismo
  + suas Organelas
- sua Molécula
- seus Átomos
  + email
  + password
- seus Hadrons
  + emailValidateMongoose
  + passwordValidateMongoose
- seus Quarks
  + isEmpty
  + isString
  + isEmail
  + isEmailMessage
  + isPassword
  + isPasswordMessage


Beleza após fazer isso precisamos criar o módulo de rotas da nossa API em `modules/User/routes.js`:

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {});
router.get('/:id', (req, res) => {});
router.post('/', (req, res) => {});
router.put('/:id', (req, res) => {});
router.delete('/:id', (req, res) => {});
module.exports = router;
```

Criamos a estrutura dela e agora o que você acha que devemos fazer?

**\- Chamar os Organismos tio Suissa.**

![So Close](http://i.imgur.com/LQGSgLN.jpg)

Sim nós temos que **usar** nosso Organismo, porém veja como está a interface das funções do CRUD:

```js
module.exports = (Organism) => {
  return (obj, callback) => Organism.create(obj, callback);
};
```

E agora olhe o que chega nas funções das rotas:

```js
(req, res) => {}
```

> Consegue perceber?


> Ainda não?

Então vou deixar mais claro, olhe nosso *callback*:

```js
module.exports = (err, data) => {
  if (err) console.log('Erro:', err);
  else console.log('RETORNOU:', data);
};
```

Com isso conseguimos ver que a interface para usarmos nossas Organelas é:

```js
(obj, callback)
```

Pois é a mesma das funções assíncronas do Mongoose:

```js
Organism.create(obj, callback)
```

**Ok! Agora que vem a pergunta de 1 zilhão de bitcoins:**

> Como faremos para reusar nossos módulos sem modificar nossa interface?

Vamos começar pelo mais simples, colocando a lógica direto na rota:

```js
'use strict';

const express = require('express');
const router = express.Router();
const Organism = require('./organisms/user');

router.get('/', (req, res) => {
  let obj = req.body;
  let callback = (err, data, req, res) => {
    if (err) res.json(err);
    res.json(data);
  };

  Organism.find(obj, (err, data) => {
    callback(err, data, req, res);
  });
});
module.exports = router;
```

Claro que não deixaremos dessa forma, primeiramente retiramos o `callback`:

```js
// callbackExpress.js
'use strict';

module.exports = (err, data, res) => {
  if (err) return console.log('Erro:', err);
  res.json(data);
};
```

```js
'use strict';

const express = require('express');
const router = express.Router();
const Organism = require('./organisms/user');
const callbackExpress = require('./organisms/organelles/callbackExpress');

router.get('/', (req, res) => {
  let obj = req.body;

  Organism.find(obj, (err, data) => {
    callbackExpress(err, data, res);
  });
});
module.exports = router;
```

Porém mesmo assim ainda temos lógica nessa função da rota, a qual deve somente executar uma ação, para conseguirmos retirar toda a lógica da rota precisaremos criar um *Controller* (**que eu chamarei por hora de brainFind**).

```js
'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {
    let obj = req.body;

    Organism.find(obj, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};
```

Perceba que criei um módulo que **recebe um Organismo** e retorna uma função que recebe os parâmetros `(req, res)` para depois executar a ação utilizando esse Organismo passado na primeira vez.

Para usar esse módulo é **MUITOOOOO SIMPLES**, *confira comigo no REPLAYYY*:

```js
'use strict';

const express = require('express');
const router = express.Router();
const Organism = require('./organisms/user');
const callbackFind = require('./brain')(Organism);

router.get('/', (req, res) => {
  callbackFind(req, res);
});
module.exports = router;
```

Quando executamos `require('./brain')(Organism);` ele injeta nosso Organismo no `BRAIN` o qual retorna uma função que é usada em `callback(req, res)`.

Só que eu não fiz todo esse malabarismo para deixar o `callback` com `(req, res)` a toa, fiz isso para que possamos deixar nosso código assim, já foi explicado em aulas passadas:

```js
'use strict';

const express = require('express');
const router = express.Router();
const Organism = require('./organisms/user');
const callback = require('./brain')(Organism);

router.get('/', (req, res) => {
  callback(req, res);
});
module.exports = router;
```

Eu posso criar o módulo `brain` como um *Mediator* de callbacks, todavia iremos inicialmente criar 1 módulo desses para cada função do CRUD:

```js
// brainCreate.js
'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {
    let obj = req.body;
    Organism.create(obj, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};
```

```js
// brainFind.js
'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {
    let obj = req.body;

    Organism.find(obj, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};
```

```js
// brainFindOne.js
'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {
    let query = { _id: req.params.id };

    Organism.findOne(query, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};
```

```js
// brainUpdate.js
'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {
    let query = { _id: req.params.id };
    let mod = req.body;
    let options = { runValidators: true };

    Organism.update(query, mod, options, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};
```

No `brainUpdate` precisei passar `options = { runValidators: true }` para que o Mongoose execute a validação também na hora de alterar.

```js
// brainRemove.js
'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {
    let query = { _id: req.params.id };

    Organism.remove(query, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};
```

Veja como irá ficar nosso `routes.js` com essas mudanças:

```js
'use strict';

const express = require('express');
const router = express.Router();
const Organism = require('./organisms/user');
const Create = require('./brainCreate')(Organism);
const Find = require('./brainFind')(Organism);
const FindOne = require('./brainFindOne')(Organism);
const Update = require('./brainUpdate')(Organism);
const Remove = require('./brainRemove')(Organism);

router.get('/', Find);
router.get('/:id', FindOne);
router.post('/', Create);
router.put('/:id', Update);
router.delete('/:id', Remove);

module.exports = router;
```

**Muito melhor e mais legível não??**

![YEAH](https://media.giphy.com/media/fLK0eUlYZoB6E/giphy.gif)

Agora basta que façamos a mesma coisa para as outras entidades.

Tudo muito simples e fácil até agora, né?

Pois então, tenho péssimas notícias para você:

> Precisamos **REFATORAR!**

#### Populate manual

Precisamos refatorar pois ainda não implementamos o [populate]() do Mongoose, que também já foi explicado em aulas passadas.

Entretanto como eu sou ruim eu vou ensinar a implementarmos nosso próprio populate, vamos iniciar na Organela/Ação `findOne`:

```js
'use strict';

module.exports = (Organism) => {
  return (query, callback) => Organism.findOne(query, callback);
};
```

Primeira coisa que precisamos fazer é modificar o `findOne` desse jeito:

```js
'use strict';

module.exports = (Organism) => {
  return (query, callback) => Organism.findOne(query).lean().exec(callback);
};
```

Precisamos utilizar o [`lean()`](http://mongoosejs.com/docs/api.html#query_Query-lean) pois ele transforma o retorno em um JSON puro em vez de retornar um [MongooseDocument](http://mongoosejs.com/docs/api.html#document-js) e isso será necessário para que possamos modificar os objetos diretamente.

Agora vamos modificar o `exec()` para adicionar nossa lógica do *populate*:

```js
'use strict';
const mongoose = require('mongoose');

module.exports = (Organism) => {
  return (query, callback) => {

    Organism
      .findOne(query)
      .lean()
      .exec( (err, data) => {
        if(err) return console.log('ERRO', err);

        mongoose.model('User')
          .findOne({ _id: data.user_id })
          .lean()
          .exec( (err, sub) => {
            data['user'] = sub;
            callback(err, data);
          });
      });
  }
};
```

Olhe que malandragem sapeca que faço com o `mongoose.model('User')`, isso é possível pois o *Model* é um *Singleton* "global", ou seja, você só pode criar ele 1 vez e depois pode usar ele onde quiser.

Depois de fazer a busca pelo Aluno eu monto a *query* `{ _id: data.user_id }` para buscar o User correto adicionando-o em `data['user']` e finalmente executo o `callback`.

**PRONTO!** Com esse código ele já irá popular seu User, retornando:

```js
{
    "_id": "56f7d79820475b3884c127e2",
    "user_id": "56f7b8f45a1bd68b7871640f",
    "name": "Suissera",
    "__v": 0,
    "user": {
        "_id": "56f7b8f45a1bd68b7871640f",
        "email": "macio@sedoso.com",
        "password": "tetinhaMacia666",
        "__v": 0
    }
}
```

Agora como de praxe precisamo encapsular essa lógica do *populate* em uma função:

```js
const populate = (model, query, populateObj) => {
  let doc = populateObj.base;
  model
    .findOne(query)
    .lean()
    .exec( (err, data) => {
      doc[populateObj.ref] = data;
      populateObj.cb(err, doc);
    });
};
```

Para não ficar com muitos parâmetros preferi encapsular 3 valores no objeto `populateObj`:

```js
const populateObj = {base: data, ref: 'user', cb: callback};
```

Juntando tudo ficou assim:

```js
'use strict';
const mongoose = require('mongoose');

const populate = (model, query, populateObj) => {
  let doc = populateObj.base;
  model
    .findOne(query)
    .lean()
    .exec( (err, data) => {
      doc[populateObj.ref] = data;
      populateObj.cb(err, doc);
    });
};
module.exports = (Organism) => {
  return (obj, callback) => {

    Organism.findOne(obj).lean().exec( (err, data) => {
      if(err) return console.log('ERRO', err);

      const query = { _id: data.user_id };
      const populateObj = {base: data, ref: 'user', cb: callback};
      populate(mongoose.model('User'), query, populateObj);
    });
  }
};

```

Só que esse código ainda está muito estático, nós estamos definindo `query = { _id: data.user_id }` diretamente com o nome do campo, mas o correto é criarmos algo genérico.

Para isso precisamos saber quais os campos o *Schema* possui, conseguimos esses dados acessando `Organism.schema.paths`:

```js
 { user_id: 
   ObjectId {
     path: 'user_id',
     instance: 'ObjectID',
     validators: [],
     setters: [],
     getters: [],
     options: { type: [Object], ref: 'users' },
     _index: null },
  name: 
   SchemaString {
     enumValues: [],
     regExp: null,
     path: 'name',
     instance: 'String',
     validators: [ [Object] ],
     setters: [],
     getters: [],
     options: { type: [Function: String], required: true },
     _index: null,
     isRequired: true,
     requiredValidator: [Function] },
  _id: 
   ObjectId {
     path: '_id',
     instance: 'ObjectID',
     validators: [],
     setters: [ [Function: resetId] ],
     getters: [],
     options: { auto: true, type: [Object] },
     _index: null,
     defaultValue: [Function: defaultId] },
  __v: 
   SchemaNumber {
     path: '__v',
     instance: 'Number',
     validators: [],
     setters: [],
     getters: [],
     options: { type: [Function: Number] },
     _index: null } }
```

Precisamos transformar esse Objeto em um Array para facilitar nossa vida, iremos utilizar uma mandinga sapeca agora:

```
Object.keys(_paths).map( (key) => _paths[key])
```

O resultado disso é:

```js
 [ ObjectId {
    path: 'user_id',
    instance: 'ObjectID',
    validators: [],
    setters: [],
    getters: [],
    options: { type: [Object], ref: 'users' },
    _index: null },
  SchemaString {
    enumValues: [],
    regExp: null,
    path: 'name',
    instance: 'String',
    validators: [ [Object] ],
    setters: [],
    getters: [],
    options: { type: [Function: String], required: true },
    _index: null,
    isRequired: true,
    requiredValidator: [Function] },
  ObjectId {
    path: '_id',
    instance: 'ObjectID',
    validators: [],
    setters: [ [Function: resetId] ],
    getters: [],
    options: { auto: true, type: [Object] },
    _index: null,
    defaultValue: [Function: defaultId] },
  SchemaNumber {
    path: '__v',
    instance: 'Number',
    validators: [],
    setters: [],
    getters: [],
    options: { type: [Function: Number] },
    _index: null } ]
```

Legal agora precisamos iterar nesses objetos para achar a referência `options: { type: [Object], ref: 'users' }`:

```js
let Refs = {};
arr.forEach( (element, index) => {
  if(element.options.ref) {
    // ACHOU UMA REFERENCIA
    Refs.ref = element.options.ref;
    Refs.path = element.path;
  }
});
```

Juntando isso no nosso código anterior e encapsulando a chamada de `populate` em `runPopulate`

```js
'use strict';
const mongoose = require('mongoose');

const populate = (model, query, populateObj) => {
  let doc = populateObj.base;
  model
    .findOne(query)
    .lean()
    .exec( (err, data) => {
      doc[populateObj.ref] = data;
      populateObj.cb(err, doc);
    });
};
module.exports = (Organism) => {
  return (obj, callback) => {
    let Refs = {};
    let _paths = Organism.schema.paths;
    let arr = Object.keys(_paths).map( (key) => {return _paths[key]});
    const findRef = (arr) => {
      arr.forEach( (element, index) => {
        if(element.options.ref) {
          // ACHOU UMA REFERENCIA
          Refs.ref = element.options.ref;
          Refs.path = element.path;
        }
      });
    };
    findRef(arr);

    const runPopulate = (data, Refs) => {
      const query = { _id: data[Refs.path] };
      const populateObj = {base: data, ref: Refs.ref, path: Refs.path, cb: callback};
      populate(mongoose.model('User'), query, populateObj);
    };

    Organism.findOne(obj).lean().exec( (err, data) => {
      if(err) return console.log('ERRO', err);

      if(Object.keys(Refs).length) return runPopulate(data, Refs);
    });
  }
};
```

No último `if` estou testando o tamanho do objeto assim `Object.keys(Refs).length` pois o objeto em si não possui a propriedade `length` como os Arrays, por exemplo. Então preciso só chamarei `runPopulate` caso tivermos referências nesse objeto.

Porém ainda está muito feio esse código então bora...

#### Populate manual refatoração

Primeiramente vamos separar em outro módulo a criação daquele nosso *Array* em cima dos `schema.paths`:

```js
// modules/helpers/prepareDocMongoose
'use strict';
module.exports = (Organism) => {
  let _paths = Organism.schema.paths;
  return Object.keys(_paths).map( (key) => _paths[key]);
};
```

Usamos assim: `const arr = require('../../../helpers/prepareDocMongoose')(Organism);` para passar esse `arr` para o módulo, que faremos agora, que pesquisa se existe referências:

```js
// modules/helpers/findRefMongoose
'use strict';
module.exports = (arr) => {
  let Ref = {};
  arr.forEach( (element, index) => {
    if(element.options.ref) {
      // ACHOU UMA REFERENCIA
      Ref.ref = element.options.ref;
      Ref.path = element.path;
    }
  });
  return Ref;
};
```

E usamos: `const Refs = require('../../../helpers/findRefMongoose')(arr)`.

Para agora criarmos o módulo que irá popular realmente:

```js
'use strict';

const mongoose = require('mongoose');
const populate = require('./populateMongoose');

module.exports = {
  run: (data, Refs, cb) => {
    const query = { _id: data[Refs.path] };
    const populateObj = {base: data, ref: Refs.ref, path: Refs.path, cb: cb};

    populate.run(mongoose.model('User'), query, populateObj);
  }
};
```

Porém perceba que ainda estamos definindo `mongoose.model('User')` manualmente, precisamos criar uma lógica para conseguir esse valor do *Schema*, podemos pegar de `Refs.ref` o valor `users` que é o nome da coleção.

Como já sabemos o Mongoose pluraliza o nome do seu *Model*(User) e deixa tudo em minúscula, bom então para esse caso basta pegarmos `users`, deixar a primeira letra maiúscula e retirar o `s`

```js
let nameSingular = Refs.ref.slice(0, Refs.ref.length - 1);
let modelName = nameSingular.charAt(0).toUpperCase() + nameSingular.slice(1);
```

Agora colocamos no módulo `runPopulateMongoose`:

```js
'use strict';

const mongoose = require('mongoose');
const populate = require('./populateMongoose');

module.exports = {
  run: (data, Refs, cb) => {
    const query = { _id: data[Refs.path] };
    const populateObj = {base: data, ref: Refs.ref, path: Refs.path, cb: cb};
    let nameSingular = Refs.ref.slice(0, Refs.ref.length - 1);
    let modelName = nameSingular.charAt(0).toUpperCase() + nameSingular.slice(1);
    populate.run(mongoose.model(modelName), query, populateObj);
  }
};
```

Óbvio que você notou que eu já encapsulei em outro módulo, o `populateMongoose`, a lógica que faz o populate realmente dito:

```js
'use strict';
module.exports = {
  run: (model, query, populateObj) => {
    let doc = populateObj.base;
    model
      .findOne(query)
      .lean()
      .exec( (err, data) => {
        doc[populateObj.ref] = data;
        populateObj.cb(err, doc);
      });
  }
};
```


#### Populate manual - Arrays

Para exemplificarmos como criar o populate para `_ids` que estão dentro de *Arrays* como na Molécula de `Alunos` onde temos `cursos`:

```js
const Molecule = {
  user_id: require('./../atoms/userRef')(Schema)
, name: require('./../atoms/name')
, dateBirth: require('./../atoms/dateBirth')
, cursos: [ require('./../atoms/cursoRef')(Schema) ]
}
```

Onde o Átomo `cursoRef` possui apenas esse código abaixo:

```js
module.exports = (Schema) => {
  return { type: Schema.Types.ObjectId, ref: 'cursos' };
};
```

Depois de sabermos disso precisamos verificar como é a estrutura que o Mongoose cria para esse campo dando um  `console.log(Organism.schema.paths)` e o resultado é esse:

```js
SchemaArray {
   casterConstructor: { [Function: ObjectId] schemaName: 'ObjectId' },
   caster: 
    ObjectId {
      path: 'cursos',
      instance: 'ObjectID',
      validators: [],
      setters: [],
      getters: [],
      options: [Object],
      _index: null },
   path: 'cursos',
   instance: 'Array',
   validators: [],
   setters: [],
   getters: [],
   options: { type: [Object] },
   _index: null,
   defaultValue: [Function] },
```

Percebemos que tem uma estrutura diferente das anteriores precisamos mudar inicialmente o arquivo `findRefMongoose` que é o responsável por encontrar as referências para outras coleções.

Como vimos anteriormente o `SchemaArray` possui o objeto `caster`, logo basta testar sua existência para posteriormente definir o `ref` e `path`:

```js
if(element.caster) {
  let obj = {};
  // ACOU UMA REFERENCIA EM ARRAY
  obj.ref = element.options.type[0].ref;
  obj.path = element.path;
  RefsReturn.push(obj);
}
```

Colocando tudo junto:

```js
'use strict';
module.exports = (arr) => {
  let Refs = [];
  let RefsReturn = [];

  Refs = arr.filter((element) => (element.options.ref) || element.caster);
  Refs.forEach( (element, index) => {
    if(element.options.ref) {
      let obj = {};
      // ACHOU UMA REFERENCIA SIMPLES
      obj.ref = element.options.ref;
      obj.path = element.path;
      RefsReturn.push(obj);
    }
    if(element.caster) {
      let obj = {};
      // ACOU UMA REFERENCIA EM ARRAY
      obj.ref = element.options.type[0].ref;
      obj.path = element.path;
      RefsReturn.push(obj);
    }
  });
  return RefsReturn;
};
```

Obviamente você percebeu que retornamos um *Array* em vez de um Objeto, por isso precisamos mudar o `runPopulateMongoose` pois é nele que estamos utilizando o `Refs`.

Então como estamos recebendo um *Array* em vez de objeto iremos iterar sobre o `Refs`

```js
'use strict';

const mongoose = require('mongoose');
const populate = require('./populateMongoose');

module.exports = {
  run: (data, Refs, cb) => {
    Refs.forEach( function(element, index) {
      let query = { _id: data[element.path] };
      let populateObj = {
        base: data
      , ref: element.ref
      , path: element.path
      , cb: cb
      };
      let nameSingular = element.ref.slice(0, element.ref.length - 1);
      let modelName = nameSingular.charAt(0).toUpperCase() + nameSingular.slice(1);
      populate.run(mongoose.model(modelName), query, populateObj, Refs, index);
    });
  }
};
```

E agora chegamos no coração do negócio, o `populateMongoose`:

```js
'use strict';
module.exports = {
  run: (model, query, populateObj) => {
    let doc = populateObj.base;
    model
      .findOne(query)
      .lean()
      .exec( (err, data) => {
        doc[populateObj.ref] = data;
        populateObj.cb(err, doc);
      });
  }
};
```

Precisamos adicionar nesse módulo a lógica para buscar cada um dos elementos referenciados pelos seus `_ids`, porém antes de tudo necessitamos testar se a a nossa `query._id` é um *Array*, basta testar com:

```js
Array.isArray(query._id)
```

Pronto agora sabendo que temos um *Array* podemos iterar sobre ele para que em cada iteração nós busquemos o elemento e adicionarmos a resposta no seu `path`:

```js

'use strict';
module.exports = {
  run: (model, query, populateObj, Refs, index) => {
    let doc = populateObj.base;
    if(Array.isArray(query._id)) {
      query._id.forEach( function(element, index) {
        let q = {_id: element}
        model
          .findOne(q)
          .lean()
          .exec( (err, data) => {
            if(!index) doc[populateObj.path] = [];

            doc[populateObj.path].push(data);
            if(index === Refs.length - 1) {
              populateObj.cb(err, doc);
            }
          });
      });
    }
    else {
      //  Referencia unica tipo users_id
      model
        .findOne(query)
        .lean()
        .exec( (err, data) => {
          let name = populateObj.path.split('_id')[0];
          delete doc[populateObj.path];
          doc[name] = data;
          if(index === Refs.length - 1) {
            populateObj.cb(err, doc);
          }
        });
    }
  }
}
```

Podemos melhorar esse código é claroooooo!

Primeira coisa que faremos é criar uma função para o callback no `else`:

```js
const refObjectId = (err, data) => {
  let name = populateObj.path.split('_id')[0];
  // deleto o campo user_id
  delete doc[populateObj.path];
  // e adiciono o campo user
  doc[name] = data;
  if(index === Refs.length - 1) populateObj.cb(err, doc);
}
```

Depois criamos o *callback* da busca via *Array*:

```js

const refArrayObjectId = (element, index) => {
  let q = {_id: element}
  model
    .findOne(q)
    .lean()
    .exec( (err, data) => {
      // caso seja a primeira iteração
      // limpamos o Array
      if(!index) doc[populateObj.path] = [];

      doc[populateObj.path].push(data);
      if(index === query._id.length -1) {
        populateObj.cb(err, doc);
      }
    });
}
```

Juntando tudo temos:

```js
'use strict';

module.exports = {
  run: (model, query, populateObj, Refs, index) => {

    let doc = populateObj.base;

    const refObjectId = (err, data) => {
      let name = populateObj.path.split('_id')[0];
      // deleto o campo user_id
      delete doc[populateObj.path];
      // e adiciono o campo user
      doc[name] = data;
      if(index === Refs.length - 1) populateObj.cb(err, doc);
    }

    const refArrayObjectId = (element, index) => {
      let q = {_id: element}
      model
        .findOne(q)
        .lean()
        .exec( (err, data) => {
          // caso seja a primeira iteração
          // limpamos o Array
          if(!index) doc[populateObj.path] = [];

          doc[populateObj.path].push(data);
          if(index === Refs.length) {
            populateObj.cb(err, doc);
          }
        });
    }

    if(Array.isArray(query._id)) query._id.forEach(refArrayObjectId);
    else model.findOne(query).lean().exec(refObjectId);
  }
}
```

## Populate Padrão

Com nosso *populate* manual teremos o seguinte padrão:

> Campo que referencie diretamente um `_id` será removido e adicionado o objeto retornado da sua referência.

> Campo que referencie um *Array* de `_ids` será sobrescrito com os objetos retornados da sua referência.

Ex.:

```js
// Átomo
module.exports = (Schema) => {
  return { type: Schema.Types.ObjectId, ref: 'users' };
};
```

```js
// Átomo
module.exports = (Schema) => {
  return { type: Schema.Types.ObjectId, ref: 'cursos' };
};
```

```js
const Molecule = {
  user_id: require('./../atoms/userRef')(Schema)
, name: require('./../atoms/name')
, disciplinas: [ require('./../atoms/cursoRef')(Schema) ]
}
```

Percebeu que usei `disciplinas` em vez de `cursos` né?

Foi apenas para mostrar na resposta que funciona com qualquer nome. :p

Resposta da busca por 1 entidade:

```js
{
    "_id": "56f7d79820475b3884c127e2",
    "disciplinas": [
        {
            "_id": "56f749a040671ef66c55c031",
            "name": "Be MEAN",
            "dateBegin": "Mon Jun 20 2016 00:00:00 GMT-0300 (BRT)",
            "link": "https://github.com/Webschool-io/be-mean-instagram",
            "__v": 0
        },
        {
            "_id": "56f76ee8053c543373ad29ef",
            "name": "Be MEAN Funcional",
            "dateBegin": "Sun Mar 27 2016 02:26:00 GMT-0300 (BRT)",
            "link": "https://github.com/Webschool-io/workshop-js-funcional-free",
            "__v": 0
        }
    ],
    "user": {
        "_id": "56f7b8f45a1bd68b7871640f",
        "email": "macio@sedoso.teta",
        "password": "tetinhaMacia666",
        "__v": 0
    }
}
```

