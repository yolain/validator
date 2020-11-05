# validation

[yolain/validation](https://github.com/yolain/validation) 是一款非常易用的JavaScript验证器，它的使用方式类似于PHP里Laravel Validation，它可以帮助我们更高效的验证表单和请求对象的规则。<br>
我们从 [Validatorjs](https://github.com/skaterdav85/validatorjs) Fork了下来，在不改动原始逻辑的前提下做了些输出错误的调整，以便我们更好地进行开发。

## 为什么使用验证器?

* 不依赖任何库
* 在浏览器和Nodejs中都可以工作
* 可读和声明性验证规则
* 支持多语言错误消息
* AMD公司/要求.js以及CommonJS/Browserify支持

## 安装

### 使用npm

```bash
npm install @yolain/validation
```

### 使用yarn

```bash
yarn add @yolain/validation
```

### 浏览器使用

```html
<script src="validator.js"></script>
```

### Node.js / Browserify

```js
// ES5
let Validator = require('@yolain/validation');
```

```js
// ES6
import Validator from '@yolain/validation';
```

### 基础使用

```js
let validation = new Validator(data, rules ,[customErrorMessages]);
```

__data__ {Object} - 传入你要验证的对象

__rules__ {Object} - 验证规则对象

__customErrorMessages__ {Object} - （可选）自定义错误信息返回

#### 案例1 - 通过验证

```js
let data = {
  name: 'John',
  email: 'johndoe@gmail.com',
  age: 28
};

let rules = {
  name: 'required',
  email: 'required|email',
  age: 'min:18'
};

let validation = new Validator(data, rules);

validation.passes(); // true
validation.fails(); // false
```

若要将验证规则应用于 _data_ 对象，请在 _rule_ 对象下使用相同的键名。

#### 案例2 - 验证失败的处理

```js
let validation = new Validator({
  name: 'D',
  email: 'not an email address.com'
}, {
  name: 'size:3',
  email: 'required|email'
},{
  name:'姓名',
  email:'邮箱地址'
});

validation.fails(); // true
validation.passes(); // false

// 返回错误的文案 (原始)
validation.errors.first('email'); // '邮件格式不正确'
validation.errors.get('email'); // 返回一个所有邮件格式错误的数组

// 💡 返回错误的文案 (新增)
validation.errors.first(''); // '姓名的长度必须等于3' <- 返回第一个出错的文案
validation.errors.all(true); // ['姓名的长度必须等于3','邮箱地址格式不正确'] <- 返回所有出错的文案数组 
```

### 嵌套规则

嵌套对象同样可以进行校验, 有两种方法可以声明嵌套对象的验证规则。第一种方法是使用反映数据的相应嵌套对象结构来声明验证规则。第二种方法是用扁平化的键名声明验证规则。例如，要验证以下数据：

```js
let data = {
  name: 'John',
  bio: {
    age: 28,
    education: {
      primary: '小学',
      secondary: '中学'
    }
  }
};
```

我们可以声明我们的验证规则如下：

```js
let nested = {
  name: 'required',
  bio: {
    age: 'min:18',
    education: {
      primary: 'string',
      secondary: 'string'
    }
  }
};

// OR

let flattened = {
  'name': 'required',
  'bio.age': 'min:18',
  'bio.education.primary': 'string',
  'bio.education.secondary': 'string'
};
```

### 通配符规则

通配符也可以进行校验

```js
let data = {
  users: [{
    name: 'John',
    bio: {
      age: 28,
      education: {
        primary: '小学',
        secondary: '中学'
      }
    }
  }]
};
```

我们可以声明我们的通配符规则如下：

```js
let rules = {
  'users.*.name': 'required',
  'users.*.bio.age': 'min:18',
  'users.*.bio.education.primary': 'string',
  'users.*.bio.education.secondary': 'string'
};
```

### 可使用的规则

验证规则没有隐式 'required'，如果字段是 _undefined_ 或空字符串，则它将通过验证，如果希望未定义或“”的验证失败，请使用 _required_ 规则

#### accepted

验证的字段必须是yes、on、1或true。这对于验证“服务条款”的接受是很有用的

#### after:date

验证的字段必须在给定日期之后

#### after_or_equal:date

验证的字段必须在给定日期之后或当天

#### alpha

验证的字段必须完全是字母字符

#### alpha_dash

验证的字段只能包含字母或数字，以及破折号和下划线

#### alpha_num

验证的字段必须完全是字母数字字符

#### array

验证的字段必须是数组

#### before:date

验证的字段必须在给定日期之前。

#### before_or_equal:date

验证的字段必须早于或当天

#### between:min,max

验证的字段的大小必须介于给定的最小值和最大值之间。字符串、数字和文件的计算方式与大小规则相同

#### boolean

验证的字段必须是形式为 _true_、_false_、_0_、_1_、_"true”_、_“false”_、_“0”_、_“1”_ 的布尔值

#### confirmed

验证字段必须有一个匹配的 _foo_confirmation_ 字段。例如，如果验证下的字段是 _password_，则输入中必须存在匹配的 _password_confirmation_ 字段

#### date

验证字段必须是Javascript _“date”_ 对象的有效日期格式

#### digits:value

验证字段必须是数字，并且必须具有精确的值长度

#### digits_between:min,max

验的字段必须是数字，并且长度必须介于给定的最小值和最大值之间

#### different:attribute

给定字段必须与验证字段不同

#### email

验证字段的格式必须为电子邮件地址

#### hex

验证字段应为十六进制格式。与其他规则（如hex）结合使用时非常有用 _`hex|size:6`_ 用于十六进制颜色代码验证。

#### in:foo,bar,...

验证字段必须包含在给定的值列表中，该字段可以是数组或字符串

#### integer

验证字段必须为整数值。

#### max:value

验证值不能超过给定大小

_Note: Maximum checks are inclusive._

#### min:value

验证值不能少于给定大小

_Note: Minimum checks are inclusive._

#### not_in:foo,bar,...

验证字段不能包含在给定的值列表中

#### numeric

验证值是否为数值，数字的字符串表示将通过

#### present

验证字段必须存在于输入数据中，但可以为空

#### required

验证字段必须存在于输入数据中，且不可以为空

#### required_if:anotherfield,value

如果另一个字段等于任何值，则验证的字段必须存在且不为空

#### required_unless:anotherfield,value

验证的段必须存在且不为空，除非另一个字段等于任何值

#### required_with:foo,bar,...

只有在其他指定字段存在时，验证的字段必须存在且不为空

#### required_with_all:foo,bar,...

只有当所有其他指定字段都存在时，验证的字段必须存在且不为空

#### required_without:foo,bar,...

只有在任何其他指定字段不存在时，验证的字段必须存在且不为空

#### required_without_all:foo,bar,...

只有当所有其他指定字段都不存在时，验证的字段必须存在且不为空

#### same:attribute

给定字段必须与验证字段匹配

#### size:value

验证字段的大小必须与给定值匹配

#### string

验证字段必须是字符串。

#### url

验证属性是否具有有效的URL格式

#### regex:pattern

验证字段必须与给定的正则表达式匹配

**注意**：使用“regex”模式时，可能需要在数组中指定规则，而不是使用 _"|"_ 分隔符，尤其是当正则表达式包含 _"|"_ 字符时。<br>
对于正则表达式模式中使用的每个反斜杠，必须用另一个反斜杠对每个反斜杠进行转义。

#### 案例3 - 正则表达式验证

```js
let validation = new Validator({
  name: 'Doe',
  salary: '10,000.00',
  yearOfBirth: '1980'
}, {
  name: 'required|size:3',
  salary: ['required', 'regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/'],
  yearOfBirth: ['required', 'regex:/^(19|20)[\\d]{2,2}$/']
});

validation.fails(); // false
validation.passes(); // true

```

#### 案例4 - 类型检查验证          

```js
let validation = new Validator({
  age: 30,
  name: ''
}, {
  age: ['required', { 'in': [29, 30] }],
  name: [{ required_if: ['age', 30] }]
});

validation.fails(); // true
validation.passes(); // false

```

### 注册自定义的验证规则

```js
Validator.register(name, callbackFn, errorMessage);
```

__name__ {String} - 规则名称

__callbackFn__ {Function} - 回调函数返回表示验证成功或失败的布尔值。

__errorMessage__ {String} - 一个可选字符串，您可以在其中指定自定义错误消息。_:attribute_ 在errorMessage中将替换为属性名称。

```js
Validator.register('telephone', function(value, requirement, attribute) { // requirement parameter defaults to null
  return value.match(/^\d{3}-\d{3}-\d{4}$/);
}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');
```

### 异步验证

注册接受“passes”回调的异步规则：

```js
Validator.registerAsync('username_available', function(username, attribute, req, passes) {
  // do your database/api checks here etc
  // then call the `passes` method where appropriate:
  passes(); // if username is available
  passes(false, 'Username has already been taken.'); // if username is not available
});
```

然后使用 `checkAsync` 通过`failes`和`passes`回调调用验证器，如下所示：


```js
let validator = new Validator({
	username: 'test123'
}, {
	username: 'required|min:3|username_available'
});

function passes() {
  // Validation passed
}

function fails() {
  validator.errors.first('username');
}

validator.checkAsync(passes, fails);

```

### 错误信息

构造函数将为失败的验证规则自动生成错误消息。

如果有错误，验证器实例将会把所有验证失败的错误消息添加到 __errors__ 对象中。
__errors__ 对象可使用的方法和属性有以下：

#### .first(attribute `not required`)

返回第一条错误消息，否则为false

#### .get(attribute)

返回属性的错误消息数组，如果没有错误，则返回空数组

#### .all(full `Boolean`)

返回一个包含所有错误消息的对象

#### .has(attribute)

如果属性存在错误消息，则返回true，否则返回false

#### .errorCount

验证错误数

```js
let validation = new Validator(input, rules);
// 返回错误的文案 (原始)
validation.errors.first('email'); // '邮件格式不正确'
validation.errors.get('email'); // 返回一个所有邮件格式错误的数组

// 返回错误的文案 (新增)
validation.errors.first(''); // '姓名的长度必须等于3' <- 返回第一个出错的文案
validation.errors.all(true); // ['姓名的长度必须等于3','邮箱地址格式不正确'] <- 返回所有出错的文案数组 
```

### 自定义错误信息

如果您需要一个特定的错误消息，并且不想重写默认的错误消息，那么可以覆盖第三个参数传递给Validator对象，就像 [Laravel](http://laravel.com/docs/validation#custom-error-messages).

```js
let input = {
  name: ''
};

let rules = {
  name : 'required'
};

let validation = new Validator(input, rules, { required: 'You forgot to give a :attribute' });
validation.errors.first('name'); // returns 'You forgot to give a name'
```

一些验证器字段需要配置 _string_ 和 _numeric_，你同意可以这样覆盖它

```js
let input = {
  username: 'myusernameistoolong'
};

let rules = {
  username : 'max:16'
};

let validation = new Validator(input, rules, {
  max: {
    string: 'The :attribute is too long. Max length is :max.'
  }
});

validation.errors.first('username'); // returns 'The username is too long. Max length is 16.'
```

您甚至可以根据每个属性提供错误消息！只需将消息的键设置为'验证器.属性'

```js
let input = { name: '', email: '' };
let rules = { name : 'required', email : 'required' };

let validation = new Validator(input, rules, {
  "required.email": "Without an :attribute we can't reach you!"
});

validation.errors.first('name'); // returns  'The name field is required.'
validation.errors.first('email'); // returns 'Without an email we can\'t reach you!'
```

__`New 新增 +`__ 

上述方式并不能很好的运用于实际项目中，于是我们新增了只需根据'属性'就可以更改错误信息的方式。

通过 _'属性':'需要被替换的:attribute名称'_ 输出错误，参考如下：
```js
let input = { name: '小明', email: 'a@test.com' };
let rules = { name : 'required', email : 'required|email' };

let validation = new Validator(input, rules, {
  "email": "邮箱地址"
});

validation.errors.first(); // 返回'邮箱地址格式不正确'
```

当然我们也可以通过 _'属性':{'验证属性':'自定义错误文案','text':'其他属性被替换的:attribute名称''}_ 输出错误，参考如下：
```js
let input = { name: '小明', email: 'a@test.com' };
let rules = { name : 'required', email : 'required|min:8|email' };

let validation = new Validator(input, rules, {
  "email":{min:'Email长度不符合',text:'邮箱地址'}
});

validation.errors.all(true); // 返回 ['Email长度不符合','邮箱地址格式不正确']
```


### 自定义属性名称


要在错误消息中显示自定义的“友好”属性名，请使用`.setAttributeNames()`

```js
let validator = new Validator({ name: '' }, { name: 'required' });
validator.setAttributeNames({ name: 'custom_name' });
if (validator.fails()) {
  validator.errors.first('name'); // "The custom_name field is required."
}
```

或者，您可以使用language中的 _“attributes”_ 属性提供全局自定义属性名。

还可以配置自定义属性格式化程序：

```js
// Configure global formatter.
Validator.setAttributeFormatter(function(attribute) {
  return attribute.replace(/_/g, ' ');
});

// Or configure formatter for particular instance.
let validator = new Validator({ first_name: '' }, { first_name: 'required' });
validator.setAttributeFormatter(function(attribute) {
  return attribute.replace(/_/g, ' ');
});
if (validator.fails()) {
  console.log(validator.errors.first('first_name')); // The first name field is required.
}
```

**注意**：默认情况下，所有 _ 的字符都将替换为空格。


### 多语言支持

默认情况下，错误消息为英语。若要在浏览器中包含其他语言，请在脚本标记中引用该语言文件并调用 `Validator.useLang('lang_code')`.

```html
<script src="dist/validator.js"></script>
<script src="dist/lang/ru.js"></script>
<script>
  Validator.useLang('es');
</script>
```

在 Node中它将自动拾取语言源文件

```js
let Validator = require('@yolain/validation');
Validator.useLang('zh');
```

如果您没有看到对您的语言的支持，请添加一个到`src/lang`!

您还可以通过调用`setMessages`:

```js
Validator.setMessages('lang_code', {
  required: 'The :attribute field is required.'
});
```

获取给定语言的消息的原始对象：

```js
Validator.getMessages('lang_code');
```

切换验证器使用的默认语言：

```js
Validator.useLang('lang_code');
```

获取正在使用的默认语言：

```js
Validator.getDefaultLang(); // returns e.g. 'en'
```

重写语言的默认消息：

```js
let messages = Validator.getMessages('en');
messages.required = 'Whoops, :attribute field is required.';
Validator.setMessages('en', messages);
```

### License

Copyright &copy; 2012-2019 David Tang
Released under the MIT license

### Credits

validatorjs created by David Tang
validatorjs maintained by Mike Erickson and Contributors

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.io](http://codedungeon.io)
