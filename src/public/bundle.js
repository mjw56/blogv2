'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$6 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_OP = '$NO_OP';
exports.ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
exports.isBrowser = !!(typeof window !== 'undefined' && window.document);
function toArray(children) {
    return exports.isArray(children) ? children : (children ? [children] : children);
}
exports.toArray = toArray;
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
exports.isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
exports.isStatefulComponent = isStatefulComponent;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
exports.isStringOrNumber = isStringOrNumber;
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
exports.isNullOrUndef = isNullOrUndef;
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
exports.isInvalid = isInvalid;
function isFunction(o) {
    return typeof o === 'function';
}
exports.isFunction = isFunction;
function isString(o) {
    return typeof o === 'string';
}
exports.isString = isString;
function isNumber(o) {
    return typeof o === 'number';
}
exports.isNumber = isNumber;
function isNull(o) {
    return o === null;
}
exports.isNull = isNull;
function isTrue(o) {
    return o === true;
}
exports.isTrue = isTrue;
function isUndefined(o) {
    return o === void 0;
}
exports.isUndefined = isUndefined;
function isObject(o) {
    return typeof o === 'object';
}
exports.isObject = isObject;
function throwError(message) {
    if (!message) {
        message = exports.ERROR_MSG;
    }
    throw new Error("Inferno Error: " + message);
}
exports.throwError = throwError;
function warning(message) {
    console.warn(message);
}
exports.warning = warning;
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key in second) {
            out[key] = second[key];
        }
    }
    return out;
}
exports.combineFrom = combineFrom;
function Lifecycle() {
    this.listeners = [];
}
exports.Lifecycle = Lifecycle;
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    var listener;
    // We need to remove current listener from array when calling it, because more listeners might be added
    while (listener = listeners.shift()) {
        listener();
    }
};
});

var index$4 = createCommonjsModule(function (module) {
module.exports = index$6;
module.exports.default = module.exports;
});

var options = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = {
    afterMount: null,
    afterRender: null,
    afterUpdate: null,
    beforeRender: null,
    beforeUnmount: null,
    createVNode: null,
    findDOMNodeEnabled: false,
    recyclingEnabled: false,
    roots: []
};
});

var constants = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xlinkNS = 'http://www.w3.org/1999/xlink';
exports.xmlNS = 'http://www.w3.org/XML/1998/namespace';
exports.svgNS = 'http://www.w3.org/2000/svg';
exports.strictProps = new Set();
exports.strictProps.add('volume');
exports.strictProps.add('defaultChecked');
exports.booleanProps = new Set();
exports.booleanProps.add('muted');
exports.booleanProps.add('scoped');
exports.booleanProps.add('loop');
exports.booleanProps.add('open');
exports.booleanProps.add('checked');
exports.booleanProps.add('default');
exports.booleanProps.add('capture');
exports.booleanProps.add('disabled');
exports.booleanProps.add('readOnly');
exports.booleanProps.add('required');
exports.booleanProps.add('autoplay');
exports.booleanProps.add('controls');
exports.booleanProps.add('seamless');
exports.booleanProps.add('reversed');
exports.booleanProps.add('allowfullscreen');
exports.booleanProps.add('novalidate');
exports.booleanProps.add('hidden');
exports.booleanProps.add('autoFocus');
exports.namespaces = new Map();
exports.namespaces.set('xlink:href', exports.xlinkNS);
exports.namespaces.set('xlink:arcrole', exports.xlinkNS);
exports.namespaces.set('xlink:actuate', exports.xlinkNS);
exports.namespaces.set('xlink:show', exports.xlinkNS);
exports.namespaces.set('xlink:role', exports.xlinkNS);
exports.namespaces.set('xlink:title', exports.xlinkNS);
exports.namespaces.set('xlink:type', exports.xlinkNS);
exports.namespaces.set('xml:base', exports.xmlNS);
exports.namespaces.set('xml:lang', exports.xmlNS);
exports.namespaces.set('xml:space', exports.xmlNS);
exports.isUnitlessNumber = new Set();
exports.isUnitlessNumber.add('animationIterationCount');
exports.isUnitlessNumber.add('borderImageOutset');
exports.isUnitlessNumber.add('borderImageSlice');
exports.isUnitlessNumber.add('borderImageWidth');
exports.isUnitlessNumber.add('boxFlex');
exports.isUnitlessNumber.add('boxFlexGroup');
exports.isUnitlessNumber.add('boxOrdinalGroup');
exports.isUnitlessNumber.add('columnCount');
exports.isUnitlessNumber.add('flex');
exports.isUnitlessNumber.add('flexGrow');
exports.isUnitlessNumber.add('flexPositive');
exports.isUnitlessNumber.add('flexShrink');
exports.isUnitlessNumber.add('flexNegative');
exports.isUnitlessNumber.add('flexOrder');
exports.isUnitlessNumber.add('gridRow');
exports.isUnitlessNumber.add('gridColumn');
exports.isUnitlessNumber.add('fontWeight');
exports.isUnitlessNumber.add('lineClamp');
exports.isUnitlessNumber.add('lineHeight');
exports.isUnitlessNumber.add('opacity');
exports.isUnitlessNumber.add('order');
exports.isUnitlessNumber.add('orphans');
exports.isUnitlessNumber.add('tabSize');
exports.isUnitlessNumber.add('widows');
exports.isUnitlessNumber.add('zIndex');
exports.isUnitlessNumber.add('zoom');
exports.isUnitlessNumber.add('fillOpacity');
exports.isUnitlessNumber.add('floodOpacity');
exports.isUnitlessNumber.add('stopOpacity');
exports.isUnitlessNumber.add('strokeDasharray');
exports.isUnitlessNumber.add('strokeDashoffset');
exports.isUnitlessNumber.add('strokeMiterlimit');
exports.isUnitlessNumber.add('strokeOpacity');
exports.isUnitlessNumber.add('strokeWidth');
exports.skipProps = new Set();
exports.skipProps.add('children');
exports.skipProps.add('childrenType');
exports.skipProps.add('defaultValue');
exports.skipProps.add('ref');
exports.skipProps.add('key');
exports.skipProps.add('selected');
exports.skipProps.add('checked');
exports.skipProps.add('multiple');
exports.delegatedEvents = new Set();
exports.delegatedEvents.add('onClick');
exports.delegatedEvents.add('onMouseDown');
exports.delegatedEvents.add('onMouseUp');
exports.delegatedEvents.add('onMouseMove');
exports.delegatedEvents.add('onSubmit');
exports.delegatedEvents.add('onDblClick');
exports.delegatedEvents.add('onKeyDown');
exports.delegatedEvents.add('onKeyUp');
exports.delegatedEvents.add('onKeyPress');
});

var delegation = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var isiOS = index$4.isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents = new Map();
function handleEvent(name, lastEvent, nextEvent, dom) {
    var delegatedRoots = delegatedEvents.get(name);
    if (nextEvent) {
        if (!delegatedRoots) {
            delegatedRoots = { items: new Map(), docEvent: null };
            delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
            delegatedEvents.set(name, delegatedRoots);
        }
        if (!lastEvent) {
            if (isiOS && name === 'onClick') {
                trapClickOnNonInteractiveElement(dom);
            }
        }
        delegatedRoots.items.set(dom, nextEvent);
    }
    else if (delegatedRoots) {
        var items = delegatedRoots.items;
        if (items.delete(dom)) {
            // If any items were deleted, check if listener need to be removed
            if (items.size === 0) {
                document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
                delegatedEvents.delete(name);
            }
        }
    }
}
exports.handleEvent = handleEvent;
function dispatchEvent(event, target, items, count, isClick, eventData) {
    var eventsToTrigger = items.get(target);
    if (eventsToTrigger) {
        count--;
        // linkEvent object
        eventData.dom = target;
        if (eventsToTrigger.event) {
            eventsToTrigger.event(eventsToTrigger.data, event);
        }
        else {
            eventsToTrigger(event);
        }
        if (event.cancelBubble) {
            return;
        }
    }
    if (count > 0) {
        var parentDom = target.parentNode;
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (parentDom === null || (isClick && parentDom.nodeType === 1 && parentDom.disabled)) {
            return;
        }
        dispatchEvent(event, parentDom, items, count, isClick, eventData);
    }
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function stopPropagation() {
    this.cancelBubble = true;
    this.stopImmediatePropagation();
}
function attachEventToDocument(name, delegatedRoots) {
    var docEvent = function (event) {
        var count = delegatedRoots.items.size;
        if (count > 0) {
            event.stopPropagation = stopPropagation;
            // Event data needs to be object to save reference to currentTarget getter
            var eventData_1 = {
                dom: document
            };
            try {
                Object.defineProperty(event, 'currentTarget', {
                    configurable: true,
                    get: function get() {
                        return eventData_1.dom;
                    }
                });
            }
            catch (e) { }
            dispatchEvent(event, event.target, delegatedRoots.items, count, event.type === 'click', eventData_1);
        }
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}
// tslint:disable-next-line:no-empty
function emptyFn() { }
function trapClickOnNonInteractiveElement(dom) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    // Just set it using the onclick property so that we don't have to manage any
    // bookkeeping for it. Not sure if we need to clear it when the listener is
    // removed.
    // TODO: Only do this for the relevant Safaris maybe?
    dom.onclick = emptyFn;
}
});

var InputWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
exports.isCheckedType = isCheckedType;
function onTextInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function wrappedOnChange(e) {
    var props = this.props || utils.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onCheckboxChange(e) {
    e.stopPropagation(); // This click should not propagate its for internal use
    var vNode = this;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onClick) {
        var event_2 = props.onClick;
        if (event_2.event) {
            event_2.event(event_2.data, e);
        }
        else {
            event_2(e);
        }
    }
    else if (props.onclick) {
        props.onclick(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom);
    if (mounting && isControlled) {
        if (isCheckedType(nextPropsOrEmpty.type)) {
            dom.onclick = onCheckboxChange.bind(vNode);
            dom.onclick.wrapped = true;
        }
        else {
            dom.oninput = onTextInputChange.bind(vNode);
            dom.oninput.wrapped = true;
        }
        if (nextPropsOrEmpty.onChange) {
            dom.onchange = wrappedOnChange.bind(vNode);
            dom.onchange.wrapped = true;
        }
    }
}
exports.processInput = processInput;
function applyValue(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !index$4.isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (multiple && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!index$4.isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!index$4.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.value = value;
        }
        else if (!index$4.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}
exports.applyValue = applyValue;
});

var SelectWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === 'optgroup') {
        var children = vNode.children;
        if (index$4.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        }
        else if (VNodes.isVNode(children)) {
            updateChildOption(children, value);
        }
    }
    else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if ((index$4.isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
        dom.selected = true;
    }
    else if (!index$4.isNullOrUndef(value) || !index$4.isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
function onSelectChange(e) {
    var vNode = this;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onChange) {
        var event_1 = props.onChange;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.onchange) {
        props.onchange(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom, newProps, false);
    }
}
function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(vNode, dom, nextPropsOrEmpty, mounting);
    if (mounting && isControlled) {
        dom.onchange = onSelectChange.bind(vNode);
        dom.onchange.wrapped = true;
    }
}
exports.processSelect = processSelect;
function applyValue(vNode, dom, nextPropsOrEmpty, mounting) {
    if (nextPropsOrEmpty.multiple !== dom.multiple) {
        dom.multiple = nextPropsOrEmpty.multiple;
    }
    var children = vNode.children;
    if (!index$4.isInvalid(children)) {
        var value = nextPropsOrEmpty.value;
        if (mounting && index$4.isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        if (index$4.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        }
        else if (VNodes.isVNode(children)) {
            updateChildOptionGroup(children, value);
        }
    }
}
exports.applyValue = applyValue;
});

var TextareaWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


function wrappedOnChange(e) {
    var props = this.props || utils.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onTextareaInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils.EMPTY_OBJ;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, vNode.dom, false);
    }
}
function processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom, mounting);
    if (mounting && isControlled) {
        dom.oninput = onTextareaInputChange.bind(vNode);
        dom.oninput.wrapped = true;
        if (nextPropsOrEmpty.onChange) {
            dom.onchange = wrappedOnChange.bind(vNode);
            dom.onchange.wrapped = true;
        }
    }
}
exports.processTextarea = processTextarea;
function applyValue(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (index$4.isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!index$4.isNullOrUndef(defaultValue)) {
                if (defaultValue !== domValue) {
                    dom.value = defaultValue;
                }
            }
            else if (domValue !== '') {
                dom.value = '';
            }
        }
    }
    else {
        /* There is value so keep it controlled */
        if (domValue !== value) {
            dom.value = value;
        }
    }
}
exports.applyValue = applyValue;
});

var processElement_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });




/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 512 /* InputElement */) {
        InputWrapper.processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 2048 /* SelectElement */) {
        SelectWrapper.processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 1024 /* TextareaElement */) {
        TextareaWrapper.processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
}
exports.processElement = processElement;
function isControlledFormElement(nextPropsOrEmpty) {
    return (nextPropsOrEmpty.type && InputWrapper.isCheckedType(nextPropsOrEmpty.type)) ? !index$4.isNullOrUndef(nextPropsOrEmpty.checked) : !index$4.isNullOrUndef(nextPropsOrEmpty.value);
}
exports.isControlledFormElement = isControlledFormElement;
});

var hydration = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








function normalizeChildNodes(parentDom) {
    var dom = parentDom.firstChild;
    while (dom) {
        if (dom.nodeType === 8) {
            if (dom.data === '!') {
                var placeholder = document.createTextNode('');
                parentDom.replaceChild(placeholder, dom);
                dom = dom.nextSibling;
            }
            else {
                var lastDom = dom.previousSibling;
                parentDom.removeChild(dom);
                dom = lastDom || parentDom.firstChild;
            }
        }
        else {
            dom = dom.nextSibling;
        }
    }
}
exports.normalizeChildNodes = normalizeChildNodes;
function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    vNode.dom = dom;
    var props = vNode.props || utils.EMPTY_OBJ;
    if (isClass) {
        var _isSVG = dom.namespaceURI === constants.svgNS;
        var instance = utils.createClassComponentInstance(vNode, type, props, context, _isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vComponent = vNode;
        instance._vNode = vNode;
        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
        mounting.mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false; // Mount finished allow going sync
        if (options.options.findDOMNodeEnabled) {
            rendering.componentToDOMNodeMap.set(instance, dom);
        }
    }
    else {
        var input = utils.createFunctionalComponentInput(vNode, type, props, context);
        hydrate(input, dom, lifecycle, context, isSVG);
        vNode.children = input;
        vNode.dom = input.dom;
        mounting.mountFunctionalComponentCallbacks(ref, dom, lifecycle);
    }
    return dom;
}
function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        var newDom = mounting.mountElement(vNode, null, lifecycle, context, isSVG);
        vNode.dom = newDom;
        utils.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    vNode.dom = dom;
    if (children) {
        hydrateChildren(children, dom, lifecycle, context, isSVG);
    }
    if (props) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = processElement_1.isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement_1.processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (index$4.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (ref) {
        mounting.mountRef(dom, ref, lifecycle);
    }
    return dom;
}
function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
    normalizeChildNodes(parentDom);
    var dom = parentDom.firstChild;
    if (index$4.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!index$4.isNull(child) && index$4.isObject(child)) {
                if (!index$4.isNull(dom)) {
                    dom = hydrate(child, dom, lifecycle, context, isSVG).nextSibling;
                }
                else {
                    mounting.mount(child, parentDom, lifecycle, context, isSVG);
                }
            }
        }
    }
    else if (index$4.isStringOrNumber(children)) {
        if (dom && dom.nodeType === 3) {
            if (dom.nodeValue !== children) {
                dom.nodeValue = children;
            }
        }
        else if (children) {
            parentDom.textContent = children;
        }
        dom = dom.nextSibling;
    }
    else if (index$4.isObject(children)) {
        hydrate(children, dom, lifecycle, context, isSVG);
        dom = dom.nextSibling;
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    while (dom) {
        var nextSibling = dom.nextSibling;
        parentDom.removeChild(dom);
        dom = nextSibling;
    }
}
function hydrateText(vNode, dom) {
    if (dom.nodeType !== 3) {
        var newDom = mounting.mountText(vNode, null);
        vNode.dom = newDom;
        utils.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    var text = vNode.children;
    if (dom.nodeValue !== text) {
        dom.nodeValue = text;
    }
    vNode.dom = dom;
    return dom;
}
function hydrateVoid(vNode, dom) {
    vNode.dom = dom;
    return dom;
}
function hydrate(vNode, dom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        return hydrateComponent(vNode, dom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 3970 /* Element */) {
        return hydrateElement(vNode, dom, lifecycle, context, isSVG);
    }
    else if (flags & 1 /* Text */) {
        return hydrateText(vNode, dom);
    }
    else if (flags & 4096 /* Void */) {
        return hydrateVoid(vNode, dom);
    }
    else {
        index$4.throwError();
    }
}
function hydrateRoot(input, parentDom, lifecycle) {
    if (!index$4.isNull(parentDom)) {
        var dom = parentDom.firstChild;
        if (!index$4.isNull(dom)) {
            hydrate(input, dom, lifecycle, utils.EMPTY_OBJ, false);
            dom = parentDom.firstChild;
            // clear any other DOM nodes, there should be only a single entry for the root
            while (dom = dom.nextSibling) {
                parentDom.removeChild(dom);
            }
            return true;
        }
    }
    return false;
}
exports.hydrateRoot = hydrateRoot;
});

var recycling = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


var componentPools = new Map();
var elementPools = new Map();
function recycleElement(vNode, lifecycle, context, isSVG) {
    var tag = vNode.type;
    var pools = elementPools.get(tag);
    if (!index$4.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!index$4.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!index$4.isUndefined(recycledVNode)) {
                patching.patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                return vNode.dom;
            }
        }
    }
    return null;
}
exports.recycleElement = recycleElement;
function poolElement(vNode) {
    var tag = vNode.type;
    var key = vNode.key;
    var pools = elementPools.get(tag);
    if (index$4.isUndefined(pools)) {
        pools = {
            keyed: new Map(),
            nonKeyed: []
        };
        elementPools.set(tag, pools);
    }
    if (index$4.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (index$4.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolElement = poolElement;
function recycleComponent(vNode, lifecycle, context, isSVG) {
    var type = vNode.type;
    var pools = componentPools.get(type);
    if (!index$4.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!index$4.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!index$4.isUndefined(recycledVNode)) {
                var flags = vNode.flags;
                var failed = patching.patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
                if (!failed) {
                    return vNode.dom;
                }
            }
        }
    }
    return null;
}
exports.recycleComponent = recycleComponent;
function poolComponent(vNode) {
    var hooks = vNode.ref;
    var nonRecycleHooks = hooks && (hooks.onComponentWillMount ||
        hooks.onComponentWillUnmount ||
        hooks.onComponentDidMount ||
        hooks.onComponentWillUpdate ||
        hooks.onComponentDidUpdate);
    if (nonRecycleHooks) {
        return;
    }
    var type = vNode.type;
    var key = vNode.key;
    var pools = componentPools.get(type);
    if (index$4.isUndefined(pools)) {
        pools = {
            keyed: new Map(),
            nonKeyed: []
        };
        componentPools.set(type, pools);
    }
    if (index$4.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (index$4.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolComponent = poolComponent;
});

var unmounting = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });






function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & 3970 /* Element */) {
        unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & (1 /* Text */ | 4096 /* Void */)) {
        unmountVoidOrText(vNode, parentDom);
    }
}
exports.unmount = unmount;
function unmountVoidOrText(vNode, parentDom) {
    if (!index$4.isNull(parentDom)) {
        utils.removeChild(parentDom, vNode.dom);
    }
}
function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var instance = vNode.children;
    var flags = vNode.flags;
    var isStatefulComponent = flags & 4;
    var ref = vNode.ref;
    var dom = vNode.dom;
    if (!isRecycling) {
        if (isStatefulComponent) {
            if (!instance._unmounted) {
                instance._blockSetState = true;
                if (!index$4.isNull(options.options.beforeUnmount)) {
                    options.options.beforeUnmount(vNode);
                }
                if (!index$4.isUndefined(instance.componentWillUnmount)) {
                    instance.componentWillUnmount();
                }
                if (ref && !isRecycling) {
                    ref(null);
                }
                instance._unmounted = true;
                if (options.options.findDOMNodeEnabled) {
                    rendering.componentToDOMNodeMap.delete(instance);
                }
                unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
            }
        }
        else {
            if (!index$4.isNullOrUndef(ref)) {
                if (!index$4.isNullOrUndef(ref.onComponentWillUnmount)) {
                    ref.onComponentWillUnmount(dom);
                }
            }
            unmount(instance, null, lifecycle, false, isRecycling);
        }
    }
    if (parentDom) {
        var lastInput = instance._lastInput;
        if (index$4.isNullOrUndef(lastInput)) {
            lastInput = instance;
        }
        utils.removeChild(parentDom, dom);
    }
    if (options.options.recyclingEnabled && !isStatefulComponent && (parentDom || canRecycle)) {
        recycling.poolComponent(vNode);
    }
}
exports.unmountComponent = unmountComponent;
function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var dom = vNode.dom;
    var ref = vNode.ref;
    var props = vNode.props;
    if (ref && !isRecycling) {
        unmountRef(ref);
    }
    var children = vNode.children;
    if (!index$4.isNullOrUndef(children)) {
        unmountChildren(children, lifecycle, isRecycling);
    }
    if (!index$4.isNull(props)) {
        for (var name_1 in props) {
            // do not add a hasOwnProperty check here, it affects performance
            if (props[name_1] !== null && patching.isAttrAnEvent(name_1)) {
                patching.patchEvent(name_1, props[name_1], null, dom);
                // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                props[name_1] = null;
            }
        }
    }
    if (!index$4.isNull(parentDom)) {
        utils.removeChild(parentDom, dom);
    }
    if (options.options.recyclingEnabled && (parentDom || canRecycle)) {
        recycling.poolElement(vNode);
    }
}
exports.unmountElement = unmountElement;
function unmountChildren(children, lifecycle, isRecycling) {
    if (index$4.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!index$4.isInvalid(child) && index$4.isObject(child)) {
                unmount(child, null, lifecycle, false, isRecycling);
            }
        }
    }
    else if (index$4.isObject(children)) {
        unmount(children, null, lifecycle, false, isRecycling);
    }
}
function unmountRef(ref) {
    if (index$4.isFunction(ref)) {
        ref(null);
    }
    else {
        if (index$4.isInvalid(ref)) {
            return;
        }
        index$4.throwError();
    }
}
});

var rendering = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
exports.componentToDOMNodeMap = new Map();
var roots = options.options.roots;
/**
 * When inferno.options.findDOMNOdeEnabled is true, this function will return DOM Node by component instance
 * @param ref Component instance
 * @returns {*|null} returns dom node
 */
function findDOMNode(ref) {
    if (!options.options.findDOMNodeEnabled) {
        index$4.throwError();
    }
    var dom = ref && ref.nodeType ? ref : null;
    return exports.componentToDOMNodeMap.get(ref) || dom;
}
exports.findDOMNode = findDOMNode;
function getRoot(dom) {
    for (var i = 0, len = roots.length; i < len; i++) {
        var root = roots[i];
        if (root.dom === dom) {
            return root;
        }
    }
    return null;
}
function setRoot(dom, input, lifecycle) {
    var root = {
        dom: dom,
        input: input,
        lifecycle: lifecycle
    };
    roots.push(root);
    return root;
}
function removeRoot(root) {
    for (var i = 0, len = roots.length; i < len; i++) {
        if (roots[i] === root) {
            roots.splice(i, 1);
            return;
        }
    }
}
var documentBody = index$4.isBrowser ? document.body : null;
/**
 * Renders virtual node tree into parent node.
 * @param {VNode | null | string | number} input vNode to be rendered
 * @param parentDom DOM node which content will be replaced by virtual node
 * @returns {InfernoChildren} rendered virtual node
 */
function render(input, parentDom) {
    if (documentBody === parentDom) {
        index$4.throwError();
    }
    if (input === index$4.NO_OP) {
        return;
    }
    var root = getRoot(parentDom);
    if (index$4.isNull(root)) {
        var lifecycle = new index$4.Lifecycle();
        if (!index$4.isInvalid(input)) {
            if (input.dom) {
                input = VNodes.directClone(input);
            }
            if (!hydration.hydrateRoot(input, parentDom, lifecycle)) {
                mounting.mount(input, parentDom, lifecycle, utils.EMPTY_OBJ, false);
            }
            root = setRoot(parentDom, input, lifecycle);
            lifecycle.trigger();
        }
    }
    else {
        var lifecycle = root.lifecycle;
        lifecycle.listeners = [];
        if (index$4.isNullOrUndef(input)) {
            unmounting.unmount(root.input, parentDom, lifecycle, false, false);
            removeRoot(root);
        }
        else {
            if (input.dom) {
                input = VNodes.directClone(input);
            }
            patching.patch(root.input, input, parentDom, lifecycle, utils.EMPTY_OBJ, false, false);
        }
        root.input = input;
        lifecycle.trigger();
    }
    if (root) {
        var rootInput = root.input;
        if (rootInput && (rootInput.flags & 28 /* Component */)) {
            return rootInput.children;
        }
    }
}
exports.render = render;
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}
exports.createRenderer = createRenderer;
});

var patching = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });










function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    if (lastVNode !== nextVNode) {
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        if (nextFlags & 28 /* Component */) {
            if (lastFlags & 28 /* Component */) {
                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 3970 /* Element */) {
            if (lastFlags & 3970 /* Element */) {
                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 1 /* Text */) {
            if (lastFlags & 1 /* Text */) {
                patchText(lastVNode, nextVNode);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 4096 /* Void */) {
            if (lastFlags & 4096 /* Void */) {
                patchVoid(lastVNode, nextVNode);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else {
            // Error case: mount new one replacing old one
            utils.replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
exports.patch = patch;
function unmountChildren(children, dom, lifecycle, isRecycling) {
    if (VNodes.isVNode(children)) {
        unmounting.unmount(children, dom, lifecycle, true, isRecycling);
    }
    else if (index$4.isArray(children)) {
        utils.removeAllChildren(dom, children, lifecycle, isRecycling);
    }
    else {
        dom.textContent = '';
    }
}
function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    var nextTag = nextVNode.type;
    var lastTag = lastVNode.type;
    if (lastTag !== nextTag) {
        utils.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
    }
    else {
        var dom = lastVNode.dom;
        var lastProps = lastVNode.props;
        var nextProps = nextVNode.props;
        var lastChildren = lastVNode.children;
        var nextChildren = nextVNode.children;
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        var nextRef = nextVNode.ref;
        var lastClassName = lastVNode.className;
        var nextClassName = nextVNode.className;
        nextVNode.dom = dom;
        if (isSVG || (nextFlags & 128 /* SvgElement */) > 0) {
            isSVG = true;
        }
        if (lastChildren !== nextChildren) {
            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || utils.EMPTY_OBJ;
            var nextPropsOrEmpty = nextProps || utils.EMPTY_OBJ;
            var hasControlledValue = false;
            if (nextPropsOrEmpty !== utils.EMPTY_OBJ) {
                var isFormElement = (nextFlags & 3584 /* FormElement */) > 0;
                if (isFormElement) {
                    hasControlledValue = processElement_1.isControlledFormElement(nextPropsOrEmpty);
                }
                for (var prop in nextPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    var nextValue = nextPropsOrEmpty[prop];
                    var lastValue = lastPropsOrEmpty[prop];
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                }
                if (isFormElement) {
                    processElement_1.processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
                }
            }
            if (lastPropsOrEmpty !== utils.EMPTY_OBJ) {
                for (var prop in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (index$4.isNullOrUndef(nextPropsOrEmpty[prop])) {
                        removeProp(prop, lastPropsOrEmpty[prop], dom);
                    }
                }
            }
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (index$4.isNullOrUndef(nextClassName)) {
                dom.removeAttribute('class');
            }
            else {
                if (isSVG) {
                    dom.setAttribute('class', nextClassName);
                }
                else {
                    dom.className = nextClassName;
                }
            }
        }
        if (nextRef) {
            if (lastVNode.ref !== nextRef || isRecycling) {
                mounting.mountRef(dom, nextRef, lifecycle);
            }
        }
    }
}
exports.patchElement = patchElement;
function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var patchArray = false;
    var patchKeyed = false;
    if (nextFlags & 64 /* HasNonKeyedChildren */) {
        patchArray = true;
    }
    else if ((lastFlags & 32 /* HasKeyedChildren */) && (nextFlags & 32 /* HasKeyedChildren */)) {
        patchKeyed = true;
        patchArray = true;
    }
    else if (index$4.isInvalid(nextChildren)) {
        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
    }
    else if (index$4.isInvalid(lastChildren)) {
        if (index$4.isStringOrNumber(nextChildren)) {
            utils.setTextContent(dom, nextChildren);
        }
        else {
            if (index$4.isArray(nextChildren)) {
                mounting.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
            else {
                mounting.mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
    }
    else if (index$4.isStringOrNumber(nextChildren)) {
        if (index$4.isStringOrNumber(lastChildren)) {
            utils.updateTextContent(dom, nextChildren);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            utils.setTextContent(dom, nextChildren);
        }
    }
    else if (index$4.isArray(nextChildren)) {
        if (index$4.isArray(lastChildren)) {
            patchArray = true;
            if (utils.isKeyed(lastChildren, nextChildren)) {
                patchKeyed = true;
            }
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    else if (index$4.isArray(lastChildren)) {
        utils.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        mounting.mount(nextChildren, dom, lifecycle, context, isSVG);
    }
    else if (VNodes.isVNode(nextChildren)) {
        if (VNodes.isVNode(lastChildren)) {
            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting.mount(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    if (patchArray) {
        if (patchKeyed) {
            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
    var lastType = lastVNode.type;
    var nextType = nextVNode.type;
    var lastKey = lastVNode.key;
    var nextKey = nextVNode.key;
    if (lastType !== nextType || lastKey !== nextKey) {
        utils.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        return false;
    }
    else {
        var nextProps = nextVNode.props || utils.EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            instance._updating = true;
            if (instance._unmounted) {
                if (index$4.isNull(parentDom)) {
                    return true;
                }
                utils.replaceChild(parentDom, mounting.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
            }
            else {
                var hasComponentDidUpdate = !index$4.isUndefined(instance.componentDidUpdate);
                var nextState = instance.state;
                // When component has componentDidUpdate hook, we need to clone lastState or will be modified by reference during update
                var lastState = hasComponentDidUpdate ? index$4.combineFrom(nextState, null) : nextState;
                var lastProps = instance.props;
                var childContext = void 0;
                if (!index$4.isUndefined(instance.getChildContext)) {
                    childContext = instance.getChildContext();
                }
                nextVNode.children = instance;
                instance._isSVG = isSVG;
                if (index$4.isNullOrUndef(childContext)) {
                    childContext = context;
                }
                else {
                    childContext = index$4.combineFrom(context, childContext);
                }
                var lastInput = instance._lastInput;
                var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                var didUpdate = true;
                instance._childContext = childContext;
                if (index$4.isInvalid(nextInput)) {
                    nextInput = VNodes.createVoidVNode();
                }
                else if (nextInput === index$4.NO_OP) {
                    nextInput = lastInput;
                    didUpdate = false;
                }
                else if (index$4.isStringOrNumber(nextInput)) {
                    nextInput = VNodes.createTextVNode(nextInput, null);
                }
                else if (index$4.isArray(nextInput)) {
                    index$4.throwError();
                }
                else if (index$4.isObject(nextInput)) {
                    if (!index$4.isNull(nextInput.dom)) {
                        nextInput = VNodes.directClone(nextInput);
                    }
                }
                if (nextInput.flags & 28 /* Component */) {
                    nextInput.parentVNode = nextVNode;
                }
                else if (lastInput.flags & 28 /* Component */) {
                    lastInput.parentVNode = nextVNode;
                }
                instance._lastInput = nextInput;
                instance._vNode = nextVNode;
                if (didUpdate) {
                    patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG, isRecycling);
                    if (hasComponentDidUpdate) {
                        instance.componentDidUpdate(lastProps, lastState);
                    }
                    if (!index$4.isNull(options.options.afterUpdate)) {
                        options.options.afterUpdate(nextVNode);
                    }
                    if (options.options.findDOMNodeEnabled) {
                        rendering.componentToDOMNodeMap.set(instance, nextInput.dom);
                    }
                }
                nextVNode.dom = nextInput.dom;
            }
            instance._updating = false;
        }
        else {
            var shouldUpdate = true;
            var lastProps = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !index$4.isNullOrUndef(nextHooks);
            var lastInput = lastVNode.children;
            var nextInput = lastInput;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput;
            if (lastKey !== nextKey) {
                shouldUpdate = true;
            }
            else {
                if (nextHooksDefined && !index$4.isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                }
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined && !index$4.isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps, nextProps);
                }
                nextInput = nextType(nextProps, context);
                if (index$4.isInvalid(nextInput)) {
                    nextInput = VNodes.createVoidVNode();
                }
                else if (index$4.isStringOrNumber(nextInput) && nextInput !== index$4.NO_OP) {
                    nextInput = VNodes.createTextVNode(nextInput, null);
                }
                else if (index$4.isArray(nextInput)) {
                    index$4.throwError();
                }
                else if (index$4.isObject(nextInput)) {
                    if (!index$4.isNull(nextInput.dom)) {
                        nextInput = VNodes.directClone(nextInput);
                    }
                }
                if (nextInput !== index$4.NO_OP) {
                    patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
                    nextVNode.children = nextInput;
                    if (nextHooksDefined && !index$4.isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps, nextProps);
                    }
                    nextVNode.dom = nextInput.dom;
                }
            }
            if (nextInput.flags & 28 /* Component */) {
                nextInput.parentVNode = nextVNode;
            }
            else if (lastInput.flags & 28 /* Component */) {
                lastInput.parentVNode = nextVNode;
            }
        }
    }
    return false;
}
exports.patchComponent = patchComponent;
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    nextVNode.dom = dom;
    if (lastVNode.children !== nextText) {
        dom.nodeValue = nextText;
    }
}
exports.patchText = patchText;
function patchVoid(lastVNode, nextVNode) {
    nextVNode.dom = lastVNode.dom;
}
exports.patchVoid = patchVoid;
function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var lastChildrenLength = lastChildren.length;
    var nextChildrenLength = nextChildren.length;
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    for (; i < commonLength; i++) {
        var nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = VNodes.directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = VNodes.directClone(nextChild);
            }
            utils.appendChild(dom, mounting.mount(nextChild, null, lifecycle, context, isSVG));
        }
    }
    else if (nextChildrenLength === 0) {
        utils.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            unmounting.unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
        }
    }
}
exports.patchNonKeyedChildren = patchNonKeyedChildren;
function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
    var aLength = a.length;
    var bLength = b.length;
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode;
    var bNode;
    var nextNode;
    var nextPos;
    var node;
    if (aLength === 0) {
        if (bLength !== 0) {
            mounting.mountArrayChildren(b, dom, lifecycle, context, isSVG);
        }
        return;
    }
    else if (bLength === 0) {
        utils.removeAllChildren(dom, a, lifecycle, isRecycling);
        return;
    }
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    if (bStartNode.dom) {
        b[bStart] = bStartNode = VNodes.directClone(bStartNode);
    }
    if (bEndNode.dom) {
        b[bEnd] = bEndNode = VNodes.directClone(bEndNode);
    }
    // Step 1
    /* eslint no-constant-condition: 0 */
    outer: while (true) {
        // Sync nodes with the same key at the beginning.
        while (aStartNode.key === bStartNode.key) {
            patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes.directClone(bStartNode);
            }
        }
        // Sync nodes with the same key at the end.
        while (aEndNode.key === bEndNode.key) {
            patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes.directClone(bEndNode);
            }
        }
        // Move and sync nodes from right to left.
        if (aEndNode.key === bStartNode.key) {
            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            utils.insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
            aEnd--;
            bStart++;
            aEndNode = a[aEnd];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes.directClone(bStartNode);
            }
            continue;
        }
        // Move and sync nodes from left to right.
        if (aStartNode.key === bEndNode.key) {
            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            utils.insertOrAppend(dom, bEndNode.dom, nextNode);
            aStart++;
            bEnd--;
            aStartNode = a[aStart];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes.directClone(bEndNode);
            }
            continue;
        }
        break;
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes.directClone(node);
                }
                bStart++;
                utils.insertOrAppend(dom, mounting.mount(node, null, lifecycle, context, isSVG), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmounting.unmount(a[aStart++], dom, lifecycle, false, isRecycling);
        }
    }
    else {
        aLength = aEnd - aStart + 1;
        bLength = bEnd - bStart + 1;
        var sources = new Array(bLength);
        // Mark all nodes as inserted.
        for (i = 0; i < bLength; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if ((bLength <= 4) || (aLength * bLength <= 16)) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = VNodes.directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                            patched++;
                            a[i] = null;
                            break;
                        }
                    }
                }
            }
        }
        else {
            var keyIndex = new Map();
            // Map keys by their index in array
            for (i = bStart; i <= bEnd; i++) {
                keyIndex.set(b[i].key, i);
            }
            // Try to patch same keys
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    j = keyIndex.get(aNode.key);
                    if (!index$4.isUndefined(j)) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = VNodes.directClone(bNode);
                        }
                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (aLength === a.length && patched === 0) {
            utils.removeAllChildren(dom, a, lifecycle, isRecycling);
            while (bStart < bLength) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes.directClone(node);
                }
                bStart++;
                utils.insertOrAppend(dom, mounting.mount(node, null, lifecycle, context, isSVG), null);
            }
        }
        else {
            i = aLength - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (!index$4.isNull(aNode)) {
                    unmounting.unmount(aNode, dom, lifecycle, true, isRecycling);
                    i--;
                }
            }
            if (moved) {
                var seq = lis_algorithm(sources);
                j = seq.length - 1;
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils.insertOrAppend(dom, mounting.mount(node, dom, lifecycle, context, isSVG), nextNode);
                    }
                    else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            utils.insertOrAppend(dom, node.dom, nextNode);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
            else if (patched !== bLength) {
                // when patched count doesn't match b length we need to insert those new ones
                // loop backwards so we can use insertBefore
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils.insertOrAppend(dom, mounting.mount(node, null, lifecycle, context, isSVG), nextNode);
                    }
                }
            }
        }
    }
}
exports.patchKeyedChildren = patchKeyedChildren;
// // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var p = arr.slice(0);
    var result = [0];
    var i;
    var j;
    var u;
    var v;
    var c;
    var len = arr.length;
    for (i = 0; i < len; i++) {
        var arrI = arr[i];
        if (arrI === -1) {
            continue;
        }
        j = result[result.length - 1];
        if (arr[j] < arrI) {
            p[i] = j;
            result.push(i);
            continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
            c = ((u + v) / 2) | 0;
            if (arr[result[c]] < arrI) {
                u = c + 1;
            }
            else {
                v = c;
            }
        }
        if (arrI < arr[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1];
            }
            result[u] = i;
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isAttrAnEvent(attr) {
    return attr[0] === 'o' && attr[1] === 'n';
}
exports.isAttrAnEvent = isAttrAnEvent;
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
    if (lastValue !== nextValue) {
        if (constants.skipProps.has(prop) || (hasControlledValue && prop === 'value')) {
            return;
        }
        else if (constants.booleanProps.has(prop)) {
            prop = prop === 'autoFocus' ? prop.toLowerCase() : prop;
            dom[prop] = !!nextValue;
        }
        else if (constants.strictProps.has(prop)) {
            var value = index$4.isNullOrUndef(nextValue) ? '' : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
        }
        else if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, dom);
        }
        else if (index$4.isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        }
        else if (prop === 'style') {
            patchStyle(lastValue, nextValue, dom);
        }
        else if (prop === 'dangerouslySetInnerHTML') {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!index$4.isNullOrUndef(nextHtml)) {
                    dom.innerHTML = nextHtml;
                }
            }
        }
        else {
            // We optimize for NS being boolean. Its 99.9% time false
            if (isSVG && constants.namespaces.has(prop)) {
                // If we end up in this path we can read property again
                dom.setAttributeNS(constants.namespaces.get(prop), prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
}
exports.patchProp = patchProp;
function patchEvent(name, lastValue, nextValue, dom) {
    if (lastValue !== nextValue) {
        if (constants.delegatedEvents.has(name)) {
            delegation.handleEvent(name, lastValue, nextValue, dom);
        }
        else {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (!index$4.isFunction(nextValue) && !index$4.isNullOrUndef(nextValue)) {
                var linkEvent_1 = nextValue.event;
                if (linkEvent_1 && index$4.isFunction(linkEvent_1)) {
                    dom[nameLowerCase] = function (e) {
                        linkEvent_1(nextValue.data, e);
                    };
                }
                else {
                    index$4.throwError();
                }
            }
            else {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
}
exports.patchEvent = patchEvent;
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    if (index$4.isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    for (var style in nextAttrValue) {
        // do not add a hasOwnProperty check here, it affects performance
        var value = nextAttrValue[style];
        if (!index$4.isNumber(value) || constants.isUnitlessNumber.has(style)) {
            domStyle[style] = value;
        }
        else {
            domStyle[style] = value + 'px';
        }
    }
    if (!index$4.isNullOrUndef(lastAttrValue)) {
        for (var style in lastAttrValue) {
            if (index$4.isNullOrUndef(nextAttrValue[style])) {
                domStyle[style] = '';
            }
        }
    }
}
exports.patchStyle = patchStyle;
function removeProp(prop, lastValue, dom) {
    if (prop === 'value') {
        dom.value = '';
    }
    else if (prop === 'style') {
        dom.removeAttribute('style');
    }
    else if (isAttrAnEvent(prop)) {
        delegation.handleEvent(prop, lastValue, null, dom);
    }
    else {
        dom.removeAttribute(prop);
    }
}
});

var mounting = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








function mount(vNode, parentDom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 3970 /* Element */) {
        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
    }
    else if (flags & 28 /* Component */) {
        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 4096 /* Void */) {
        return mountVoid(vNode, parentDom);
    }
    else if (flags & 1 /* Text */) {
        return mountText(vNode, parentDom);
    }
    else {
        index$4.throwError();
    }
}
exports.mount = mount;
function mountText(vNode, parentDom) {
    var dom = document.createTextNode(vNode.children);
    vNode.dom = dom;
    if (!index$4.isNull(parentDom)) {
        utils.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountText = mountText;
function mountVoid(vNode, parentDom) {
    var dom = document.createTextNode('');
    vNode.dom = dom;
    if (!index$4.isNull(parentDom)) {
        utils.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountVoid = mountVoid;
function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
    if (options.options.recyclingEnabled) {
        var dom_1 = recycling.recycleElement(vNode, lifecycle, context, isSVG);
        if (!index$4.isNull(dom_1)) {
            if (!index$4.isNull(parentDom)) {
                utils.appendChild(parentDom, dom_1);
            }
            return dom_1;
        }
    }
    var flags = vNode.flags;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    var dom = utils.documentCreateElement(vNode.type, isSVG);
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    vNode.dom = dom;
    if (!index$4.isInvalid(children)) {
        if (index$4.isStringOrNumber(children)) {
            utils.setTextContent(dom, children);
        }
        else if (index$4.isArray(children)) {
            mountArrayChildren(children, dom, lifecycle, context, isSVG);
        }
        else if (VNodes.isVNode(children)) {
            mount(children, dom, lifecycle, context, isSVG);
        }
    }
    if (!index$4.isNull(props)) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = processElement_1.isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement_1.processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (className !== null) {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (!index$4.isNull(ref)) {
        mountRef(dom, ref, lifecycle);
    }
    if (!index$4.isNull(parentDom)) {
        utils.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountElement = mountElement;
function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
        if (!index$4.isInvalid(child)) {
            if (child.dom) {
                children[i] = child = VNodes.directClone(child);
            }
            mount(children[i], dom, lifecycle, context, isSVG);
        }
    }
}
exports.mountArrayChildren = mountArrayChildren;
function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
    if (options.options.recyclingEnabled) {
        var dom_2 = recycling.recycleComponent(vNode, lifecycle, context, isSVG);
        if (!index$4.isNull(dom_2)) {
            if (!index$4.isNull(parentDom)) {
                utils.appendChild(parentDom, dom_2);
            }
            return dom_2;
        }
    }
    var type = vNode.type;
    var props = vNode.props || utils.EMPTY_OBJ;
    var ref = vNode.ref;
    var dom;
    if (isClass) {
        var instance = utils.createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
        if (!index$4.isNull(parentDom)) {
            utils.appendChild(parentDom, dom);
        }
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false;
        if (options.options.findDOMNodeEnabled) {
            rendering.componentToDOMNodeMap.set(instance, dom);
        }
    }
    else {
        var input = utils.createFunctionalComponentInput(vNode, type, props, context);
        vNode.dom = dom = mount(input, null, lifecycle, context, isSVG);
        vNode.children = input;
        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        if (!index$4.isNull(parentDom)) {
            utils.appendChild(parentDom, dom);
        }
    }
    return dom;
}
exports.mountComponent = mountComponent;
function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
    if (ref) {
        if (index$4.isFunction(ref)) {
            ref(instance);
        }
        else {
            index$4.throwError();
        }
    }
    var hasDidMount = !index$4.isUndefined(instance.componentDidMount);
    var afterMount = options.options.afterMount;
    if (hasDidMount || !index$4.isNull(afterMount)) {
        lifecycle.addListener(function () {
            instance._updating = true;
            if (afterMount) {
                afterMount(vNode);
            }
            if (hasDidMount) {
                instance.componentDidMount();
            }
            instance._updating = false;
        });
    }
}
exports.mountClassComponentCallbacks = mountClassComponentCallbacks;
function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
    if (ref) {
        if (!index$4.isNullOrUndef(ref.onComponentWillMount)) {
            ref.onComponentWillMount();
        }
        if (!index$4.isNullOrUndef(ref.onComponentDidMount)) {
            lifecycle.addListener(function () { return ref.onComponentDidMount(dom); });
        }
    }
}
exports.mountFunctionalComponentCallbacks = mountFunctionalComponentCallbacks;
function mountRef(dom, value, lifecycle) {
    if (index$4.isFunction(value)) {
        lifecycle.addListener(function () { return value(dom); });
    }
    else {
        if (index$4.isInvalid(value)) {
            return;
        }
        index$4.throwError();
    }
}
exports.mountRef = mountRef;
});

var utils = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });






// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
exports.EMPTY_OBJ = {};
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    if (index$4.isUndefined(context)) {
        context = exports.EMPTY_OBJ; // Context should not be mutable
    }
    var instance = new Component(props, context);
    vNode.children = instance;
    instance._blockSetState = false;
    instance.context = context;
    if (instance.props === exports.EMPTY_OBJ) {
        instance.props = props;
    }
    // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
    instance._lifecycle = lifecycle;
    instance._unmounted = false;
    instance._pendingSetState = true;
    instance._isSVG = isSVG;
    if (!index$4.isUndefined(instance.componentWillMount)) {
        instance._blockRender = true;
        instance.componentWillMount();
        instance._blockRender = false;
    }
    var childContext;
    if (!index$4.isUndefined(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (index$4.isNullOrUndef(childContext)) {
        instance._childContext = context;
    }
    else {
        instance._childContext = index$4.combineFrom(context, childContext);
    }
    if (!index$4.isNull(options.options.beforeRender)) {
        options.options.beforeRender(instance);
    }
    var input = instance.render(props, instance.state, context);
    if (!index$4.isNull(options.options.afterRender)) {
        options.options.afterRender(instance);
    }
    if (index$4.isArray(input)) {
        index$4.throwError();
    }
    else if (index$4.isInvalid(input)) {
        input = VNodes.createVoidVNode();
    }
    else if (index$4.isStringOrNumber(input)) {
        input = VNodes.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    instance._pendingSetState = false;
    instance._lastInput = input;
    return instance;
}
exports.createClassComponentInstance = createClassComponentInstance;
function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
    replaceVNode(parentDom, mounting.mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
}
exports.replaceLastChildAndUnmount = replaceLastChildAndUnmount;
function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
    unmounting.unmount(vNode, null, lifecycle, false, isRecycling);
    replaceChild(parentDom, dom, vNode.dom);
}
exports.replaceVNode = replaceVNode;
function createFunctionalComponentInput(vNode, component, props, context) {
    var input = component(props, context);
    if (index$4.isArray(input)) {
        index$4.throwError();
    }
    else if (index$4.isInvalid(input)) {
        input = VNodes.createVoidVNode();
    }
    else if (index$4.isStringOrNumber(input)) {
        input = VNodes.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    return input;
}
exports.createFunctionalComponentInput = createFunctionalComponentInput;
function setTextContent(dom, text) {
    if (text !== '') {
        dom.textContent = text;
    }
    else {
        dom.appendChild(document.createTextNode(''));
    }
}
exports.setTextContent = setTextContent;
function updateTextContent(dom, text) {
    dom.firstChild.nodeValue = text;
}
exports.updateTextContent = updateTextContent;
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
exports.appendChild = appendChild;
function insertOrAppend(parentDom, newNode, nextNode) {
    if (index$4.isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
exports.insertOrAppend = insertOrAppend;
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(constants.svgNS, tag);
    }
    else {
        return document.createElement(tag);
    }
}
exports.documentCreateElement = documentCreateElement;
function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    unmounting.unmount(lastNode, null, lifecycle, false, isRecycling);
    var dom = mounting.mount(nextNode, null, lifecycle, context, isSVG);
    nextNode.dom = dom;
    replaceChild(parentDom, dom, lastNode.dom);
}
exports.replaceWithNewNode = replaceWithNewNode;
function replaceChild(parentDom, nextDom, lastDom) {
    if (!parentDom) {
        parentDom = lastDom.parentNode;
    }
    parentDom.replaceChild(nextDom, lastDom);
}
exports.replaceChild = replaceChild;
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
exports.removeChild = removeChild;
function removeAllChildren(dom, children, lifecycle, isRecycling) {
    dom.textContent = '';
    if (!options.options.recyclingEnabled || (options.options.recyclingEnabled && !isRecycling)) {
        removeChildren(null, children, lifecycle, isRecycling);
    }
}
exports.removeAllChildren = removeAllChildren;
function removeChildren(dom, children, lifecycle, isRecycling) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!index$4.isInvalid(child)) {
            unmounting.unmount(child, dom, lifecycle, true, isRecycling);
        }
    }
}
exports.removeChildren = removeChildren;
function isKeyed(lastChildren, nextChildren) {
    return nextChildren.length > 0 && !index$4.isNullOrUndef(nextChildren[0]) && !index$4.isNullOrUndef(nextChildren[0].key)
        && lastChildren.length > 0 && !index$4.isNullOrUndef(lastChildren[0]) && !index$4.isNullOrUndef(lastChildren[0].key);
}
exports.isKeyed = isKeyed;
});

var VNodes = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });




function VNode(children, className, flags, key, props, ref, type) {
    this.children = children;
    this.className = className;
    this.dom = null;
    this.flags = flags;
    this.key = key;
    this.props = props;
    this.ref = ref;
    this.type = type;
}
/**
 * Creates virtual node
 * @param {number} flags
 * @param {string|Function|null} type
 * @param {string|null=} className
 * @param {object=} children
 * @param {object=} props
 * @param {*=} key
 * @param {object|Function=} ref
 * @param {boolean=} noNormalise
 * @returns {VNode} returns new virtual node
 */
function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
    if (flags & 16 /* ComponentUnknown */) {
        flags = index$4.isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
    }
    var vNode = new VNode(children === void 0 ? null : children, className === void 0 ? null : className, flags, key === void 0 ? null : key, props === void 0 ? null : props, ref === void 0 ? null : ref, type);
    if (noNormalise !== true) {
        normalization.normalize(vNode);
    }
    if (options.options.createVNode !== null) {
        options.options.createVNode(vNode);
    }
    return vNode;
}
exports.createVNode = createVNode;
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 28 /* Component */) {
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, null, props, vNodeToClone.key, vNodeToClone.ref, true);
        var newProps = newVNode.props;
        if (newProps) {
            var newChildren = newProps.children;
            // we need to also clone component children that are in props
            // as the children may also have been hoisted
            if (newChildren) {
                if (index$4.isArray(newChildren)) {
                    var len = newChildren.length;
                    if (len > 0) {
                        var tmpArray = [];
                        for (var i = 0; i < len; i++) {
                            var child = newChildren[i];
                            if (index$4.isStringOrNumber(child)) {
                                tmpArray.push(child);
                            }
                            else if (!index$4.isInvalid(child) && isVNode(child)) {
                                tmpArray.push(directClone(child));
                            }
                        }
                        newProps.children = tmpArray;
                    }
                }
                else if (isVNode(newChildren)) {
                    newProps.children = directClone(newChildren);
                }
            }
        }
        newVNode.children = null;
    }
    else if (flags & 3970 /* Element */) {
        var children = vNodeToClone.children;
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props, vNodeToClone.key, vNodeToClone.ref, !children);
    }
    else if (flags & 1 /* Text */) {
        newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
    }
    return newVNode;
}
exports.directClone = directClone;
/*
 directClone is preferred over cloneVNode and used internally also.
 This function makes Inferno backwards compatible.
 And can be tree-shaked by modern bundlers

 Would be nice to combine this with directClone but could not do it without breaking change
 */
/**
 * Clones given virtual node by creating new instance of it
 * @param {VNode} vNodeToClone virtual node to be cloned
 * @param {Props=} props additional props for new virtual node
 * @param {...*} _children new children for new virtual node
 * @returns {VNode} new virtual node
 */
function cloneVNode(vNodeToClone, props) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    var children = _children;
    var childrenLen = _children.length;
    if (childrenLen > 0 && !index$4.isUndefined(_children[0])) {
        if (!props) {
            props = {};
        }
        if (childrenLen === 1) {
            children = _children[0];
        }
        if (!index$4.isUndefined(children)) {
            props.children = children;
        }
    }
    var newVNode;
    if (index$4.isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(directClone(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    }
    else {
        var flags = vNodeToClone.flags;
        var className = vNodeToClone.className || (props && props.className);
        var key = !index$4.isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : (props ? props.key : null);
        var ref = vNodeToClone.ref || (props ? props.ref : null);
        if (flags & 28 /* Component */) {
            newVNode = createVNode(flags, vNodeToClone.type, className, null, (!vNodeToClone.props && !props) ? utils.EMPTY_OBJ : index$4.combineFrom(vNodeToClone.props, props), key, ref, true);
            var newProps = newVNode.props;
            if (newProps) {
                var newChildren = newProps.children;
                // we need to also clone component children that are in props
                // as the children may also have been hoisted
                if (newChildren) {
                    if (index$4.isArray(newChildren)) {
                        var len = newChildren.length;
                        if (len > 0) {
                            var tmpArray = [];
                            for (var i = 0; i < len; i++) {
                                var child = newChildren[i];
                                if (index$4.isStringOrNumber(child)) {
                                    tmpArray.push(child);
                                }
                                else if (!index$4.isInvalid(child) && isVNode(child)) {
                                    tmpArray.push(directClone(child));
                                }
                            }
                            newProps.children = tmpArray;
                        }
                    }
                    else if (isVNode(newChildren)) {
                        newProps.children = directClone(newChildren);
                    }
                }
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            children = (props && !index$4.isUndefined(props.children)) ? props.children : vNodeToClone.children;
            newVNode = createVNode(flags, vNodeToClone.type, className, children, (!vNodeToClone.props && !props) ? utils.EMPTY_OBJ : index$4.combineFrom(vNodeToClone.props, props), key, ref, !children);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, key);
        }
    }
    return newVNode;
}
exports.cloneVNode = cloneVNode;
function createVoidVNode() {
    return createVNode(4096 /* Void */, null);
}
exports.createVoidVNode = createVoidVNode;
function createTextVNode(text, key) {
    return createVNode(1 /* Text */, null, null, text, null, key);
}
exports.createTextVNode = createTextVNode;
function isVNode(o) {
    return !!o.flags;
}
exports.isVNode = isVNode;
});

var normalization = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (index$4.isNumber(key)) {
        key = "." + key;
    }
    if (index$4.isNull(vNode.key) || vNode.key[0] === '.') {
        return applyKey(key, vNode);
    }
    return vNode;
}
function applyKeyPrefix(key, vNode) {
    vNode.key = key + vNode.key;
    return vNode;
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        var key = currentKey + "." + index;
        if (!index$4.isInvalid(n)) {
            if (index$4.isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            }
            else {
                if (index$4.isStringOrNumber(n)) {
                    n = VNodes.createTextVNode(n, null);
                }
                else if (VNodes.isVNode(n) && n.dom || (n.key && n.key[0] === '.')) {
                    n = VNodes.directClone(n);
                }
                if (index$4.isNull(n.key) || n.key[0] === '.') {
                    n = applyKey(key, n);
                }
                else {
                    n = applyKeyPrefix(currentKey, n);
                }
                result.push(n);
            }
        }
    }
}
function normalizeVNodes(nodes) {
    var newNodes;
    // we assign $ which basically means we've flagged this array for future note
    // if it comes back again, we need to clone it, as people are using it
    // in an immutable way
    // tslint:disable
    if (nodes['$']) {
        nodes = nodes.slice();
    }
    else {
        nodes['$'] = true;
    }
    // tslint:enable
    for (var i = 0, len = nodes.length; i < len; i++) {
        var n = nodes[i];
        if (index$4.isInvalid(n) || index$4.isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, "");
            return result;
        }
        else if (index$4.isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes.createTextVNode(n, null)));
        }
        else if ((VNodes.isVNode(n) && n.dom !== null) || (index$4.isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */))) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes.directClone(n)));
        }
        else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, VNodes.directClone(n)));
        }
    }
    return newNodes || nodes;
}
exports.normalizeVNodes = normalizeVNodes;
function normalizeChildren(children) {
    if (index$4.isArray(children)) {
        return normalizeVNodes(children);
    }
    else if (VNodes.isVNode(children) && children.dom !== null) {
        return VNodes.directClone(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (vNode.flags & 3970 /* Element */) {
        if (index$4.isNullOrUndef(children) && !index$4.isNullOrUndef(props.children)) {
            vNode.children = props.children;
        }
        if (!index$4.isNullOrUndef(props.className)) {
            vNode.className = props.className;
            delete props.className;
        }
    }
    if (props.ref) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (!index$4.isNullOrUndef(props.key)) {
        vNode.key = props.key;
        delete props.key;
    }
}
function getFlagsForElementVnode(type) {
    if (type === 'svg') {
        return 128 /* SvgElement */;
    }
    else if (type === 'input') {
        return 512 /* InputElement */;
    }
    else if (type === 'select') {
        return 2048 /* SelectElement */;
    }
    else if (type === 'textarea') {
        return 1024 /* TextareaElement */;
    }
    else if (type === 'media') {
        return 256 /* MediaElement */;
    }
    return 2 /* HtmlElement */;
}
exports.getFlagsForElementVnode = getFlagsForElementVnode;
function normalize(vNode) {
    var props = vNode.props;
    var children = vNode.children;
    // convert a wrongly created type back to element
    // Primitive node doesn't have defaultProps, only Component
    if (vNode.flags & 28 /* Component */) {
        // set default props
        var type = vNode.type;
        var defaultProps = type.defaultProps;
        if (!index$4.isNullOrUndef(defaultProps)) {
            if (!props) {
                props = vNode.props = defaultProps; // Create new object if only defaultProps given
            }
            else {
                for (var prop in defaultProps) {
                    if (index$4.isUndefined(props[prop])) {
                        props[prop] = defaultProps[prop];
                    }
                }
            }
        }
        if (index$4.isString(type)) {
            vNode.flags = getFlagsForElementVnode(type);
            if (props && props.children) {
                vNode.children = props.children;
                children = props.children;
            }
        }
    }
    if (props) {
        normalizeProps(vNode, props, children);
        if (!index$4.isInvalid(props.children)) {
            props.children = normalizeChildren(props.children);
        }
    }
    if (!index$4.isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    
}
exports.normalize = normalize;
});

var linkEvent_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */
function linkEvent(data, event) {
    return { data: data, event: event };
}
exports.linkEvent = linkEvent;
});

var index$2 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.NO_OP = index$4.NO_OP;

exports.getFlagsForElementVnode = normalization.getFlagsForElementVnode;
exports.internal_normalize = normalization.normalize;

exports.options = options.options;

exports.cloneVNode = VNodes.cloneVNode;
exports.createVNode = VNodes.createVNode;

exports.internal_isUnitlessNumber = constants.isUnitlessNumber;

exports.linkEvent = linkEvent_1.linkEvent;

exports.internal_patch = patching.patch;

exports.internal_DOMNodeMap = rendering.componentToDOMNodeMap;
exports.createRenderer = rendering.createRenderer;
exports.findDOMNode = rendering.findDOMNode;
exports.render = rendering.render;

exports.EMPTY_OBJ = utils.EMPTY_OBJ;
var version = '3.0.4';
exports.version = version;
// we duplicate it so it plays nicely with different module loading systems
exports.default = {
    getFlagsForElementVnode: normalization.getFlagsForElementVnode,
    linkEvent: linkEvent_1.linkEvent,
    // core shapes
    createVNode: VNodes.createVNode,
    // cloning
    cloneVNode: VNodes.cloneVNode,
    // used to shared common items between Inferno libs
    NO_OP: index$4.NO_OP,
    EMPTY_OBJ: utils.EMPTY_OBJ,
    // DOM
    render: rendering.render,
    findDOMNode: rendering.findDOMNode,
    createRenderer: rendering.createRenderer,
    options: options.options,
    version: version,
    internal_patch: patching.patch,
    internal_DOMNodeMap: rendering.componentToDOMNodeMap,
    internal_isUnitlessNumber: constants.isUnitlessNumber,
    internal_normalize: normalization.normalize
};
});

var index = createCommonjsModule(function (module) {
module.exports = index$2.default;
module.exports.default = module.exports;
});

var index_1 = index.linkEvent;
var index_2 = index.render;

var index$9 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


var componentHooks = new Set();
componentHooks.add('onComponentWillMount');
componentHooks.add('onComponentDidMount');
componentHooks.add('onComponentWillUnmount');
componentHooks.add('onComponentShouldUpdate');
componentHooks.add('onComponentWillUpdate');
componentHooks.add('onComponentDidUpdate');
/**
 * Creates virtual node
 * @param {string|Function|Component<any, any>} type Type of node
 * @param {object=} props Optional props for virtual node
 * @param {...{object}=} _children Optional children for virtual node
 * @returns {VNode} new virtual ndoe
 */
function createElement(type, props) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    if (index$4.isInvalid(type) || index$4.isObject(type)) {
        throw new Error('Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.');
    }
    var children = _children;
    var ref = null;
    var key = null;
    var className = null;
    var flags = 0;
    var newProps;
    if (_children) {
        if (_children.length === 1) {
            children = _children[0];
        }
        else if (_children.length === 0) {
            children = void 0;
        }
    }
    if (index$4.isString(type)) {
        flags = index.getFlagsForElementVnode(type);
        if (!index$4.isNullOrUndef(props)) {
            newProps = {};
            for (var prop in props) {
                if (prop === 'className' || prop === 'class') {
                    className = props[prop];
                }
                else if (prop === 'key') {
                    key = props.key;
                }
                else if (prop === 'children' && index$4.isUndefined(children)) {
                    children = props.children; // always favour children args, default to props
                }
                else if (prop === 'ref') {
                    ref = props.ref;
                }
                else {
                    newProps[prop] = props[prop];
                }
            }
        }
    }
    else {
        flags = 16 /* ComponentUnknown */;
        if (!index$4.isUndefined(children)) {
            if (!props) {
                props = {};
            }
            props.children = children;
            children = null;
        }
        if (!index$4.isNullOrUndef(props)) {
            newProps = {};
            for (var prop in props) {
                if (componentHooks.has(prop)) {
                    if (!ref) {
                        ref = {};
                    }
                    ref[prop] = props[prop];
                }
                else if (prop === 'key') {
                    key = props.key;
                }
                else {
                    newProps[prop] = props[prop];
                }
            }
        }
    }
    return index.createVNode(flags, type, className, children, newProps, key, ref);
}
exports.default = createElement;
});

var index$8 = createCommonjsModule(function (module) {
module.exports = index$9.default;
module.exports.default = module.exports;
});

var index$12 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference


var noOp = index$4.ERROR_MSG;
var componentCallbackQueue = new Map();
// when a components root VNode is also a component, we can run into issues
// this will recursively look for vNode.parentNode if the VNode is a component
function updateParentComponentVNodes(vNode, dom) {
    if (vNode.flags & 28 /* Component */) {
        var parentVNode = vNode.parentVNode;
        if (parentVNode) {
            parentVNode.dom = dom;
            updateParentComponentVNodes(parentVNode, dom);
        }
    }
}
var resolvedPromise = Promise.resolve();
function addToQueue(component, force, callback) {
    var queue = componentCallbackQueue.get(component);
    if (queue === void 0) {
        queue = [];
        componentCallbackQueue.set(component, queue);
        resolvedPromise.then(function () {
            componentCallbackQueue.delete(component);
            component._updating = true;
            applyState(component, force, function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i]();
                }
            });
            component._updating = false;
        });
    }
    if (!index$4.isNullOrUndef(callback)) {
        queue.push(callback);
    }
}
function queueStateChanges(component, newState, callback) {
    if (index$4.isFunction(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    var pending = component._pendingState;
    if (pending === null) {
        component._pendingState = pending = newState;
    }
    else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (index$4.isBrowser && !component._pendingSetState && !component._blockRender) {
        if (!component._updating) {
            component._pendingSetState = true;
            component._updating = true;
            applyState(component, false, callback);
            component._updating = false;
        }
        else {
            addToQueue(component, false, callback);
        }
    }
    else {
        var state = component.state;
        if (state === null) {
            component.state = pending;
        }
        else {
            for (var key in pending) {
                state[key] = pending[key];
            }
        }
        component._pendingState = null;
        if (!index$4.isNullOrUndef(callback) && component._blockRender) {
            component._lifecycle.addListener(callback.bind(component));
        }
    }
}
function applyState(component, force, callback) {
    if (component._unmounted) {
        return;
    }
    if (force || !component._blockRender) {
        component._pendingSetState = false;
        var pendingState = component._pendingState;
        var prevState = component.state;
        var nextState = index$4.combineFrom(prevState, pendingState);
        var props = component.props;
        var context_1 = component.context;
        component._pendingState = null;
        var nextInput = component._updateComponent(prevState, nextState, props, props, context_1, force, true);
        var didUpdate = true;
        if (index$4.isInvalid(nextInput)) {
            nextInput = index.createVNode(4096 /* Void */, null);
        }
        else if (nextInput === index$4.NO_OP) {
            nextInput = component._lastInput;
            didUpdate = false;
        }
        else if (index$4.isStringOrNumber(nextInput)) {
            nextInput = index.createVNode(1 /* Text */, null, null, nextInput);
        }
        else if (index$4.isArray(nextInput)) {
            index$4.throwError();
        }
        var lastInput = component._lastInput;
        var vNode = component._vNode;
        var parentDom = (lastInput.dom && lastInput.dom.parentNode) || (lastInput.dom = vNode.dom);
        component._lastInput = nextInput;
        if (didUpdate) {
            var childContext = void 0;
            if (!index$4.isUndefined(component.getChildContext)) {
                childContext = component.getChildContext();
            }
            if (index$4.isNullOrUndef(childContext)) {
                childContext = component._childContext;
            }
            else {
                childContext = index$4.combineFrom(context_1, childContext);
            }
            var lifeCycle = component._lifecycle;
            index.internal_patch(lastInput, nextInput, parentDom, lifeCycle, childContext, component._isSVG, false);
            lifeCycle.trigger();
            if (!index$4.isUndefined(component.componentDidUpdate)) {
                component.componentDidUpdate(props, prevState, context_1);
            }
            if (!index$4.isNull(index.options.afterUpdate)) {
                index.options.afterUpdate(vNode);
            }
        }
        var dom = vNode.dom = nextInput.dom;
        if (index.options.findDOMNodeEnabled) {
            index.internal_DOMNodeMap.set(component, nextInput.dom);
        }
        updateParentComponentVNodes(vNode, dom);
    }
    else {
        component.state = component._pendingState;
        component._pendingState = null;
    }
    if (!index$4.isNullOrUndef(callback)) {
        callback.call(component);
    }
}
var alreadyWarned = false;
var Component = (function () {
    function Component(props, context) {
        this.state = null;
        this._blockRender = false;
        this._blockSetState = true;
        this._pendingSetState = false;
        this._pendingState = null;
        this._lastInput = null;
        this._vNode = null;
        this._unmounted = false;
        this._lifecycle = null;
        this._childContext = null;
        this._isSVG = false;
        this._updating = true;
        /** @type {object} */
        this.props = props || index.EMPTY_OBJ;
        /** @type {object} */
        this.context = context || index.EMPTY_OBJ; // context should not be mutable
    }
    Component.prototype.forceUpdate = function (callback) {
        if (this._unmounted || !index$4.isBrowser) {
            return;
        }
        applyState(this, true, callback);
    };
    Component.prototype.setState = function (newState, callback) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            queueStateChanges(this, newState, callback);
        }
        else {
            index$4.throwError();
        }
    };
    Component.prototype.setStateSync = function (newState) {
        this.setState(newState);
    };
    Component.prototype._updateComponent = function (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
        if (this._unmounted === true) {
            index$4.throwError();
        }
        if ((prevProps !== nextProps || nextProps === index.EMPTY_OBJ) || prevState !== nextState || force) {
            if (prevProps !== nextProps || nextProps === index.EMPTY_OBJ) {
                if (!index$4.isUndefined(this.componentWillReceiveProps) && !fromSetState) {
                    this._blockRender = true;
                    this.componentWillReceiveProps(nextProps, context);
                    this._blockRender = false;
                }
                if (this._pendingSetState) {
                    nextState = index$4.combineFrom(nextState, this._pendingState);
                    this._pendingSetState = false;
                    this._pendingState = null;
                }
            }
            /* Update if scu is not defined, or it returns truthy value or force */
            if (index$4.isUndefined(this.shouldComponentUpdate) || this.shouldComponentUpdate(nextProps, nextState, context) || force) {
                if (!index$4.isUndefined(this.componentWillUpdate)) {
                    this._blockSetState = true;
                    this.componentWillUpdate(nextProps, nextState, context);
                    this._blockSetState = false;
                }
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
                if (index.options.beforeRender) {
                    index.options.beforeRender(this);
                }
                var render = this.render(nextProps, nextState, context);
                if (index.options.afterRender) {
                    index.options.afterRender(this);
                }
                return render;
            }
            else {
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
            }
        }
        return index$4.NO_OP;
    };
    // tslint:disable-next-line:no-empty
    Component.prototype.render = function (nextProps, nextState, nextContext) { };
    return Component;
}());
exports.default = Component;
});

var index$11 = createCommonjsModule(function (module) {
module.exports = index$12.default;
module.exports.default = module.exports;
});

const __assign = Object.assign || function (target) {
    for (var source, i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (var prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

// Provider passes context to children
var Provider = (function (_super) {
    __extends(Provider, _super);
    function Provider(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.api = props.api;
        _this.store = props.store;
        _this.router = props.router;
        return _this;
    }
    Provider.prototype.getChildContext = function () {
        return {
            api: this.api,
            store: this.store,
            router: this.router
        };
    };
    Provider.prototype.render = function () {
        return this.props.children;
    };
    return Provider;
}(index$11));

// Route handles Component delegation
var Route = (function (_super) {
    __extends(Route, _super);
    function Route(props, context) {
        return _super.call(this, props, context) || this;
    }
    Route.prototype.render = function () {
        var _a = this.props, component = _a.component, render = _a.render;
        var match = this.props.path === this.context.store.getState().route;
        if (!match)
            return null;
        if (component) {
            return index$8(this.props.component, {}, null);
        }
        if (render) {
            return render({ match: match });
        }
        return null;
    };
    return Route;
}(index$11));

// handle user login
function doLogin(_a) {
    var api = _a.api, store = _a.store;
    api.login()
        .then(function (user) {
        store.updateState({ auth: true, route: 'index', user: user });
    });
}
// Login Screen when No-Auth
function Login(_a, _b) {
    var api = _b.api, store = _b.store;
    return (index$8("div", null,
        index$8("a", { className: "ghost-btn orange", onClick: index_1({ api: api, store: store }, doLogin) },
            index$8("span", null,
                "Login with GitHub ",
                index$8("i", { className: "fa fa-github" }))),
        index$8("br", null),
        index$8("input", { type: "checkbox", id: "login-cbx" }),
        index$8("label", { "for": "login-cbx" }, "Remember Me")));
}

// Wrapper around Route for handling Authentication
var AuthRoute = (function (_super) {
    __extends(AuthRoute, _super);
    function AuthRoute(props, context) {
        return _super.call(this, props, context) || this;
    }
    AuthRoute.prototype.render = function () {
        var _this = this;
        var Component = this.props.component;
        return index$8(Route, { path: this.props.path, render: function (renderProps) {
                if (_this.context.store.getState().auth && renderProps.match) {
                    return index$8(Component, null);
                }
                return index$8(Login, null);
            } });
    };
    return AuthRoute;
}(index$11));

// User Avatar Image
var Avatar = function (_a) {
    var avatar = _a.avatar, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (index$8("img", { className: "component_avatar " + className, src: avatar }));
};

// functions which handle set/get of client side cookies
// create a name/value cookie for an amount of time or infinity
// functions which handle set/get of client side cookies
function createCookie(name, value, days) {
    var expires = '; expires = Fri, 31 Dec 9999 23:59:59 GMT'; // default to forever ;)
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
// read a cookie by name
function readCookie(name) {
    var cookies = document.cookie.split(';');
    var myCookie = cookies.find(function (c) { return c.indexOf(name) === 1; });
    if (!myCookie) {
        return '';
    }
    return myCookie.split('=')[1];
}
// erase a cookie by name
function eraseCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

var AppService = {
    // logout user
    logout: function (_a) {
        var api = _a.api, store = _a.store;
        store.updateState({ auth: false, route: 'login' });
    },
    // get list of posts
    // TODO
    getPosts: function () {
        return new Promise(function (resolve, reject) {
            fetch('/get-posts')
                .then(function (res) { return res.json(); })
                .then(function (res) { return resolve(res); })["catch"](function (err) { return reject(err); });
        });
    },
    // does some initialization work to read access token
    // from the cookies, and then go grab the user deets
    // with the token, it can also resolve empty if no token
    init: function () {
        return new Promise(function (resolve, reject) {
            // is the access_token in the cookie?
            var access_token = readCookie('redacted');
            if (typeof access_token === 'string' && access_token !== '') {
                // call github to get user deets
                fetch("https://api.github.com/user", {
                    headers: {
                        Authorization: "token " + access_token,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(function (res) { return res.json(); })
                    .then(function (res) { return resolve({ access_token: access_token, user: res }); })["catch"](function (err) { return reject(err); });
            }
            else {
                // no user deets yet
                resolve({});
            }
        });
    }
};

// handle click of create new post
function createPost(_a) {
    var store = _a.store;
    store.updateState({ route: 'post' });
}
// Auth Header
var HeaderAuth = function (_a, _b) {
    var avatar = _a.avatar, className = _a.className;
    var api = _b.api, store = _b.store;
    var _c = store.getState(), appInit = _c.appInit, hasBaseRepo = _c.hasBaseRepo;
    return (index$8("div", null,
        index$8("div", { className: "menu-wrapper" },
            index$8(Avatar, { avatar: avatar }),
            index$8("ul", { className: "sub-menu" },
                appInit && hasBaseRepo
                    ? index$8("li", { onClick: index_1({ store: store }, createPost) }, "New Post")
                    : null,
                index$8("li", { onClick: index_1({ api: api, store: store }, AppService.logout) }, "Logout")))));
};

// Auth Header
var HeaderNonAuth = function (_a, _b) {
    var auth = _a.auth;
    var router = _b.router;
    return (index$8("span", null));
};

// Generic App Header
// TODO: handle auth/no-auth
var Header = function (_a, _b) {
    var auth = _a.auth;
    var store = _b.store;
    return (index$8("header", { className: "header black-bg" },
        index$8("a", { className: "circle" }),
        auth ? index$8(HeaderAuth, { avatar: store.getState().user.avatar_url }) : index$8(HeaderNonAuth, null)));
};

// Main App Shell
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this.handleStoreChange = _this.handleStoreChange.bind(_this);
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.context.store.subscribe(this.handleStoreChange);
    };
    App.prototype.componentWillUnmount = function () {
        this.context.store.unsubscribe(this.handleStoreChange);
    };
    App.prototype.handleStoreChange = function (newState) {
        this.forceUpdate();
    };
    App.prototype.render = function () {
        var _a = this.context.store.getState(), auth = _a.auth, route = _a.route;
        return (index$8("section", { id: "container" },
            index$8(Header, { auth: auth }),
            index$8("section", { "class": "content " + route }, this.props.children)));
    };
    return App;
}(index$11));

function handlePostClick(_a) {
    var post = _a.post, store = _a.store;
    store.updateState({ route: 'post', postToEdit: post });
}
// Posts
var Posts = (function (_super) {
    __extends(Posts, _super);
    function Posts() {
        var _this = _super.call(this) || this;
        _this.state = {
            haveConfig: false,
            posts: []
        };
        return _this;
    }
    Posts.prototype.componentDidMount = function () {
        var _this = this;
        // grab config which has post slugs
        this.context.api.request('/repos/:username/fuusio/contents/config.json')
            .then(function (res) {
            try {
                var config = JSON.parse(window.atob(res.content));
                _this.setState({
                    haveConfig: true,
                    config: config,
                    posts: Object.keys(config.posts)
                });
            }
            catch (e) {
                console.log('Posts Component: there was an error parsing the config', e);
            }
        });
    };
    Posts.prototype.render = function () {
        var _a = this.state, haveConfig = _a.haveConfig, config = _a.config, posts = _a.posts;
        var store = this.context.store;
        return (index$8("div", { className: "posts-list" }, haveConfig
            ? posts.length ? (index$8("ul", null, posts.map(function (slug) { return (index$8("li", { onClick: index_1({ post: config.posts[slug], store: store }, handlePostClick) }, config.posts[slug].title)); }))) : null
            : null));
    };
    return Posts;
}(index$11));

// handle click to fork repo
function forkRepo() {
    var _this = this;
    var _a = this.data, context = _a.context, setState = _a.setState;
    context.api.forkRepo({ owner: 'galaksi', repo: 'fuusio' })
        .then(function (res) {
        setState.call(_this.data, { hasBaseRepo: true });
    })["catch"](function (err) { return console.log('error: forking base repo', err); });
}
// Home Screen with Auth
var Home = (function (_super) {
    __extends(Home, _super);
    function Home(props, context) {
        return _super.call(this, props, context) || this;
    }
    Home.prototype.componentDidMount = function () {
        var _this = this;
        // when home mounts we need to fetch user deets
        // also, need to check for existence of the base repo
        // if it is there, set hasBaseRepo to true, otherwise
        // will display button for user to set it all up which
        // will create the fork and allow user to start creating posts!
        this.context.api.getRepo('fuusio')
            .then(function (res) {
            _this.context.store.updateState({
                appInit: true,
                hasBaseRepo: (res && res.message !== 'Not Found') ? true : false
            });
        });
    };
    Home.prototype.render = function () {
        var _a = this.context.store.getState(), appInit = _a.appInit, hasBaseRepo = _a.hasBaseRepo;
        return (index$8("div", { className: "col-lg-12", id: "index" }, appInit ?
            !hasBaseRepo
                ? (index$8("div", null,
                    index$8("span", { className: "title" }, "Welcome Home"),
                    index$8("br", null),
                    index$8("br", null),
                    "First things first! We'll need to fork the base blog repo over to your account.",
                    index$8("br", null),
                    "From there, all new posts you create will live under this newly forked repo.",
                    index$8("br", null),
                    index$8("br", null),
                    index$8("a", { className: "ghost-btn purple", onClick: index_1(this, forkRepo) },
                        index$8("span", null,
                            "Let's Go! Create the Blog Repo! ",
                            index$8("i", { className: "fa fa-github" })))))
                : index$8(Posts, null)
            : null));
    };
    return Home;
}(index$11));

// Miscellaneous Helper Functions
// get oauth token from response string
// Miscellaneous Helper Functions
function getTokenFromString(tokenString) {
    return tokenString.substring(tokenString.indexOf('=') + 1, tokenString.indexOf('&'));
}
// determine if a file is an image 
function fileIsAnImage(file) {
    var regExp = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i);
    return regExp.test(file);
}
// get signed s3 request from server

// helper for UI time display

// Form Service
// Currently andles form logistics 
// (form setup/destroy, WebSocket communication, Image uploads)
function FormService() {
    var formWS = null;
    // get image that was uploaded via dialog
    function getImage(id) {
        return new Promise(function (resolve, reject) {
            var file = document.getElementById(id).files[0];
            var reader = new FileReader();
            if (!file) {
                console.log('no file selected');
                return;
            }
            if (file && fileIsAnImage(file.name)) {
                reader.readAsDataURL(file);
                function onLoad() {
                    reader.removeEventListener('load', onLoad, false);
                    resolve({ file: file, content: reader.result });
                }
                var listener = reader.addEventListener('load', onLoad, false);
            }
        });
    }
    // when form mounts, boot up the web socket
    function formMount(state) {
        return new Promise(function (resolve, reject) {
            formWS = new WebSocket("ws://" + location.host);
            formWS.onerror = function () { return console.log('WebSocket error'); };
            formWS.onopen = function () {
                console.log('WebSocket is opened');
                resolve();
            };
            formWS.onclose = function () { return console.log('WebSocket connection closed'); };
            formWS.onmessage = function (msg) {
                document.getElementById('post-preview').innerHTML = msg.data;
            };
        });
    }
    // when form unmounts, destroy the web socket
    function formUnmount() {
        formWS.close();
        formWS = null;
    }
    // listen for when the textarea has been updated
    // this sends the content over the socket
    function changeEventHandler(event) {
        formWS.send(JSON.stringify({ content: event.target.value }));
    }
    // handle the submission of the form
    function submit(_a, event) {
        var state = _a.state, token = _a.token, cover = _a.cover;
        return new Promise(function (resolve, reject) {
            // prevent the default browser form behavior, we'll handle it
            event.preventDefault();
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            var route = '';
            var data = {};
            // check the state of postToEdit
            if (!state.postToEdit) {
                route = 'save-post';
                data = {
                    deets: {
                        'title': document.getElementById('title').value,
                        'content': document.getElementById('content').value
                    },
                    token: token,
                    cover: cover,
                    user: {
                        login: state.user.login,
                        name: state.user.name
                    }
                };
            }
            else {
                route = 'update-post';
                data = {
                    post: state.postToEdit,
                    deets: {
                        'title': document.getElementById('title').value,
                        'content': document.getElementById('content').value
                    },
                    token: token,
                    user: {
                        login: state.user.login,
                        name: state.user.name
                    }
                };
            }
            fetch(route, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(data)
            })
                .then(function (res) {
                if (res && res.status === 200) {
                    // reset UI state
                    document.getElementById('submit-btn').classList.remove('purple');
                    document.getElementById('submit-btn').classList.add('green');
                    setTimeout(function () {
                        resolve();
                    }, 2500);
                }
                else {
                    reject('SAVE FAILURE');
                }
            });
        });
    }
    // delete a post from the database
    function deletePost(_a) {
        var store = _a.store, getPosts = _a.getPosts, router = _a.router;
        var state = store.getState();
        // prevent the default browser form behavior, we'll handle it
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var _id = document.getElementById('post-form').attributes['data-id'].nodeValue;
        var post = state.posts.find(function (p) { return p._id === _id; });
        var data = {
            timestamp: post.timestamp
        };
        fetch('delete-post', {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            if (res) {
                // fetch new list
                getPosts(store);
                // reset UI state
                document.getElementById('delete-btn').classList.remove('orange');
                document.getElementById('delete-btn').classList.add('green');
                setTimeout(function () {
                    store.updateState({ route: 'index' });
                }, 2500);
            }
            else {
                console.log('DELETE FAILURE');
            }
        });
    }
    return {
        formMount: formMount,
        formUnmount: formUnmount,
        changeEventHandler: changeEventHandler,
        getImage: getImage,
        deletePost: deletePost,
        submit: submit
    };
}

// store any image uploads until submission
function imageSelectionForCover(t) {
    t.formService.getImage('cover-image')
        .then(function (_a) {
        var file = _a.file, content = _a.content;
        document.getElementById('file-preview').src = content;
        var user = t.context.store.getState().user;
        t.context.api.post('add-image', {
            name: file.name,
            content: content.replace(/^(.+,)/, ''),
            token: t.context.api.getToken(),
            owner: user.login
        })
            .then(function (res) {
            t.cover = file.name;
        });
    });
}
function imageSelectionForPostBody(t) {
    t.formService.getImage('post-image')
        .then(function (_a) {
        var file = _a.file, content = _a.content;
        var user = t.context.store.getState().user;
        t.context.api.post('add-image', {
            name: file.name,
            content: content.replace(/^(.+,)/, ''),
            token: t.context.api.getToken(),
            owner: user.login
        })
            .then(function (res) {
            var content = document.getElementById('content').value;
            if (content === '') {
                document.getElementById('content').value = "![" + file.name + "](../../media/" + file.name + ")";
            }
            else {
                document.getElementById('content').value = content + "\n\n![" + file.name + "](../../media/" + file.name + ")";
            }
        });
    });
}
// submit the form
function formSubmission(t, event) {
    t.formService.submit({
        token: t.context.api.getToken(),
        state: t.context.store.getState(),
        cover: t.cover
    }, event)
        .then(function (res) {
        t.context.store.updateState({ route: 'index' });
    });
}
function closeForm(store) {
    store.updateState({ route: 'index', postToEdit: null });
}
// Generic Form
// TODO: Split into New/Edit
var Form = (function (_super) {
    __extends(Form, _super);
    function Form(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.cover = '';
        _this.formService = FormService();
        return _this;
    }
    Form.prototype.componentDidMount = function () {
        var _this = this;
        var state = this.context.store.getState();
        this.formService.formMount(this.context.store.getState())
            .then(function () {
            // check post details, go fetch if necessary
            if (state.postToEdit) {
                Promise.all([
                    _this.context.api.request('/repos/:username/fuusio/contents/config.json'),
                    _this.context.api.request("/repos/:username/fuusio/contents/drafts/" + state.postToEdit.slug + "/index.md")
                ])
                    .then(function (_a) {
                    var config = _a[0], post = _a[1];
                    try {
                        var parsedConfig = JSON.parse(atob(config.content));
                        var parsedPost = JSON.parse(atob(post.content));
                        document.getElementById('title').value = parsedConfig.posts[state.postToEdit.slug].title;
                        document.getElementById('content').value = parsedPost;
                    }
                    catch (e) {
                        console.log('failed to parse post title and contents for edit', e);
                    }
                })["catch"](function (e) { return console.log('failed to fetch details for post to edit'); });
            }
        })["catch"](function (e) { return console.log('failed to mount form'); });
    };
    Form.prototype.componentWillUnmount = function () {
        this.formService.formUnmount();
        this.formService = null;
    };
    Form.prototype.render = function () {
        var state = this.context.store.getState();
        var _a = this.context, api = _a.api, router = _a.router, store = _a.store;
        return (index$8("div", null,
            index$8("div", { className: "col-lg-7", id: "new-post" },
                index$8("div", { className: "form-panel" },
                    index$8("div", { className: "form-header" },
                        index$8("h4", { className: "mb" },
                            index$8("i", { className: "fa fa-angle-right" }),
                            " ",
                            (state.route === 'new-post') ? "New Post" : "Edit Post"),
                        index$8("h4", { className: "close", onClick: index_1(store, closeForm) }, "X")),
                    index$8("form", { className: "form-horizontal style-form", id: "post-form", "data-type": state.route },
                        index$8("div", { className: "form-group" },
                            index$8("label", { className: "col-sm-2 col-sm-2 control-label" }, "Title"),
                            index$8("div", { className: "col-sm-10" },
                                index$8("input", { type: "text", className: "form-control", name: "title", id: "title" }))),
                        index$8("div", { className: "form-group" },
                            index$8("label", { className: "col-sm-2 col-sm-2 control-label" },
                                "Content",
                                index$8("input", { type: "file", id: "post-image", style: { display: 'none' }, onChange: index_1(this, imageSelectionForPostBody) }),
                                index$8("div", { "class": "content-upload-btn form-acc" },
                                    index$8("i", { className: "fa fa-file-image-o" }))),
                            index$8("div", { className: "col-sm-10" },
                                index$8("textarea", { type: "text", className: "form-control", name: "content", id: "content", onInput: this.formService.changeEventHandler }))),
                        index$8("div", { className: "form-group" },
                            index$8("label", { className: "col-sm-2 col-sm-2 control-label" }, "Cover Photo"),
                            index$8("div", { className: "col-sm-10" },
                                index$8("input", { type: "file", className: "form-control", id: "cover-image", onChange: index_1(this, imageSelectionForCover) }),
                                index$8("img", { src: "", alt: "Image preview...", id: "file-preview", name: "file-preview" }))),
                        index$8("a", { "class": "ghost-btn purple", id: "submit-btn", onClick: index_1(this, formSubmission) },
                            index$8("span", null, (state.route === 'new-post') ? "Submit" : "Save")),
                        (state.route === 'edit')
                            ? (index$8("a", { "class": "ghost-btn red", id: "delete-btn", onClick: index_1({ router: router, store: store }, this.formService.deletePost) },
                                index$8("span", null, "Delete")))
                            : null))),
            index$8("div", { className: "col-lg-5", id: "post-preview" },
                index$8("span", { "class": "content" },
                    index$8("span", { "class": "preview" }, "\u2728 Your post will preview here... \u2728")))));
    };
    return Form;
}(index$11));

/**
 * GitHub API base class is responsible for
 * login, set/get of auth tokens, and all
 * communication with the official GitHub API
 * endpoint, _the MainAPI extends this class_
 */
var GitHubAPI = (function () {
    function GitHubAPI(config) {
        this.COOKIE_KEY = 'redacted';
        this.access_token = config.access_token;
        this.user = config.user;
        this.base_url = 'https://api.github.com';
    }
    // set the token and instantiate github api
    GitHubAPI.prototype.setToken = function (token, rememberMe) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.access_token = token;
            if (rememberMe) {
                createCookie(_this.COOKIE_KEY, _this.access_token);
            }
            _this.setUser()
                .then(function (user) { return resolve(user); })["catch"](function (err) { return reject(err); });
        });
    };
    // erase token locally and from cookies
    GitHubAPI.prototype.eraseToken = function () {
        this.access_token = null;
        eraseCookie(this.COOKIE_KEY);
    };
    GitHubAPI.prototype.getUser = function () {
        return this.user;
    };
    // get repo contents, or just check for existence
    GitHubAPI.prototype.getRepo = function (repo) {
        return this.request("/repos/:username/" + repo);
    };
    // fork a repo
    GitHubAPI.prototype.forkRepo = function (_a) {
        var owner = _a.owner, repo = _a.repo;
        return this.request("/repos/" + owner + "/" + repo + "/forks", { method: 'POST' });
    };
    GitHubAPI.prototype.setUser = function () {
        var _this = this;
        return this.request('/user')
            .then(function (user) {
            _this.user = user;
            return user;
        })["catch"](function (err) { return err; });
    };
    GitHubAPI.prototype.getHeaders = function (_a) {
        var _b = _a.headers, headers = _b === void 0 ? {} : _b;
        var options = __assign({ "Content-Type": "application/json" }, headers);
        if (this.access_token) {
            return __assign({}, options, { Authorization: "token " + this.access_token });
        }
        return options;
    };
    GitHubAPI.prototype.request = function (path, options) {
        var _this = this;
        if (path === void 0) { path = ''; }
        if (options === void 0) { options = {}; }
        var assembledPath = this.user ? path.replace(':username', this.user.login) : path;
        return new Promise(function (resolve, reject) {
            var headers = _this.getHeaders({});
            fetch("" + _this.base_url + assembledPath, __assign({ headers: headers }, options))
                .then(function (res) { return res.json(); })
                .then(function (res) { return resolve(res); })["catch"](function (err) { return reject(err); });
        });
    };
    // handle opening new window for github oauth login
    // and hearing message back from that window with the 
    // github access_token. the popup is responsible
    // for the token handshake through the callback param
    // provided which directs to the server and then responds
    // with the access_token which is relayed back to parent window 
    GitHubAPI.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // handle messages received from popup window
            var receiveMessage = function (event) {
                // Do we trust the sender of this message?
                if (event.origin !== window.location.origin) {
                    return;
                }
                // remove the listener as we should only receive one message
                window.removeEventListener('message', receiveMessage, false);
                // close the window
                githubWindow.close();
                // set token and get user deets once, resolve these deets back to caller
                _this.setToken(getTokenFromString(event.data), !!document.querySelector('#login-cbx:checked'))
                    .then(function (user) { return resolve(user); })["catch"](function (err) { return reject(); });
            };
            // listen for messages back from popup
            window.addEventListener("message", receiveMessage, false);
            // open the popup
            var githubWindow = window.open("https://github.com/login/oauth/authorize?client_id=" + "bd4641abb2148c727750" + "&scope=user%20public_repo&redirect_uri=http://localhost:3000/callback", 'GitHubLogin', 'menubar=no,location=yes,resizable=yes,status=yes,width=786,height=534');
        });
    };
    return GitHubAPI;
}());

/**
 * Main API Gateway for handling of
 * auth, github communication
 */
var API = (function (_super) {
    __extends(API, _super);
    function API(config) {
        var _this = _super.call(this, config) || this;
        _this.access_token = config.access_token;
        _this.user = config.user;
        return _this;
    }
    // check if token is present
    API.prototype.hasToken = function () {
        return typeof this.access_token === 'string' && this.access_token !== '';
    };
    API.prototype.getToken = function () {
        return this.access_token;
    };
    API.prototype.post = function (route, data) {
        return new Promise(function (resolve, reject) {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            fetch(route, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data)
            })
                .then(function (res) {
                if (res && res.status === 200) {
                    resolve();
                }
                else {
                    reject('POST CONTENT SAVE FAILURE');
                }
            });
        });
    };
    return API;
}(GitHubAPI));

// Store Service
// Holds all global state for application
function createStore(initialState) {
    if (initialState === void 0) { initialState = {}; }
    // initial state passed in
    var state = initialState;
    // start with no subscribers
    var subscriptions = [];
    // register a subscription from a component
    var subscribe = function (listener) {
        subscriptions.push(listener);
    };
    // de-register a listening component
    var unsubscribe = function (listener) {
        subscriptions.splice(subscriptions.indexOf(listener), 1);
    };
    // get the current state
    var getState = function () {
        return state;
    };
    // updates the state and renders
    var updateState = function (newState) {
        state = Object.assign({}, state, newState);
        // can call subscribers here...
        subscriptions.forEach(function (s) { return s(state); });
    };
    // return API
    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        getState: getState,
        updateState: updateState
    };
}

// components
// services
// see if there is an access token sitting
// in cookies. if so, fetch the users deets
// and construct API with token + deets
AppService.init().then(function (config) {
    var api = new API(config);
    var auth = api.hasToken();
    var initialState = {
        auth: auth,
        user: api.getUser(),
        route: auth ? 'index' : 'login',
        posts: [],
        postToEdit: '',
        appInit: false,
        hasBaseRepo: false
    };
    // init store
    var store = createStore(initialState);
    // render fn
    function renderApp() {
        index_2(index$8(Provider, { api: api, store: store },
            index$8(App, { AppService: AppService },
                index$8(Route, { path: "login", component: Login }),
                index$8(AuthRoute, { path: "index", component: Home }),
                index$8(AuthRoute, { path: "post", component: Form }))), document.getElementById("root"));
    }
    renderApp();
})["catch"](function (err) {
    // TODO: think of graceful error handling here
    // probably should render a spinner into #root
    // and throw any error messages there (fail whale etc.)
    console.error('There was an error initializing the app', err);
});
