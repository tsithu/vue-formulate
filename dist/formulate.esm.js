import t from"is-url";import e from"nanoid";import r from"is-plain-object";var n={text:{classification:"text",component:"FormulateInputText"},email:{classification:"text",component:"FormulateInputText"},number:{classification:"text",component:"FormulateInputText"},color:{classification:"text",component:"FormulateInputText"},date:{classification:"text",component:"FormulateInputText"},hidden:{classification:"text",component:"FormulateInputText"},month:{classification:"text",component:"FormulateInputText"},password:{classification:"text",component:"FormulateInputText"},search:{classification:"text",component:"FormulateInputText"},tel:{classification:"text",component:"FormulateInputText"},time:{classification:"text",component:"FormulateInputText"},url:{classification:"text",component:"FormulateInputText"},week:{classification:"text",component:"FormulateInputText"},"datetime-local":{classification:"text",component:"FormulateInputText"},range:{classification:"slider",component:"FormulateInputSlider"},textarea:{classification:"textarea",component:"FormulateInputTextArea"},checkbox:{classification:"box",component:"FormulateInputBox"},radio:{classification:"box",component:"FormulateInputBox"},submit:{classification:"button",component:"FormulateInputButton"},button:{classification:"button",component:"FormulateInputButton"},select:{classification:"select",component:"FormulateInputSelect"},file:{classification:"file",component:"FormulateInputFile"},image:{classification:"file",component:"FormulateInputFile"}},o=function(t,e,r){this.input=t,this.fileList=t.files,this.files=[],this.options=r,this.addFileList(this.fileList),this.context=e};function i(t,e){var r={};for(var n in t)r[n]=e(n,t[n]);return r}function a(t,e){if(t===e)return!0;if(!t||!e)return!1;var r=Object.keys(t),n=Object.keys(e),o=r.length;if(n.length!==o)return!1;for(var i=0;i<o;i++){var a=r[i];if(t[a]!==e[a])return!1}return!0}function s(t){return t?"string"==typeof t?[t]:Array.isArray(t)?t:"object"==typeof t?Object.values(t):[]:[]}function l(t){return"string"==typeof t?t[0].toUpperCase()+t.substr(1):t}function u(t,e){return"string"==typeof t?u(t.split("|"),e):Array.isArray(t)?t.map((function(t){return function(t,e){if("function"==typeof t)return[t,[]];if(Array.isArray(t)&&t.length){if("string"==typeof(t=t.map((function(t){return t})))[0]&&e.hasOwnProperty(t[0]))return[e[t.shift()],t];if("function"==typeof t[0])return[t.shift(),t]}if("string"==typeof t){var r=t.split(":"),n=r.shift();if(e.hasOwnProperty(n))return[e[n],r.length?r.join(":").split(","):[]];throw new Error("Unknown validation rule "+t)}return!1}(t,e)})).filter((function(t){return!!t})):[]}function c(t){switch(typeof t){case"symbol":case"number":case"string":case"boolean":case"undefined":return!0;default:return null===t}}o.prototype.addFileList=function(t){for(var r=this,n=function(n){var o=t[n],i=e();r.files.push({progress:!1,error:!1,complete:!1,justFinished:!1,name:o.name||"file-upload",file:o,uuid:i,path:!1,removeFile:function(){this.removeFile(i)}.bind(r),previewData:!1})},o=0;o<t.length;o++)n(o)},o.prototype.hasUploader=function(){return!!this.context.uploader},o.prototype.uploaderIsAxios=function(){return!(!this.hasUploader||"function"!=typeof this.hasUploader.request||"function"!=typeof this.hasUploader.get||"function"!=typeof this.hasUploader.delete||"function"!=typeof this.hasUploader.post)},o.prototype.getUploader=function(){for(var t,e=[],r=arguments.length;r--;)e[r]=arguments[r];if(this.uploaderIsAxios()){var n=new FormData;return n.append(this.context.name||"file",e[0]),this.uploader.post(this.context.uploadUrl,n,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(t){e[1](Math.round(100*t.loaded/t.total))}}).catch((function(t){return e[2](t)}))}return(t=this.context).uploader.apply(t,e)},o.prototype.upload=function(){var t=this;return new Promise((function(e,r){if(!t.hasUploader)return r(new Error("No uploader has been defined"));Promise.all(t.files.map((function(e){return e.path?Promise.resolve(e.path):t.getUploader(e.file,(function(r){e.progress=r,r>=100&&(e.complete||(e.justFinished=!0,setTimeout((function(){e.justFinished=!1}),t.options.uploadJustCompleteDuration)),e.complete=!0)}),(function(t){e.progress=0,e.error=t,e.complete=!0}),t.options)}))).then((function(t){return e(t)})).catch((function(t){throw new Error(t)}))}))},o.prototype.removeFile=function(t){if(this.files=this.files.filter((function(e){return e.uuid!==t})),window){var e=new DataTransfer;this.files.map((function(t){return e.items.add(t.file)})),this.fileList=e.files,this.input.files=this.fileList}},o.prototype.loadPreviews=function(){this.files.map((function(t){if(!t.previewData&&window&&window.FileReader&&/^image\//.test(t.file.type)){var e=new FileReader;e.onload=function(e){return Object.assign(t,{previewData:e.target.result})},e.readAsDataURL(t.file)}}))},o.prototype.getFileList=function(){return this.fileList},o.prototype.getFiles=function(){return this.files},o.prototype.toString=function(){return"FileUpload("+(this.files.length?this.files.length+" files":"empty")+")"};var d={accepted:function(t){var e=t.value;return Promise.resolve(["yes","on","1",1,!0,"true"].includes(e))},after:function(t,e){var r=t.value;void 0===e&&(e=!1);var n=Date.parse(e||new Date),o=Date.parse(r);return Promise.resolve(!isNaN(o)&&o>n)},alpha:function(t,e){var r=t.value;void 0===e&&(e="default");var n={default:/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/,latin:/^[a-zA-Z]+$/},o=n.hasOwnProperty(e)?e:"default";return Promise.resolve(n[o].test(r))},alphanumeric:function(t,e){var r=t.value;void 0===e&&(e="default");var n={default:/^[a-zA-Z0-9À-ÖØ-öø-ÿ]+$/,latin:/^[a-zA-Z0-9]+$/},o=n.hasOwnProperty(e)?e:"default";return Promise.resolve(n[o].test(r))},before:function(t,e){var r=t.value;void 0===e&&(e=!1);var n=Date.parse(e||new Date),o=Date.parse(r);return Promise.resolve(!isNaN(o)&&o<n)},between:function(t,e,r){var n=t.value;return void 0===e&&(e=0),void 0===r&&(r=10),Promise.resolve(null!==e&&null!==r&&!isNaN(e)&&!isNaN(r)&&(e=Number(e),r=Number(r),isNaN(n)?"string"==typeof n&&n.length>e&&n.length<r:(n=Number(n))>e&&n<r))},confirm:function(t,e){var r,n,o=t.value,i=t.getFormValues,a=t.name;return Promise.resolve((r=i(),(n=e)||(n=/_confirm$/.test(a)?a.substr(0,a.length-8):a+"_confirm"),r[n]===o))},date:function(t,e){var r=t.value;return void 0===e&&(e=!1),Promise.resolve(e&&"string"==typeof e?function(t){var e="^"+t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$",r={MM:"(0[1-9]|1[012])",M:"([1-9]|1[012])",DD:"([012][1-9]|3[01])",D:"([012]?[1-9]|3[01])",YYYY:"\\d{4}",YY:"\\d{2}"};return new RegExp(Object.keys(r).reduce((function(t,e){return t.replace(e,r[e])}),e))}(e).test(r):!isNaN(Date.parse(r)))},email:function(t){var e=t.value;return Promise.resolve(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(e))},in:function(t){for(var e=t.value,r=[],n=arguments.length-1;n-- >0;)r[n]=arguments[n+1];return Promise.resolve(void 0!==r.find((function(t){return"object"==typeof t?a(t,e):t===e})))},matches:function(t){for(var e=t.value,r=[],n=arguments.length-1;n-- >0;)r[n]=arguments[n+1];return Promise.resolve(!!r.find((function(t){return t instanceof RegExp?t.test(e):t===e})))},max:function(t,e,r){var n=t.value;return void 0===e&&(e=10),Promise.resolve(Array.isArray(n)?(e=isNaN(e)?e:Number(e),n.length<=e):!isNaN(n)&&"length"!==r||"value"===r?(n=isNaN(n)?n:Number(n))<=e:("string"==typeof n||"length"===r)&&(n=isNaN(n)?n:n.toString()).length<=e)},mime:function(t){for(var e=t.value,r=[],n=arguments.length-1;n-- >0;)r[n]=arguments[n+1];return Promise.resolve(function(){if(e instanceof o)for(var t=e.getFileList(),n=0;n<t.length;n++){var i=t[n];if(!r.includes(i.type))return!1}return!0}())},min:function(t,e,r){var n=t.value;return void 0===e&&(e=1),Promise.resolve(Array.isArray(n)?(e=isNaN(e)?e:Number(e),n.length>=e):!isNaN(n)&&"length"!==r||"value"===r?(n=isNaN(n)?n:Number(n))>=e:("string"==typeof n||"length"===r)&&(n=isNaN(n)?n:n.toString()).length>=e)},not:function(t){for(var e=t.value,r=[],n=arguments.length-1;n-- >0;)r[n]=arguments[n+1];return Promise.resolve(void 0===r.find((function(t){return"object"==typeof t?a(t,e):t===e})))},number:function(t){var e=t.value;return Promise.resolve(!isNaN(e))},required:function(t,e){var r=t.value;return void 0===e&&(e=!0),Promise.resolve(!(e&&!["no","false"].includes(e)&&(Array.isArray(r)?!r.length:"string"==typeof r?!r:!("object"!=typeof r||r&&Object.keys(r).length))))},url:function(e){var r=e.value;return Promise.resolve(t(r))}},p={accepted:function(t){return"Please accept the "+t.name+"."},after:function(t){var e=t.name,r=t.args;return Array.isArray(r)&&r.length?l(e)+" must be after "+r[0]+".":l(e)+" must be a later date."},alpha:function(t){return l(t.name)+" can only contain alphabetical characters."},alphanumeric:function(t){return l(t.name)+" can only contain letters and numbers."},before:function(t){var e=t.name,r=t.args;return Array.isArray(r)&&r.length?l(e)+" must be before "+r[0]+".":l(e)+" must be an earlier date."},between:function(t){var e=t.name,r=t.value,n=t.args;return isNaN(r)?l(e)+" must be between "+n[0]+" and "+n[1]+" characters long.":l(e)+" must be between "+n[0]+" and "+n[1]+"."},confirm:function(t){var e=t.name;t.args;return l(e)+" does not match."},date:function(t){var e=t.name,r=t.args;return Array.isArray(r)&&r.length?l(e)+" is not a valid, please use the format "+r[0]:l(e)+" is not a valid date."},default:function(t){t.name;return"This field isn’t valid."},email:function(t){t.name;var e=t.value;return e?"“"+e+"” is not a valid email address.":"Please enter a valid email address."},in:function(t){var e=t.name,r=t.value;return"string"==typeof r&&r?"“"+l(r)+"” is not an allowed "+e+".":"This is not an allowed "+e+"."},matches:function(t){return l(t.name)+" is not an allowed value."},max:function(t){var e=t.name,r=t.value,n=t.args;if(Array.isArray(r))return"You may only select "+n[0]+" "+e+".";var o=!(!Array.isArray(n)||!n[1])&&n[1];return!isNaN(r)&&"length"!==o||"value"===o?l(e)+" must be less than "+n[0]+".":l(e)+" must be less than "+n[0]+" characters long."},mime:function(t){var e=t.name,r=t.args;return l(e)+" must be of the the type: "+(r[0]||"No file formats allowed.")},min:function(t){var e=t.name,r=t.value,n=t.args;if(Array.isArray(r))return"You must select at least "+n[0]+" "+e+".";var o=!(!Array.isArray(n)||!n[1])&&n[1];return!isNaN(r)&&"length"!==o||"value"===o?l(e)+" must be more than "+n[0]+".":l(e)+" must be more than "+n[0]+" characters long."},not:function(t){var e=t.name;return"“"+t.value+"” is not an allowed "+e+"."},number:function(t){return l(t.name)+" must be a number."},required:function(t){return l(t.name)+" is required."},url:function(t){t.name;return"Please include a valid url."}};function m(t,e,r,n){return new Promise((function(r,o){var i=(n.fauxUploaderDuration||2e3)*(.5+Math.random()),a=performance.now(),s=function(){return setTimeout((function(){var n=performance.now()-a,o=Math.min(100,Math.round(n/i*100));if(e(o),o>=100)return r({url:"http://via.placeholder.com/350x150.png",name:t.name});s()}),20)};s()}))}var f={context:function(){return y.call(this,Object.assign({},{type:this.type,value:this.value,name:this.nameOrFallback,classification:this.classification,component:this.component,id:this.id||this.defaultId,hasLabel:this.label&&"button"!==this.classification,label:this.label,labelPosition:this.logicalLabelPosition,attributes:this.elementAttributes,blurHandler:v.bind(this),imageBehavior:this.imageBehavior,uploadUrl:this.uploadUrl,uploader:this.uploader||this.$formulate.getUploader(),uploadBehavior:this.uploadBehavior,preventWindowDrops:this.preventWindowDrops,hasValidationErrors:this.hasValidationErrors},this.typeContext))},nameOrFallback:function(){if(!0===this.name&&"button"!==this.classification)return this.type+"_"+this.elementAttributes.id;if(!1===this.name||"button"===this.classification&&!0===this.name)return!1;return this.name},typeContext:function(){var t=this;switch(this.classification){case"select":return{options:h.call(this,this.options),optionGroups:!!this.optionGroups&&i(this.optionGroups,(function(e,r){return h.call(t,r)})),placeholder:this.$attrs.placeholder||!1};case"slider":return{showValue:!!this.showValue};default:return this.options?{options:h.call(this,this.options)}:{}}},elementAttributes:function(){var t=Object.assign({},this.localAttributes);this.id?t.id=this.id:t.id=this.defaultId;return t},logicalLabelPosition:function(){if(this.labelPosition)return this.labelPosition;switch(this.classification){case"box":return"after";default:return"before"}},isVmodeled:function(){return!!(this.$options.propsData.hasOwnProperty("formulateValue")&&this._events&&Array.isArray(this._events.input)&&this._events.input.length)},mergedErrors:function(){return s(this.errors).concat(s(this.error)).concat(s(this.validationErrors)).reduce((function(t,e){return t.includes(e)?t:t.concat(e)}),[])},hasErrors:function(){return!!this.mergedErrors.length},showFieldErrors:function(){if(this.showErrors||this.formShouldShowErrors)return!0;return this.behavioralErrorVisibility},mergedValidationName:function(){if(this.validationName)return this.validationName;if("string"==typeof this.name)return this.name;if(this.label)return this.label;return this.type}};function h(t){if(!Array.isArray(t)&&t&&"object"==typeof t){var r=[];for(var n in t)r.push({value:n,label:t[n],id:this.elementAttributes.id+"_"+n});return r}return Array.isArray(t)&&!t.length?[{value:this.value,label:this.label||this.name,id:this.context.id||e(9)}]:t}function v(){"blur"===this.errorBehavior&&(this.behavioralErrorVisibility=!0)}function y(t){return Object.defineProperty(t,"model",{get:x.bind(this),set:b.bind(this)})}function x(){var t=this.isVmodeled?"formulateValue":"internalModelProxy";return"checkbox"===this.type&&!Array.isArray(this[t])&&this.options?[]:this[t]?this[t]:""}function b(t){this.internalModelProxy=t,this.$emit("input",t),this.context.name&&"function"==typeof this.formulateFormSetter&&this.formulateFormSetter(this.context.name,t)}function g(t,e,r,n,o,i,a,s,l,u){"boolean"!=typeof a&&(l=s,s=a,a=!1);var c,d="function"==typeof r?r.options:r;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,o&&(d.functional=!0)),n&&(d._scopeId=n),i?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,l(t)),t&&t._registeredComponents&&t._registeredComponents.add(i)},d._ssrRegister=c):e&&(c=a?function(t){e.call(this,u(t,this.$root.$options.shadowRoot))}:function(t){e.call(this,s(t))}),c)if(d.functional){var p=d.render;d.render=function(t,e){return c.call(e),p(t,e)}}else{var m=d.beforeCreate;d.beforeCreate=m?[].concat(m,c):[c]}return r}var w={name:"FormulateInput",inheritAttrs:!1,inject:{formulateFormSetter:{default:void 0},formulateFormRegister:{default:void 0},getFormValues:{default:function(){return function(){return{}}}}},model:{prop:"formulateValue",event:"input"},props:{type:{type:String,default:"text"},name:{type:[String,Boolean],default:!0},formulateValue:{default:""},value:{default:!1},options:{type:[Object,Array,Boolean],default:!1},optionGroups:{type:[Object,Boolean],default:!1},id:{type:[String,Boolean,Number],default:!1},label:{type:[String,Boolean],default:!1},labelPosition:{type:[String,Boolean],default:!1},help:{type:[String,Boolean],default:!1},debug:{type:Boolean,default:!1},errors:{type:[String,Array,Boolean],default:!1},validation:{type:[String,Boolean,Array],default:!1},validationName:{type:[String,Boolean],default:!1},error:{type:[String,Boolean],default:!1},errorBehavior:{type:String,default:"blur",validator:function(t){return["blur","live"].includes(t)}},showErrors:{type:Boolean,default:!1},imageBehavior:{type:String,default:"preview"},uploadUrl:{type:[String,Boolean],default:!1},uploader:{type:[Function,Object,Boolean],default:!1},uploadBehavior:{type:String,default:"live"},preventWindowDrops:{type:Boolean,default:!0},showValue:{type:[String,Boolean],default:!1},validationMessages:{type:Object,default:function(){return{}}},validationRules:{type:Object,default:function(){return{}}}},data:function(){return{defaultId:e(9),localAttributes:{},internalModelProxy:this.formulateValue||this.value,behavioralErrorVisibility:"live"===this.errorBehavior,formShouldShowErrors:!1,validationErrors:[],pendingValidation:Promise.resolve()}},computed:Object.assign({},f,{classification:function(){var t=this.$formulate.classify(this.type);return"box"===t&&this.options?"group":t},component:function(){return"group"===this.classification?"FormulateInputGroup":this.$formulate.component(this.type)}}),watch:{$attrs:{handler:function(t){this.updateLocalAttributes(t)},deep:!0},internalModelProxy:function(t,e){this.performValidation(),this.isVmodeled||a(t,e)||(this.context.model=t)},formulateValue:function(t,e){this.isVmodeled&&!a(t,e)&&(this.context.model=t)}},created:function(){this.formulateFormRegister&&"function"==typeof this.formulateFormRegister&&this.formulateFormRegister(this.nameOrFallback,this),this.updateLocalAttributes(this.$attrs),this.performValidation()},methods:{updateLocalAttributes:function(t){a(t,this.localAttributes)||(this.localAttributes=t)},performValidation:function(){var t=this,e=u(this.validation,this.$formulate.rules(this.validationRules));return this.pendingValidation=Promise.all(e.map((function(e){var r=e[0],n=e[1],o=r.apply(void 0,[{value:t.context.model,getFormValues:t.getFormValues.bind(t),name:t.context.name}].concat(n));return(o=o instanceof Promise?o:Promise.resolve(o)).then((function(e){return!e&&t.getValidationMessage(r,n)}))}))).then((function(t){return t.filter((function(t){return t}))})).then((function(e){t.validationErrors=e})),this.pendingValidation},getValidationMessage:function(t,e){return this.getValidationFunction(t)({args:e,name:this.mergedValidationName,value:this.context.model,vm:this,formValues:this.getFormValues()})},getValidationFunction:function(t){var e=this,r="_"===t.name.substr(0,1)?t.name.substr(1):t.name;if(this.validationMessages&&"object"==typeof this.validationMessages&&void 0!==this.validationMessages[r])switch(typeof this.validationMessages[r]){case"function":return this.validationMessages[r];case"string":return function(){return e.validationMessages[r]}}return function(r){return e.$formulate.validationMessage(t.name,r)}},hasValidationErrors:function(){var t=this;return new Promise((function(e){t.$nextTick((function(){t.pendingValidation.then((function(){return e(!!t.validationErrors.length)}))}))}))}}},F=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"formulate-input",attrs:{"data-classification":t.classification,"data-has-errors":t.hasErrors,"data-is-showing-errors":t.hasErrors&&t.showFieldErrors,"data-type":t.type}},[r("div",{staticClass:"formulate-input-wrapper"},[t.context.hasLabel&&"before"===t.context.labelPosition?t._t("label",[r("label",{staticClass:"formulate-input-label formulate-input-label--before",attrs:{for:t.context.attributes.id},domProps:{textContent:t._s(t.context.label)}})],null,t.context):t._e(),t._v(" "),t._t("element",[r(t.context.component,{tag:"component",attrs:{context:t.context}},[t._t("default",null,null,t.context)],2)],null,t.context),t._v(" "),t.context.hasLabel&&"after"===t.context.labelPosition?t._t("label",[r("label",{staticClass:"formulate-input-label formulate-input-label--after",attrs:{for:t.context.attributes.id},domProps:{textContent:t._s(t.context.label)}})],null,t.context.label):t._e()],2),t._v(" "),t.help?r("div",{staticClass:"formulate-input-help",domProps:{textContent:t._s(t.help)}}):t._e(),t._v(" "),t.showFieldErrors?r("FormulateInputErrors",{attrs:{errors:t.mergedErrors}}):t._e()],1)};F._withStripped=!0;var _=g({render:F,staticRenderFns:[]},void 0,w,void 0,!1,void 0,!1,void 0,void 0,void 0),P=function(t){this.form=t};P.prototype.hasValidationErrors=function(){return this.form.hasValidationErrors()},P.prototype.values=function(){var t=this;return new Promise((function(e,r){var n=[],i=function t(e){var r={};for(var n in e)e[n]instanceof o||c(e[n])?r[n]=e[n]:r[n]=t(e[n]);return r}(t.form.internalFormModelProxy);for(var a in i)"object"==typeof t.form.internalFormModelProxy[a]&&t.form.internalFormModelProxy[a]instanceof o&&n.push(t.form.internalFormModelProxy[a].upload());Promise.all(n).then((function(){return e(i)})).catch((function(t){return r(t)}))}))};var A={provide:function(){return{formulateFormSetter:this.setFieldValue,formulateFormRegister:this.register,getFormValues:this.getFormValues}},name:"FormulateForm",model:{prop:"formulateValue",event:"input"},props:{name:{type:[String,Boolean],default:!1},formulateValue:{type:Object,default:function(){return{}}}},data:function(){return{registry:{},internalFormModelProxy:{},formShouldShowErrors:!1}},computed:{hasFormulateValue:function(){return this.formulateValue&&"object"==typeof this.formulateValue},isVmodeled:function(){return!!(this.$options.propsData.hasOwnProperty("formulateValue")&&this._events&&Array.isArray(this._events.input)&&this._events.input.length)}},watch:{formulateValue:{handler:function(t,e){if(this.isVmodeled&&t&&"object"==typeof t)for(var r in t)!this.registry.hasOwnProperty(r)||a(t[r],this.internalFormModelProxy[r])||a(t[r],this.registry[r].internalModelProxy[r])||(this.setFieldValue(r,t[r]),this.registry[r].context.model=t[r])},deep:!0,immediate:!1}},created:function(){this.$options.propsData.hasOwnProperty("formulateValue")&&(this.internalFormModelProxy=Object.assign({},this.formulateValue))},methods:{setFieldValue:function(t,e){var r;Object.assign(this.internalFormModelProxy,((r={})[t]=e,r)),this.$emit("input",Object.assign({},this.internalFormModelProxy))},register:function(t,e){this.registry[t]=e;var r=Object.prototype.hasOwnProperty.call(e.$options.propsData,"formulateValue"),n=Object.prototype.hasOwnProperty.call(e.$options.propsData,"value");!r&&this.hasFormulateValue&&this.formulateValue[t]?e.context.model=this.formulateValue[t]:!r&&!n||a(e.internalModelProxy,this.formulateValue[t])||this.setFieldValue(t,e.internalModelProxy)},formSubmitted:function(){var t=this;this.showErrors();var e=new P(this);return this.$emit("submit-raw",e),e.hasValidationErrors().then((function(t){return t?void 0:e.values()})).then((function(e){if(void 0!==e)return t.$emit("submit",e),e}))},showErrors:function(){for(var t in this.registry)this.registry[t].formShouldShowErrors=!0},getFormValues:function(){return this.internalFormModelProxy},hasValidationErrors:function(){var t=[];for(var e in this.registry)"function"==typeof this.registry[e].hasValidationErrors&&t.push(this.registry[e].hasValidationErrors());return Promise.all(t).then((function(t){return!!t.find((function(t){return t}))}))}}},V=function(){var t=this,e=t.$createElement;return(t._self._c||e)("form",{on:{submit:function(e){return e.preventDefault(),t.formSubmitted(e)}}},[t._t("default")],2)};V._withStripped=!0;var N=g({render:V,staticRenderFns:[]},void 0,A,void 0,!1,void 0,!1,void 0,void 0,void 0),$={props:{errors:{type:[Boolean,Array],required:!0}}},E=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.errors.length?r("ul",{staticClass:"formulate-input-errors"},t._l(t.errors,(function(e){return r("li",{key:e,staticClass:"formulate-input-error",domProps:{innerHTML:t._s(e)}})})),0):t._e()};E._withStripped=!0;var O=g({render:E,staticRenderFns:[]},void 0,$,void 0,!1,void 0,!1,void 0,void 0,void 0);var S={name:"FormulateInputGroup",props:{context:{type:Object,required:!0}},computed:{options:function(){return this.context.options||[]},optionsWithContext:function(){var t=this,e=this.context,r=(e.options,e.labelPosition,e.attributes,e.classification,function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&-1===e.indexOf(n)&&(r[n]=t[n]);return r}(e,["options","labelPosition","attributes","classification"]));return this.options.map((function(e){return t.groupItemContext(r,e)}))}},methods:{groupItemContext:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return Object.assign.apply(Object,[{}].concat(t,[{component:"FormulateInput"}]))}}},I=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"formulate-input-group"},t._l(t.optionsWithContext,(function(e){return r(e.component,t._b({key:e.id,tag:"component",staticClass:"formulate-input-group-item",model:{value:t.context.model,callback:function(e){t.$set(t.context,"model",e)},expression:"context.model"}},"component",e,!1))})),1)};I._withStripped=!0;var C=g({render:I,staticRenderFns:[]},void 0,S,void 0,!1,void 0,!1,void 0,void 0,void 0),j={props:{context:{type:Object,required:!0}},computed:{type:function(){return this.context.type},id:function(){return this.context.id},attributes:function(){return this.context.attributes||{}},hasValue:function(){return!!this.context.model}}},D={name:"FormulateInputBox",mixins:[j]},k=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:"formulate-input-element formulate-input-element--"+t.context.type,attrs:{"data-type":t.context.type}},["checkbox"===t.type?r("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{type:"checkbox"},domProps:{value:t.context.value,checked:Array.isArray(t.context.model)?t._i(t.context.model,t.context.value)>-1:t.context.model},on:{blur:t.context.blurHandler,change:function(e){var r=t.context.model,n=e.target,o=!!n.checked;if(Array.isArray(r)){var i=t.context.value,a=t._i(r,i);n.checked?a<0&&t.$set(t.context,"model",r.concat([i])):a>-1&&t.$set(t.context,"model",r.slice(0,a).concat(r.slice(a+1)))}else t.$set(t.context,"model",o)}}},"input",t.attributes,!1)):"radio"===t.type?r("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{type:"radio"},domProps:{value:t.context.value,checked:t._q(t.context.model,t.context.value)},on:{blur:t.context.blurHandler,change:function(e){return t.$set(t.context,"model",t.context.value)}}},"input",t.attributes,!1)):r("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{type:t.type},domProps:{value:t.context.value,value:t.context.model},on:{blur:t.context.blurHandler,input:function(e){e.target.composing||t.$set(t.context,"model",e.target.value)}}},"input",t.attributes,!1)),t._v(" "),r("label",{staticClass:"formulate-input-element-decorator",attrs:{for:t.id}})])};k._withStripped=!0;var B=g({render:k,staticRenderFns:[]},void 0,D,void 0,!1,void 0,!1,void 0,void 0,void 0),M={name:"FormulateInputText",mixins:[j]},T=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:"formulate-input-element formulate-input-element--"+t.context.type,attrs:{"data-type":t.context.type}},["checkbox"===t.type?r("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.context.model)?t._i(t.context.model,null)>-1:t.context.model},on:{blur:t.context.blurHandler,change:function(e){var r=t.context.model,n=e.target,o=!!n.checked;if(Array.isArray(r)){var i=t._i(r,null);n.checked?i<0&&t.$set(t.context,"model",r.concat([null])):i>-1&&t.$set(t.context,"model",r.slice(0,i).concat(r.slice(i+1)))}else t.$set(t.context,"model",o)}}},"input",t.attributes,!1)):"radio"===t.type?r("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{type:"radio"},domProps:{checked:t._q(t.context.model,null)},on:{blur:t.context.blurHandler,change:function(e){return t.$set(t.context,"model",null)}}},"input",t.attributes,!1)):r("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{type:t.type},domProps:{value:t.context.model},on:{blur:t.context.blurHandler,input:function(e){e.target.composing||t.$set(t.context,"model",e.target.value)}}},"input",t.attributes,!1))])};T._withStripped=!0;var U=g({render:T,staticRenderFns:[]},void 0,M,void 0,!1,void 0,!1,void 0,void 0,void 0),R={name:"FormulateFiles",props:{files:{type:o,required:!0},imagePreview:{type:Boolean,default:!1}},computed:{fileUploads:function(){return this.files.files||[]}},watch:{files:function(){this.imagePreview&&this.files.loadPreviews()}},mounted:function(){this.imagePreview&&this.files.loadPreviews()}},L=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.fileUploads.length?r("ul",{staticClass:"formulate-files"},t._l(t.fileUploads,(function(e){return r("li",{key:e.uuid,attrs:{"data-has-error":!!e.error,"data-has-preview":t.imagePreview&&e.previewData}},[r("div",{staticClass:"formulate-file"},[t.imagePreview&&e.previewData?r("div",{staticClass:"formulate-file-image-preview"},[r("img",{attrs:{src:e.previewData}})]):t._e(),t._v(" "),r("div",{staticClass:"formualte-file-name",domProps:{textContent:t._s(e.name)}}),t._v(" "),!1!==e.progress?r("div",{staticClass:"formulate-file-progress",attrs:{"data-just-finished":e.justFinished,"data-is-finished":!e.justFinished&&e.complete}},[r("div",{staticClass:"formulate-file-progress-inner",style:{width:e.progress+"%"}})]):t._e(),t._v(" "),e.complete&&!e.justFinished||!1===e.progress?r("div",{staticClass:"formulate-file-remove",on:{click:e.removeFile}}):t._e()]),t._v(" "),e.error?r("div",{staticClass:"formulate-file-upload-error",domProps:{textContent:t._s(e.error)}}):t._e()])})),0):t._e()};L._withStripped=!0;var H={name:"FormulateInputFile",components:{FormulateFiles:g({render:L,staticRenderFns:[]},void 0,R,void 0,!1,void 0,!1,void 0,void 0,void 0)},mixins:[j],data:function(){return{isOver:!1}},computed:{hasFiles:function(){return!!(this.context.model instanceof o&&this.context.model.files.length)}},mounted:function(){window&&this.context.preventWindowDrops&&(window.addEventListener("dragover",this.preventDefault),window.addEventListener("drop",this.preventDefault))},destroyed:function(){window&&this.context.preventWindowDrops&&(window.removeEventListener("dragover",this.preventDefault),window.removeEventListener("drop",this.preventDefault))},methods:{preventDefault:function(t){"INPUT"!==t.target.tagName&&"file"!==t.target.getAttribute("type")&&(t=t||event).preventDefault()},handleFile:function(){this.isOver=!1;var t=this.$refs.file;t.files.length&&(this.context.model=this.$formulate.createUpload(t,this.context)),this.attemptImmediateUpload()},attemptImmediateUpload:function(){var t=this;"live"===this.context.uploadBehavior&&this.context.model instanceof o&&this.context.hasValidationErrors().then((function(e){e||t.context.model.upload()}))},handleDragOver:function(t){t.preventDefault(),this.isOver=!0},handleDragLeave:function(t){t.preventDefault(),this.isOver=!1}}},q=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:"formulate-input-element formulate-input-element--"+t.context.type,attrs:{"data-type":t.context.type,"data-has-files":t.hasFiles}},[r("div",{staticClass:"formulate-input-upload-area",attrs:{"data-has-files":t.hasFiles}},[r("input",t._b({ref:"file",attrs:{"data-is-drag-hover":t.isOver,type:"file"},on:{blur:t.context.blurHandler,change:t.handleFile,dragover:t.handleDragOver,dragleave:t.handleDragLeave}},"input",t.attributes,!1)),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.hasFiles,expression:"!hasFiles"}],staticClass:"formulate-input-upload-area-mask"}),t._v(" "),t.hasFiles?r("FormulateFiles",{attrs:{files:t.context.model,"image-preview":"image"===t.context.type&&"preview"===t.context.imageBehavior}}):t._e()],1)])};q._withStripped=!0;var G=g({render:q,staticRenderFns:[]},void 0,H,void 0,!1,void 0,!1,void 0,void 0,void 0),Y={name:"FormulateInputButton",mixins:[j]},W=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:"formulate-input-element formulate-input-element--"+t.context.type,attrs:{"data-type":t.context.type}},[r("button",t._b({attrs:{type:t.type}},"button",t.attributes,!1),[t._t("default",[r("span",{class:"formulate-input-element--"+t.context.type+"--label",domProps:{textContent:t._s(t.context.value||t.context.label||t.context.name||"Submit")}})])],2)])};W._withStripped=!0;var z=g({render:W,staticRenderFns:[]},void 0,Y,void 0,!1,void 0,!1,void 0,void 0,void 0),Z={name:"FormulateInputSelect",mixins:[j],computed:{options:function(){return this.context.options||{}},optionGroups:function(){return this.context.optionGroups||!1},placeholderSelected:function(){return!(this.hasValue||!this.context.attributes||!this.context.attributes.placeholder)}}},J=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:"formulate-input-element formulate-input-element--"+t.context.type,attrs:{"data-type":t.context.type}},[r("select",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{"data-placeholder-selected":t.placeholderSelected},on:{blur:t.context.blurHandler,change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.context,"model",e.target.multiple?r:r[0])}}},"select",t.attributes,!1),[t.context.placeholder?r("option",{attrs:{value:"",disabled:""},domProps:{selected:!t.hasValue}},[t._v("\n      "+t._s(t.context.placeholder)+"\n    ")]):t._e(),t._v(" "),t.optionGroups?t._l(t.optionGroups,(function(e,n){return r("optgroup",{key:n,attrs:{label:n}},t._l(e,(function(e){return r("option",t._b({key:e.id,domProps:{value:e.value,textContent:t._s(e.label)}},"option",e.attributes||{},!1))})),0)})):t._l(t.options,(function(e){return r("option",t._b({key:e.id,domProps:{value:e.value,textContent:t._s(e.label)}},"option",e.attributes||{},!1))}))],2)])};J._withStripped=!0;var X=g({render:J,staticRenderFns:[]},void 0,Z,void 0,!1,void 0,!1,void 0,void 0,void 0),K={name:"FormulateInputSlider",mixins:[j]},Q=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:"formulate-input-element formulate-input-element--"+t.context.type,attrs:{"data-type":t.context.type}},["checkbox"===t.type?r("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.context.model)?t._i(t.context.model,null)>-1:t.context.model},on:{blur:t.context.blurHandler,change:function(e){var r=t.context.model,n=e.target,o=!!n.checked;if(Array.isArray(r)){var i=t._i(r,null);n.checked?i<0&&t.$set(t.context,"model",r.concat([null])):i>-1&&t.$set(t.context,"model",r.slice(0,i).concat(r.slice(i+1)))}else t.$set(t.context,"model",o)}}},"input",t.attributes,!1)):"radio"===t.type?r("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{type:"radio"},domProps:{checked:t._q(t.context.model,null)},on:{blur:t.context.blurHandler,change:function(e){return t.$set(t.context,"model",null)}}},"input",t.attributes,!1)):r("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],attrs:{type:t.type},domProps:{value:t.context.model},on:{blur:t.context.blurHandler,input:function(e){e.target.composing||t.$set(t.context,"model",e.target.value)}}},"input",t.attributes,!1)),t._v(" "),t.context.showValue?r("div",{staticClass:"formulate-input-element-range-value",domProps:{textContent:t._s(t.context.model)}}):t._e()])};Q._withStripped=!0;var tt=g({render:Q,staticRenderFns:[]},void 0,K,void 0,!1,void 0,!1,void 0,void 0,void 0),et={name:"FormulateInputTextArea",mixins:[j]},rt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"formulate-input-element formulate-input-element--textarea",attrs:{"data-type":"textarea"}},[r("textarea",t._b({directives:[{name:"model",rawName:"v-model",value:t.context.model,expression:"context.model"}],domProps:{value:t.context.model},on:{blur:t.context.blurHandler,input:function(e){e.target.composing||t.$set(t.context,"model",e.target.value)}}},"textarea",t.attributes,!1))])};rt._withStripped=!0;var nt=g({render:rt,staticRenderFns:[]},void 0,et,void 0,!1,void 0,!1,void 0,void 0,void 0),ot=function(){this.options={},this.defaults={components:{FormulateForm:N,FormulateInput:_,FormulateInputErrors:O,FormulateInputBox:B,FormulateInputText:U,FormulateInputFile:G,FormulateInputGroup:C,FormulateInputButton:z,FormulateInputSelect:X,FormulateInputSlider:tt,FormulateInputTextArea:nt},library:n,rules:d,locale:"en",uploader:m,uploadJustCompleteDuration:1e3,plugins:[],locales:{en:p}}};ot.prototype.install=function(t,e){var r=this;for(var n in t.prototype.$formulate=this,this.options=this.merge(this.defaults,e||{}),Array.isArray(this.options.plugins)&&this.options.plugins.length&&this.options.plugins.forEach((function(t){return"function"==typeof t?t(r):null})),this.options.components)t.component(n,this.options.components[n])},ot.prototype.extend=function(t){if("object"==typeof t)return this.options=this.merge(this.options,t),this;throw new Error("VueFormulate extend() should be passed an object (was "+typeof t+")")},ot.prototype.merge=function(t,e,n){void 0===n&&(n=!0);var o={};for(var i in t)e.hasOwnProperty(i)?r(e[i])&&r(t[i])?o[i]=this.merge(t[i],e[i],n):n&&Array.isArray(t[i])&&Array.isArray(e[i])?o[i]=t[i].concat(e[i]):o[i]=e[i]:o[i]=t[i];for(var a in e)o.hasOwnProperty(a)||(o[a]=e[a]);return o},ot.prototype.classify=function(t){return this.options.library.hasOwnProperty(t)?this.options.library[t].classification:"unknown"},ot.prototype.component=function(t){return!!this.options.library.hasOwnProperty(t)&&this.options.library[t].component},ot.prototype.rules=function(t){return void 0===t&&(t={}),Object.assign({},this.options.rules,t)},ot.prototype.validationMessage=function(t,e){var r=this.options.locales[this.options.locale];return r.hasOwnProperty(t)?r[t](e):"_"===t[0]&&r.hasOwnProperty(t.substr(1))?r[t.substr(1)](e):r.hasOwnProperty("default")?r.default(e):"This field does not have a valid value"},ot.prototype.getUploader=function(){return this.options.uploader||!1},ot.prototype.createUpload=function(t,e){return new o(t,e,this.options)};var it=new ot;export default it;export{o as FileUpload};
