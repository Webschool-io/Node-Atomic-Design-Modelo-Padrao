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

Irei cadastrar sem Cursos por hora.

```js
'use strict';

require('./config/db');
const Organism = require('./organisms/aluno');
const callback = require('./organisms/organelles/callback');
const obj = {
  user_id: '56f760cb94e41479715ff29f'
, name: 'Suissa Aluno'
, dateBirth: Date('1984/11/20')
}

Organism.create(obj, callback);
```

```
 ➜ node testOrganismCreate.js
RETORNOU: { cursos: [],
  _id: 56f76d35c949c9137395d49a,
  dateBirth: 'Sun Mar 27 2016 02:18:45 GMT-0300 (BRT)',
  name: 'Suissa Aluno',
  user_id: 56f760cb94e41479715ff29f,
  __v: 0 }
```


## Express


