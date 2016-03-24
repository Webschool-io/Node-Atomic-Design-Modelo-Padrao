# Modelo Padrão

Para me diferenciar um pouco do Atomic Design criado especificamente para o Frontend, estou nomeando como Modelo Padrão a arquitetura/metodologia atômica utilizando Node.js, porém esse nome não quer dizer que ele deva ser um modelo ou um padrão, mas sim faz analogia com O [Modelo Padrão]() da física.

Espero que você curta um pouco de Física para que essa leitura não fique chata, **caso você não curta nem precisa ler o resto.**

> We’re not designing pages, we’re designing systems of components. — Stephen Hay

Citação no site do [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) no qual estou me baseando.

## Atomic Design - Opção Atual

Nessa arquitetura inicial o conceito inicial é:

> Cada campo de um Schema é 1 Átomo, pois é feito de mais de 1 Quark.

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
// quark-validate-string-lengthGTE3
module.exports = {
  validator: (v) => v >= 18
, message: 'Nome {VALUE} precisa ser maior que 3 caracteres'
};
```

- **Átomo**:

```js
// atom-name
const Atom = {
  type: String
, get: require('./../quarks/toUpper')
, set: require('./../quarks/toLower')
, validate: require('./../quarks/notEmptyStringValidate')
, required: true
}

module.exports = Atom;
```

- **Molécula**:

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

E como você pode ver na [nossa aula eu separei os Quarks em 3 tipos](https://github.com/Webschool-io/Node-Atomic-Design_QUARKS#padrão):

- to{Name}
- is{Name}
- {Name}MongooseValidate

Até aí nenhum problema, porém veja meu Quark `{Name}MongooseValidate`:

```js
// quark-validate-string-lengthGTE3
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

**- Ah para solucionar então é só nomear com os outros Quarks, não?**

Até poderia ser, porém complicaria demais algo que tende a ser muito simples.

> Então como resolver isso?

## Solução

Bom para solucionar esse problema nessa arquitetura nós podemos adicionar um grupo novo de Quarks chamado:

> Hádrons.

Vamos ver o que a [Wikipedia](https://pt.wikipedia.org/wiki/H%C3%A1dron) nos diz sobre:

> ...é uma partícula composta, formada por um estado ligado de quarks. Os hádrons mantêm a sua coesão interna devido à interação forte, de um modo análogo à que mantém os átomos unidos pela força electromagnética. Os hádrons mais conhecidos são os prótons e os neutrons.

Então podemos pensar que o Quark de validação do Mongoose pode ser um Hádron em vez de um Quark, já que o mesmo não muda suas características e sim apenas agrupa Quarks diferentes para criar uma partícula nova.

No Modelo Padrão da Física os Quarks sempre existem como um agrupamento(confinamento) de, pelo menos 3 Quarks:

> Nenhuma pesquisa para quarks livres ou carga elétrica fracionária produziu uma evidência convincente. A ausência de quarks livres foi então sendo incorporada na noção de confinamento, o qual, acredita-se, a teoria de quark deve possuir.

*fonte: [https://pt.wikipedia.org/wiki/Quark#Quarks_livres](https://pt.wikipedia.org/wiki/Quark#Quarks_livres)*

### Testes

Olha que coisa louca essa Física e como ela corrobora meus conceitos, até porque não sou burro de criar algo sem **muito embasamento teórico** né?

Vamos ver se você consegue conceber o seguinte conceito:

> Cada partícula subatômica é descrita por um pequeno conjunto de números quânticos tais como spin J, paridade P, e massa m. Usualmente estas propriedades são diretamente identificadas por experimentos. Contudo, o confinamento torna impossível medir estas propriedades nos quarks. Ao invés disto, elas devem ser inferidas pela medição das propriedades das partículas compostas que são feitas de quarks. Tais inferências são mais fáceis de serem feitas adicionando números quânticos chamados de sabor (flavor).

*fonte: [https://pt.wikipedia.org/wiki/Quark#Confinamento_e_propriedades_dos_quarks](https://pt.wikipedia.org/wiki/Quark#Confinamento_e_propriedades_dos_quarks)*

