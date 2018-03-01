# Datepicker
A minimal datepicker without any external dependencies.

## Features
* Preserve model value to be consistent ( which is : **yyyy-mm-dd** ) with database, so there's no need for further format manipulation on back end when you want to store the value to database.
* Support for multiple date format

## Demo
Check out the demos here : https://brianalexandro.github.io/datepicker/

## Getting Started
Download the code, and open **index.html** file.

Include the **style.css** file inside the ```<head>``` tag.

```
<link rel="stylesheet" href="style.css">
```

And then include the **AngularJS Core** as well as **app.js**, **app.filter.js**, **app.factory.js**, **app.directive.js** file at the end of ```<body>``` tag.

```
<script src="https://code.angularjs.org/1.6.3/angular.min.js"></script>

<script type="text/javascript" src="app.js"></script>
<script type="text/javascript" src="app.filter.js"></script>
<script type="text/javascript" src="app.factory.js"></script>
<script type="text/javascript" src="app.directive.js"></script>
```

Finally, include the datepicker directive, and we are set.

```
<ui-datepicker dr-model="$ctrl.date"></ui-datepicker>
```

## List of Directive Attributes

| Attribute | Description | Required | Example |
| --- | --- | --- | --- |
| dr-model | Directive model | Yes | $ctrl.date |
| init-min-date | Set a minimum date | No | Any date with **yyyy-mm-dd** format |
| init-max-date | Set a minimum date | No | Any date with **yyyy-mm-dd** format |
| format-date | Set the selected format. default : **dd-mm-yyyy** | No | yyyy-mm-dd, dd-mm-yyyy, etc |
| on-change-date | Set the callback that will be triggered when date is changed | No | $ctrl.onChangeDate() |
| class-name | Set an additional class name that will be applied to directive input | No | **className** |
| is-disabled | Set the expression when the directive will be disabled | No | $ctrl.isDisabled |
| is-required | Set the expression when the directive will be required | No | $ctrl.isRequired |
| input-name | Set the input ```name``` value | No | **inputNameValue** |

## License
MIT License

Copyright (c) 2018 brianalexandro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
