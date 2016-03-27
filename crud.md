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

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Curso = require('./curso');

const Molecule = {
  name: require('./../atoms/name');
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
  name: require('./../atoms/name');
, dateBegin: require('./../atoms/dateBegin')
, link: require('./../atoms/link')
}

module.exports = new Schema(Molecule);
```
### Professor