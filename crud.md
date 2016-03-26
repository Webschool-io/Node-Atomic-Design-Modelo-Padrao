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
- Cursos
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

### curso

Em vez de cursos o nome do átomo é **curso** no singular, cursos será o *Array* contando 1 ou mais `curso`.

```js
module.exports = {
  type: String
, validate: require('./../hadrons/cursoValidateMongoose')
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

## Moléculas

### User
### Aluno
### Cursos
### Professor