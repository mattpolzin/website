#!/usr/bin/env node
class IdrisError extends Error { }

function __prim_js2idris_array(x){
  let acc = { h:0 };

  for (let i = x.length-1; i>=0; i--) {
      acc = { a1:x[i], a2:acc };
  }
  return acc;
}

function __prim_idris2js_array(x){
  const result = Array();
  while (x.h === undefined) {
    result.push(x.a1); x = x.a2;
  }
  return result;
}

function __lazy(thunk) {
  let res;
  return function () {
    if (thunk === undefined) return res;
    res = thunk();
    thunk = undefined;
    return res;
  };
};

function __prim_stringIteratorNew(_str) {
  return 0
}

function __prim_stringIteratorToString(_, str, it, f) {
  return f(str.slice(it))
}

function __prim_stringIteratorNext(str, it) {
  if (it >= str.length)
    return {h: 0};
  else
    return {a1: str.charAt(it), a2: it + 1};
}

function __tailRec(f,ini) {
  let obj = ini;
  while(true){
    switch(obj.h){
      case 0: return obj.a1;
      default: obj = f(obj);
    }
  }
}

const _idrisworld = Symbol('idrisworld')

const _crashExp = x=>{throw new IdrisError(x)}

const _bigIntOfString = s=> {
  try {
    const idx = s.indexOf('.')
    return idx === -1 ? BigInt(s) : BigInt(s.slice(0, idx))
  } catch (e) { return 0n }
}

const _numberOfString = s=> {
  try {
    const res = Number(s);
    return isNaN(res) ? 0 : res;
  } catch (e) { return 0 }
}

const _intOfString = s=> Math.trunc(_numberOfString(s))

const _truncToChar = x=> String.fromCodePoint(
  (x >= 0 && x <= 55295) || (x >= 57344 && x <= 1114111) ? x : 0
)

// Int8
const _truncInt8 = x => {
  const res = x & 0xff;
  return res >= 0x80 ? res - 0x100 : res;
}

const _truncBigInt8 = x => Number(BigInt.asIntN(8, x))

// Euclidian Division
const _div = (a,b) => {
  const q = Math.trunc(a / b)
  const r = a % b
  return r < 0 ? (b > 0 ? q - 1 : q + 1) : q
}

const _divBigInt = (a,b) => {
  const q = a / b
  const r = a % b
  return r < 0n ? (b > 0n ? q - 1n : q + 1n) : q
}

// Euclidian Modulo
const _mod = (a,b) => {
  const r = a % b
  return r < 0 ? (b > 0 ? r + b : r - b) : r
}

const _modBigInt = (a,b) => {
  const r = a % b
  return r < 0n ? (b > 0n ? r + b : r - b) : r
}

const _add8s = (a,b) => _truncInt8(a + b)
const _sub8s = (a,b) => _truncInt8(a - b)
const _mul8s = (a,b) => _truncInt8(a * b)
const _div8s = (a,b) => _truncInt8(_div(a,b))
const _shl8s = (a,b) => _truncInt8(a << b)
const _shr8s = (a,b) => _truncInt8(a >> b)

// Int16
const _truncInt16 = x => {
  const res = x & 0xffff;
  return res >= 0x8000 ? res - 0x10000 : res;
}

const _truncBigInt16 = x => Number(BigInt.asIntN(16, x))

const _add16s = (a,b) => _truncInt16(a + b)
const _sub16s = (a,b) => _truncInt16(a - b)
const _mul16s = (a,b) => _truncInt16(a * b)
const _div16s = (a,b) => _truncInt16(_div(a,b))
const _shl16s = (a,b) => _truncInt16(a << b)
const _shr16s = (a,b) => _truncInt16(a >> b)

//Int32
const _truncInt32 = x => x & 0xffffffff

const _truncBigInt32 = x => Number(BigInt.asIntN(32, x))

const _add32s = (a,b) => _truncInt32(a + b)
const _sub32s = (a,b) => _truncInt32(a - b)
const _div32s = (a,b) => _truncInt32(_div(a,b))

const _mul32s = (a,b) => {
  const res = a * b;
  if (res <= Number.MIN_SAFE_INTEGER || res >= Number.MAX_SAFE_INTEGER) {
    return _truncInt32((a & 0xffff) * b + (b & 0xffff) * (a & 0xffff0000))
  } else {
    return _truncInt32(res)
  }
}

//Int64
const _truncBigInt64 = x => BigInt.asIntN(64, x)

const _add64s = (a,b) => _truncBigInt64(a + b)
const _sub64s = (a,b) => _truncBigInt64(a - b)
const _mul64s = (a,b) => _truncBigInt64(a * b)
const _shl64s = (a,b) => _truncBigInt64(a << b)
const _div64s = (a,b) => _truncBigInt64(_divBigInt(a,b))
const _shr64s = (a,b) => _truncBigInt64(a >> b)

//Bits8
const _truncUInt8 = x => x & 0xff

const _truncUBigInt8 = x => Number(BigInt.asUintN(8, x))

const _add8u = (a,b) => (a + b) & 0xff
const _sub8u = (a,b) => (a - b) & 0xff
const _mul8u = (a,b) => (a * b) & 0xff
const _div8u = (a,b) => Math.trunc(a / b)
const _shl8u = (a,b) => (a << b) & 0xff
const _shr8u = (a,b) => (a >> b) & 0xff

//Bits16
const _truncUInt16 = x => x & 0xffff

const _truncUBigInt16 = x => Number(BigInt.asUintN(16, x))

const _add16u = (a,b) => (a + b) & 0xffff
const _sub16u = (a,b) => (a - b) & 0xffff
const _mul16u = (a,b) => (a * b) & 0xffff
const _div16u = (a,b) => Math.trunc(a / b)
const _shl16u = (a,b) => (a << b) & 0xffff
const _shr16u = (a,b) => (a >> b) & 0xffff

//Bits32
const _truncUBigInt32 = x => Number(BigInt.asUintN(32, x))

const _truncUInt32 = x => {
  const res = x & -1;
  return res < 0 ? res + 0x100000000 : res;
}

const _add32u = (a,b) => _truncUInt32(a + b)
const _sub32u = (a,b) => _truncUInt32(a - b)
const _mul32u = (a,b) => _truncUInt32(_mul32s(a,b))
const _div32u = (a,b) => Math.trunc(a / b)

const _shl32u = (a,b) => _truncUInt32(a << b)
const _shr32u = (a,b) => _truncUInt32(a <= 0x7fffffff ? a >> b : (b == 0 ? a : (a >> b) ^ ((-0x80000000) >> (b-1))))
const _and32u = (a,b) => _truncUInt32(a & b)
const _or32u = (a,b)  => _truncUInt32(a | b)
const _xor32u = (a,b) => _truncUInt32(a ^ b)

//Bits64
const _truncUBigInt64 = x => BigInt.asUintN(64, x)

const _add64u = (a,b) => BigInt.asUintN(64, a + b)
const _mul64u = (a,b) => BigInt.asUintN(64, a * b)
const _div64u = (a,b) => a / b
const _shl64u = (a,b) => BigInt.asUintN(64, a << b)
const _shr64u = (a,b) => BigInt.asUintN(64, a >> b)
const _sub64u = (a,b) => BigInt.asUintN(64, a - b)

//String
const _strReverse = x => x.split('').reverse().join('')

const _substr = (o,l,x) => x.slice(o, o + l)

const support_system_file_fs = require('fs')
const support_system_file_child_process = require('child_process')

function support_system_file_fileErrno(){
  const n = process.__lasterr===undefined?0:process.__lasterr.errno || 0
  if (process.platform == 'win32') {
    // TODO: Add the error codes for the other errors
    switch(n) {
      case -4058: return 2
      case -4075: return 4
      default: return -n
    }
  } else {
    switch(n){
      case -17: return 4
      default: return -n
    }
  }
}

// like `readLine` without the overhead of copying characters.
// returns int (success 0, failure -1) to align with the C counterpart.
function support_system_file_seekLine (file_ptr) {
  const LF = 0x0a
  const readBuf = Buffer.alloc(1)
  let lineEnd = file_ptr.buffer.indexOf(LF)
  while (lineEnd === -1) {
    const bytesRead = support_system_file_fs.readSync(file_ptr.fd, readBuf, 0, 1, null)
    if (bytesRead === 0) {
      file_ptr.eof = true
      file_ptr.buffer = Buffer.alloc(0)
      return 0
    }
    file_ptr.buffer = Buffer.concat([file_ptr.buffer, readBuf.slice(0, bytesRead)])
    lineEnd = file_ptr.buffer.indexOf(LF)
  }
  file_ptr.buffer = file_ptr.buffer.slice(lineEnd + 1)
  return 0
}

function support_system_file_readLine (file_ptr) {
  const LF = 0x0a
  const readBuf = Buffer.alloc(1)
  let lineEnd = file_ptr.buffer.indexOf(LF)
  while (lineEnd === -1) {
    const bytesRead = support_system_file_fs.readSync(file_ptr.fd, readBuf, 0, 1, null)
    if (bytesRead === 0) {
      file_ptr.eof = true
      const line = file_ptr.buffer.toString('utf-8')
      file_ptr.buffer = Buffer.alloc(0)
      return line
    }
    file_ptr.buffer = Buffer.concat([file_ptr.buffer, readBuf.slice(0, bytesRead)])
    lineEnd = file_ptr.buffer.indexOf(LF)
  }
  const line = file_ptr.buffer.slice(0, lineEnd + 1).toString('utf-8')
  file_ptr.buffer = file_ptr.buffer.slice(lineEnd + 1)
  return line
}

function support_system_file_getStr () {
  return support_system_file_readLine({ fd: 0, buffer: Buffer.alloc(0), name: '<stdin>', eof: false })
}

function support_system_file_getChar() {
  const readBuf = Buffer.alloc(1);
  if (support_system_file_fs.readSync(process.stdin.fd, readBuf, 0, 1) === 0) {
    // No bytes read, getChar from libc returns -1 in this case.
    return String.fromCharCode(-1)
  } else {
    return readBuf.toString('utf-8')
  }
}

function support_system_file_parseMode(mode) {
  return mode.replace('b', '')
}

function support_system_file_openFile (n, m) {
  try {
    const fd = support_system_file_fs.openSync(n, support_system_file_parseMode(m))
    return { fd: fd, buffer: Buffer.alloc(0), name: n, eof: false }
  } catch (e) {
    process.__lasterr = e
    return null
  }
}

function support_system_file_chmod (filename, mode) {
  try {
    support_system_file_fs.chmodSync(filename, mode)
    return 0
  } catch (e) {
    process.__lasterr = e
    return 1
  }
}

function support_system_file_removeFile (filename) {
  try {
    support_system_file_fs.unlinkSync(filename)
    return 0
  } catch (e) {
    process.__lasterr = e
    return 1
  }
}

// IMPLEMENTATION NOTE:
// If in the future Idris's NodeJS backend supports executing async code, the
// far superior and more true-to-C way to implement popen/pclose would be to
// spawn in popen (instead of spawnSync) and then in pclose await the processes
// completion.
//
// Note doing the above makes it impossible to support the use-case for popen of
// writing to the child process's stdin between popen and pclose.
function support_system_file_popen (cmd, m) {
  const mode = support_system_file_parseMode(m)
  if (mode != 'r') {
    process.__lasterr = 'The NodeJS popen FFI only supports opening for reading currently.'
    return null
  }

  const tmp_file = require('os').tmpdir() + "/" + require('crypto').randomBytes(15).toString('hex')
  const write_fd = support_system_file_fs.openSync(
    tmp_file,
    'w'
  )

  var io_setting
  switch (mode) {
    case "r":
      io_setting = ['ignore', write_fd, 2]
      break
    case "w": 
    case "a":
      io_setting = [write_fd, 'ignore', 2]
      break
    default:
      process.__lasterr = 'The popen function cannot be used for reading and writing simultaneously.'
      return null
  }

  const { status, error  } = support_system_file_child_process.spawnSync(
    cmd,
    [],
    { stdio: io_setting, shell: true }
  )

  support_system_file_fs.closeSync(write_fd)

  if (error) {
    process.__lasterr = error
    return null
  }

  const read_ptr = support_system_file_openFile(
    tmp_file,
    'r'
  )

  return { ...read_ptr, exit_code: status }
}

function support_system_file_pclose (file_ptr) {
  const { fd, name, exit_code } = file_ptr
  support_system_file_fs.closeSync(fd)
  support_system_file_removeFile(name)
  return exit_code
}

function support_system_file_filetime(file_ptr) {
  const {fd, name, exit_code} = file_ptr
  const st = support_system_file_fs.fstatSync(fd)
  const ft = {
    atime_sec : _truncInt32(Math.trunc(st.atimeMs / 1000)),
    atime_nsec : st.atimeMs * 1000000 % 1000000000,
    mtime_sec : _truncInt32(Math.trunc(st.mtimeMs / 1000)),
    mtime_nsec : st.mtimeMs * 1000000 % 1000000000,
    ctime_sec : _truncInt32(Math.trunc(st.ctimeMs / 1000)),
    ctime_nsec : st.mtimeMs * 1000000 % 1000000000
  };
  return ft
}

const System_File_Virtual_prim__stdin = (x=>({fd:0, buffer: Buffer.alloc(0), name:'<stdin>', eof: false}));
const Prelude_Types_fastUnpack = ((str)=>__prim_js2idris_array(Array.from(str)));
const Prelude_Types_fastPack = ((xs)=>__prim_idris2js_array(xs).join(''));
const Prelude_IO_prim__putStr = (x=>process.stdout.write(x));
const Prelude_IO_prim__getString = (x=>x);
const PrimIO_prim__nullAnyPtr = (x=>x===undefined||x===null?1:0);
const System_File_ReadWrite_prim__readLine = support_system_file_readLine;
const System_FFI_prim__free = (()=>undefined);
const System_File_Error_prim__fileErrno = support_system_file_fileErrno;
const System_File_Error_prim__error = (x=>(x===1?1:0));
const System_prim__getArgCount = (() => process.argv.length - 1);
const System_prim__getArg = (n => process.argv[n + 1]);
/* {$tcOpt:1} */
function x24tcOpt_1($0) {
 switch($0.a2.h) {
  case 0: /* Leaf */ return {h: 0 /* {TcDone:1} */, a1: $0.a1({a1: $0.a2.a1, a2: $0.a2.a2})};
  case 1: /* Branch2 */ return {h: 1 /* {TcContinue1:1} */, a1: $9 => ({a1: $9, a2: Data_SortedMap_Dependent_n__6841_6801_treeToListx27($0.a1, $0.a2.a3)}), a2: $0.a2.a1};
  case 2: /* Branch3 */ return {h: 1 /* {TcContinue1:1} */, a1: $11 => ({a1: $11, a2: Data_SortedMap_Dependent_n__6841_6801_treeToListx27($16 => ({a1: $16, a2: Data_SortedMap_Dependent_n__6841_6801_treeToListx27($0.a1, $0.a2.a5)}), $0.a2.a3)}), a2: $0.a2.a1};
 }
}

/* Data.SortedMap.Dependent.6841:6801:treeToList' */
function Data_SortedMap_Dependent_n__6841_6801_treeToListx27($0, $1) {
 return __tailRec(x24tcOpt_1, {h: 1 /* {TcContinue1:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:2} */
function x24tcOpt_2($0) {
 switch($0.a2) {
  case 0n: return {h: 0 /* {TcDone:2} */, a1: $0.a1};
  default: {
   const $4 = ($0.a2-1n);
   return {h: 1 /* {TcContinue2:1} */, a1: {a1: $0.a3, a2: $0.a1}, a2: $4, a3: $0.a3};
  }
 }
}

/* Data.List.replicateTR : List a -> Nat -> a -> List a */
function Data_List_replicateTR($0, $1, $2) {
 return __tailRec(x24tcOpt_2, {h: 1 /* {TcContinue2:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:3} */
function x24tcOpt_3($0) {
 switch($0.a1.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:3} */, a1: {a1: $0.a2}};
  case undefined: /* cons */ {
   let $5;
   switch(Prelude_EqOrd_x3ex3d_Ord_Char($0.a1.a1, '0')) {
    case 1: {
     $5 = Prelude_EqOrd_x3cx3d_Ord_Char($0.a1.a1, '9');
     break;
    }
    case 0: {
     $5 = 0;
     break;
    }
   }
   switch($5) {
    case 1: return {h: 1 /* {TcContinue3:1} */, a1: $0.a1.a2, a2: (($0.a2*10n)+BigInt(_sub32s(_truncInt32($0.a1.a1.codePointAt(0)), _truncInt32('0'.codePointAt(0)))))};
    case 0: return {h: 0 /* {TcDone:3} */, a1: {h: 0}};
   }
  }
 }
}

/* Data.String.parseNumWithoutSign : List Char -> Integer -> Maybe Integer */
function Data_String_parseNumWithoutSign($0, $1) {
 return __tailRec(x24tcOpt_3, {h: 1 /* {TcContinue3:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:4} */
function x24tcOpt_4($0) {
 switch($0.a1) {
  case '': {
   switch($0.a2.h) {
    case 0: /* Nil */ return {h: 0 /* {TcDone:4} */, a1: ''};
    default: {
     const $6 = ($0.a2.a1+$0.a2.a2);
     switch(Prelude_Types_isSpace($0.a2.a1)) {
      case 1: return {h: 1 /* {TcContinue4:1} */, a1: $0.a2.a2, a2: $0.a2.a3()};
      case 0: return {h: 0 /* {TcDone:4} */, a1: $6};
     }
    }
   }
  }
  default: {
   const $11 = ($0.a2.a1+$0.a2.a2);
   switch(Prelude_Types_isSpace($0.a2.a1)) {
    case 1: return {h: 1 /* {TcContinue4:1} */, a1: $0.a2.a2, a2: $0.a2.a3()};
    case 0: return {h: 0 /* {TcDone:4} */, a1: $11};
   }
  }
 }
}

/* Data.String.with block in ltrim */
function Data_String_with__ltrim_9542($0, $1) {
 return __tailRec(x24tcOpt_4, {h: 1 /* {TcContinue4:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:5} */
function x24tcOpt_5($0) {
 switch($0.a1) {
  case 0n: return {h: 0 /* {TcDone:5} */, a1: 1};
  default: {
   switch($0.a2) {
    case 0n: return {h: 0 /* {TcDone:5} */, a1: 0};
    default: {
     switch($0.a1) {
      case 0n: _crashExp('Nat case not covered');
      default: {
       const $7 = ($0.a1-1n);
       switch($0.a2) {
        case 0n: _crashExp('Nat case not covered');
        default: {
         const $b = ($0.a2-1n);
         return {h: 1 /* {TcContinue5:1} */, a1: $7, a2: $b};
        }
       }
      }
     }
    }
   }
  }
 }
}

/* Data.Nat.lte : Nat -> Nat -> Bool */
function Data_Nat_lte($0, $1) {
 return __tailRec(x24tcOpt_5, {h: 1 /* {TcContinue5:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:6} */
function x24tcOpt_6($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ return {h: 1 /* {TcContinue6:1} */, a1: {a1: $0.a1, a2: $0.a2($0.a3.a1)}, a2: $0.a2, a3: $0.a3.a2};
  case 0: /* nil */ return {h: 0 /* {TcDone:6} */, a1: Prelude_Types_SnocList_x3cx3ex3e($0.a1, {h: 0})};
 }
}

/* Prelude.Types.List.mapAppend : SnocList b -> (a -> b) -> List a -> List b */
function Prelude_Types_List_mapAppend($0, $1, $2) {
 return __tailRec(x24tcOpt_6, {h: 1 /* {TcContinue6:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:7} */
function x24tcOpt_7($0) {
 switch($0.a3.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:7} */, a1: $0.a2};
  case undefined: /* cons */ return {h: 1 /* {TcContinue7:1} */, a1: $0.a1, a2: $0.a1($0.a2)($0.a3.a1), a3: $0.a3.a2};
 }
}

/* Prelude.Types.foldl */
function Prelude_Types_foldl_Foldable_List($0, $1, $2) {
 return __tailRec(x24tcOpt_7, {h: 1 /* {TcContinue7:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:8} */
function x24tcOpt_8($0) {
 switch($0.a1) {
  case 0n: return {h: 0 /* {TcDone:8} */, a1: $0.a2};
  default: {
   const $4 = ($0.a1-1n);
   switch($0.a2.h) {
    case 0: /* nil */ return {h: 0 /* {TcDone:8} */, a1: {h: 0}};
    case undefined: /* cons */ return {h: 1 /* {TcContinue8:1} */, a1: $4, a2: $0.a2.a2};
   }
  }
 }
}

/* Data.List.drop : Nat -> List a -> List a */
function Data_List_drop($0, $1) {
 return __tailRec(x24tcOpt_8, {h: 1 /* {TcContinue8:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:9} */
function x24tcOpt_9($0) {
 switch($0.a1.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:9} */, a1: $0.a2};
  case undefined: /* cons */ return {h: 1 /* {TcContinue9:1} */, a1: $0.a1.a1, a2: {a1: $0.a1.a2, a2: $0.a2}};
 }
}

/* Prelude.Types.SnocList.(<>>) : SnocList a -> List a -> List a */
function Prelude_Types_SnocList_x3cx3ex3e($0, $1) {
 return __tailRec(x24tcOpt_9, {h: 1 /* {TcContinue9:1} */, a1: $0, a2: $1});
}

/* {__mainExpression:0} */
function __mainExpression_0() {
 return PrimIO_unsafePerformIO($2 => Main_main($2));
}

/* {csegen:0} */
const csegen_0 = __lazy(function () {
 return $0 => $1 => ($0+$1);
});

/* {csegen:1} */
const csegen_1 = __lazy(function () {
 return $0 => $1 => ($0*$1);
});

/* {csegen:2} */
const csegen_2 = __lazy(function () {
 return {a1: csegen_0(), a2: csegen_1(), a3: $5 => Prelude_Types_prim__integerToNat($5)};
});

/* {csegen:6} */
const csegen_6 = __lazy(function () {
 return {a1: $1 => $2 => ($1+$2), a2: ''};
});

/* {csegen:21} */
const csegen_21 = __lazy(function () {
 return {a1: acc => elem => func => init => input => Prelude_Types_foldr_Foldable_List(func, init, input), a2: elem => acc => func => init => input => Prelude_Types_foldl_Foldable_List(func, init, input), a3: elem => $b => Prelude_Types_null_Foldable_List($b), a4: elem => acc => m => $f => funcM => init => input => Prelude_Types_foldlM_Foldable_List($f, funcM, init, input), a5: elem => $16 => $16, a6: a => m => $18 => f => $19 => Prelude_Types_foldMap_Foldable_List($18, f, $19)};
});

/* {csegen:37} */
const csegen_37 = __lazy(function () {
 const $c = b => a => $d => $e => $f => {
  const $10 = $d($f);
  const $13 = $e($f);
  return $10($13);
 };
 const $1 = {a1: b => a => func => $3 => $4 => Prelude_IO_map_Functor_IO(func, $3, $4), a2: a => $a => $b => $a, a3: $c};
 const $18 = b => a => $19 => $1a => $1b => {
  const $1c = $19($1b);
  return $1a($1c)($1b);
 };
 const $23 = a => $24 => $25 => {
  const $26 = $24($25);
  return $26($25);
 };
 const $0 = {a1: $1, a2: $18, a3: $23};
 return {a1: $0, a2: a => $2c => $2c};
});

/* {csegen:54} */
const csegen_54 = __lazy(function () {
 return {a1: $1 => $2 => _add32s($1, $2), a2: $6 => $7 => _mul32s($6, $7), a3: $b => Number(_truncBigInt32($b))};
});

/* prim__sub_Integer : Integer -> Integer -> Integer */
function prim__sub_Integer($0, $1) {
 return ($0-$1);
}

/* Main.with block in renderSequence */
function Main_with__renderSequence_6850($0, $1, $2) {
 switch($1.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ return Prelude_Types_foldl_Foldable_List($6 => $7 => Main_n__6418_6859_renderToNextLane($1.a1, $1.a2, $2, $0, 0, $1.a1.a1, $6, $7), {h: 0}, {a1: $1.a1, a2: $1.a2});
 }
}

/* Main.case block in case block in readIn,read */
function Main_case__casex20blockx20inx20readInx2cread_7213($0, $1, $2, $3, $4) {
 switch($4.h) {
  case undefined: /* cons */ {
   switch($4.a2.h) {
    case undefined: /* cons */ {
     const $7 = Data_String_parsePositive(csegen_2(), $4.a1);
     switch($7.h) {
      case undefined: /* just */ {
       const $c = Data_String_parsePositive(csegen_2(), $4.a2.a1);
       switch($c.h) {
        case undefined: /* just */ return $0.a1.a1.a2(undefined)({a1: Main_abs($7.a1, $c.a1, Builtin_fst(Data_String_break$($21 => Prelude_EqOrd_x3dx3d_Eq_Char($21, '\n'), Data_String_unwords($4.a2.a2))))});
        default: return $0.a1.a1.a2(undefined)({h: 0});
       }
      }
      default: return $0.a1.a1.a2(undefined)({h: 0});
     }
    }
    default: return $0.a1.a1.a2(undefined)({h: 0});
   }
  }
  default: return $0.a1.a1.a2(undefined)({h: 0});
 }
}

/* Main.6418:6859:renderToNextLane */
function Main_n__6418_6859_renderToNextLane($0, $1, $2, $3, $4, $5, $6, $7) {
 switch($6.h) {
  case 0: /* nil */ return {a1: {a1: Main_renderProclevity($4, Prelude_Types_prim__integerToNat(($7.a1-$5)), $2, $7), a2: Main_effectiveEndYear($4, $7)}, a2: {h: 0}};
  case undefined: /* cons */ return Prelude_Types_maybe(() => ({a1: $6.a1, a2: Main_n__6418_6859_renderToNextLane($0, $1, $2, $3, 1, $5, $6.a2, $7)}), () => $28 => ({a1: $28, a2: $6.a2}), Main_n__6418_6858_renderToLane($0, $1, $2, $3, $4, $5, $7, $6.a1));
 }
}

/* Main.6418:6858:renderToLane */
function Main_n__6418_6858_renderToLane($0, $1, $2, $3, $4, $5, $6, $7) {
 switch(Prelude_Types_x3e_Ord_Nat(($6.a1*Main_timelineMultiplier()), $7.a2)) {
  case 1: return {a1: {a1: ($7.a1+Main_renderProclevity($4, Prelude_Types_prim__integerToNat((Prelude_Types_prim__integerToNat(($6.a1-$5))-Data_Nat_divNat(Main_length($7), Main_timelineMultiplier()))), $2, $6)), a2: Main_effectiveEndYear($4, $6)}};
  case 0: return {h: 0};
 }
}

/* Main.5663:6221:renderLaneSplit */
function Main_n__5663_6221_renderLaneSplit($0, $1, $2, $3, $4, $5) {
 switch($5) {
  case 1: return Main_divergence();
  case 2: return Main_terminus();
  case 0: return '';
 }
}

/* Main.5663:6220:renderLaneJoin */
function Main_n__5663_6220_renderLaneJoin($0, $1, $2, $3, $4, $5) {
 switch($4) {
  case 2: return Main_continuance();
  case 1: return Main_convergence();
  case 0: return '';
 }
}

/* Main.6714:7169:read */
function Main_n__6714_7169_read($0, $1) {
 const $f = $10 => {
  switch($10.h) {
   case 1: /* Right */ {
    const $12 = {h: 1 /* Right */, a1: $10.a1};
    return Main_case__casex20blockx20inx20readInx2cread_7213($0, $1, $10.a1, $12, Data_String_split($1c => Prelude_EqOrd_x3dx3d_Eq_Char($1c, ' '), $10.a1));
   }
   default: return $0.a1.a1.a2(undefined)({h: 0});
  }
 };
 return $0.a1.a2(undefined)(undefined)(System_File_ReadWrite_fGetLine($0, System_File_Virtual_stdin()))($f);
}

/* Main.6355:6805:divergenceLen */
function Main_n__6355_6805_divergenceLen($0, $1, $2, $3) {
 switch($3) {
  case 1: return Main_headLength();
  case 0: return 0n;
 }
}

/* Main.show */
function Main_show_Show_Lane($0) {
 return $0.a1;
}

/* Main.min */
function Main_min_Ord_Proclevity($0, $1) {
 switch(Main_x3c_Ord_Proclevity($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Main.max */
function Main_max_Ord_Proclevity($0, $1) {
 switch(Main_x3e_Ord_Proclevity($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Main.compare */
function Main_compare_Ord_Proclevity($0, $1) {
 switch((($0.a1===$1.a1)?1:0)) {
  case 1: {
   switch((($0.a2===$1.a2)?1:0)) {
    case 1: return Prelude_EqOrd_compare_Ord_String($0.a3, $1.a3);
    case 0: return Prelude_EqOrd_compare_Ord_Integer($1.a2, $0.a2);
   }
  }
  case 0: return Prelude_EqOrd_compare_Ord_Integer($0.a1, $1.a1);
 }
}

/* Main.> */
function Main_x3e_Ord_Proclevity($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Main_compare_Ord_Proclevity($0, $1), 2);
}

/* Main.>= */
function Main_x3ex3d_Ord_Proclevity($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Main_compare_Ord_Proclevity($0, $1), 0);
}

/* Main.Tail.== */
function Main_Tail_x3dx3d_Eq_Tail($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 2: {
   switch($1) {
    case 2: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Main.== */
function Main_x3dx3d_Eq_Proclevity($0, $1) {
 switch((($0.a1===$1.a1)?1:0)) {
  case 1: {
   switch((($0.a2===$1.a2)?1:0)) {
    case 1: return Prelude_EqOrd_x3dx3d_Eq_String($0.a3, $1.a3);
    case 0: return 0;
   }
  }
  case 0: return 0;
 }
}

/* Main.Head.== */
function Main_Head_x3dx3d_Eq_Head($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 2: {
   switch($1) {
    case 2: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Main.< */
function Main_x3c_Ord_Proclevity($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Main_compare_Ord_Proclevity($0, $1), 0);
}

/* Main.<= */
function Main_x3cx3d_Ord_Proclevity($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Main_compare_Ord_Proclevity($0, $1), 2);
}

/* Main./= */
function Main_x2fx3d_Eq_Proclevity($0, $1) {
 switch(Main_x3dx3d_Eq_Proclevity($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Main.timelineMultiplier : Nat */
const Main_timelineMultiplier = __lazy(function () {
 return 6n;
});

/* Main.timeline : Char */
const Main_timeline = __lazy(function () {
 return '\u{2500}';
});

/* Main.terminus : String */
const Main_terminus = __lazy(function () {
 return '\u{25c9}\u{2500}';
});

/* Main.tailLength : Nat */
const Main_tailLength = __lazy(function () {
 return Prelude_Types_String_length(Main_convergence());
});

/* Main.renderedTitle : String -> String */
function Main_renderedTitle($0) {
 return Prelude_Types_foldMap_Foldable_List(csegen_6(), $5 => $5, {a1: '| ', a2: {a1: $0, a2: {a1: ' |', a2: {h: 0}}}});
}

/* Main.renderSequence : Nat -> SortedSet Proclevity -> List Lane */
function Main_renderSequence($0, $1) {
 return Main_with__renderSequence_6850($1, Data_SortedSet_toList($1), $0);
}

/* Main.renderProclevity : Bool -> Nat -> Nat -> Proclevity -> String */
function Main_renderProclevity($0, $1, $2, $3) {
 const $5 = Main_renderedTitle($3.a3);
 const $8 = ($1*Main_timelineMultiplier());
 const $c = Prelude_Types_prim__integerToNat((($3.a2*Main_timelineMultiplier())-Prelude_Types_String_length($5)));
 let $16;
 switch(Prelude_Types_x3c_Ord_Nat($c, Main_headLength())) {
  case 1: {
   $16 = 0;
   break;
  }
  case 0: {
   switch($0) {
    case 1: {
     $16 = 1;
     break;
    }
    case 0: {
     $16 = 2;
     break;
    }
   }
   break;
  }
 }
 let $1d;
 switch(Prelude_Types_x3c_Ord_Nat($c, (Main_headLength()+Main_tailLength()))) {
  case 1: {
   $1d = 0;
   break;
  }
  case 0: {
   switch(Prelude_Types_x3e_Ord_Nat(($3.a1+$3.a2), $2)) {
    case 1: {
     $1d = 2;
     break;
    }
    case 0: {
     switch($0) {
      case 1: {
       $1d = 1;
       break;
      }
      case 0: {
       $1d = 0;
       break;
      }
     }
     break;
    }
   }
   break;
  }
 }
 const $2d = Data_Nat_divNat($c, 2n);
 const $31 = Prelude_Types_prim__integerToNat(($c-$2d));
 let $36;
 switch(Main_Head_x3dx3d_Eq_Head($16, 0)) {
  case 1: {
   $36 = $2d;
   break;
  }
  case 0: {
   $36 = Prelude_Types_prim__integerToNat(($2d-Main_headLength()));
   break;
  }
 }
 let $40;
 switch(Main_Tail_x3dx3d_Eq_Tail($1d, 0)) {
  case 1: {
   $40 = $31;
   break;
  }
  case 0: {
   $40 = Prelude_Types_prim__integerToNat(($31-Prelude_Types_prim__integerToNat(((Main_headLength()+Main_tailLength())-Prelude_Types_prim__integerToNat(($2d-$36))))));
   break;
  }
 }
 return Main_render($16, $1d, $8, $36, $40, $3.a3);
}

/* Main.render : Head -> Tail -> Nat -> Nat -> Nat -> String -> String */
function Main_render($0, $1, $2, $3, $4, $5) {
 return Data_String_indent($2, (Main_n__5663_6221_renderLaneSplit($5, $4, $3, $2, $1, $0)+(Data_String_replicate($3, Main_timeline())+(Main_renderedTitle($5)+(Data_String_replicate($4, Main_timeline())+Main_n__5663_6220_renderLaneJoin($5, $4, $3, $2, $1, $0))))));
}

/* Main.readIn : HasIO io => Fuel -> io (List Proclevity) */
function Main_readIn($0, $1) {
 switch($1.h) {
  case 0: /* nothing */ return $0.a1.a1.a2(undefined)({h: 0});
  case undefined: /* just */ {
   const $16 = $17 => {
    switch($17.h) {
     case undefined: /* just */ return $0.a1.a2(undefined)(undefined)(Main_readIn($0, $1.a1()))($27 => $0.a1.a1.a2(undefined)({a1: $17.a1, a2: $27}));
     default: return $0.a1.a1.a2(undefined)({h: 0});
    }
   };
   return $0.a1.a2(undefined)(undefined)(Main_n__6714_7169_read($0, $1.a1))($16);
  }
 }
}

/* Main.printToTerminal : HasIO io => Nat -> SortedSet Proclevity -> io () */
function Main_printToTerminal($0, $1, $2) {
 return Prelude_Interfaces_traverse_($0.a1.a1, csegen_21(), $a => $0.a2(undefined)($10 => Prelude_IO_prim__putStr((Main_show_Show_Lane($a)+'\n'), $10)), Main_renderSequence($1, $2));
}

/* Main.printToHTML : HasIO io => Nat -> SortedSet Proclevity -> io () */
function Main_printToHTML($0, $1, $2) {
 const $3 = Prelude_Types_foldMap_Foldable_List(csegen_6(), $8 => $8, Data_List_intersperse('<br/>', Prelude_Types_List_mapAppend({h: 0}, $10 => Main_show_Show_Lane($10), Main_renderSequence($1, $2))));
 return $0.a2(undefined)($1c => Prelude_IO_prim__putStr((Prelude_Types_foldMap_Foldable_List(csegen_6(), $24 => $24, {a1: '<html style=\"font-family: Monospace; height: 100%; overflow: hidden;\">\n<head>\n  <meta charset=\"utf-8\">\n  <link rel=\"stylesheet\" href=\"https://unpkg.com/@picocss/pico@latest/css/pico.classless.min.css\">\n</head>\n<body style=\"height: 100%;\">\n  <div style=\"white-space: pre; line-height: 2em; padding: 2em; overflow-x: scroll; height: 100%;\">', a2: {a1: $3, a2: {a1: '</div>\n</body>\n</html>', a2: {h: 0}}}})+'\n'), $1c));
}

/* Main.parseArgs : List String -> (Year, Output) */
function Main_parseArgs($0) {
 switch($0.h) {
  case 0: /* nil */ return {a1: 2024n, a2: 0};
  case undefined: /* cons */ {
   switch($0.a1) {
    case 'html': {
     const $5 = Main_parseArgs($0.a2);
     return {a1: $5.a1, a2: 1};
    }
    default: {
     const $a = Main_parseArgs($0.a2);
     return {a1: Prelude_Types_maybe(() => 0n, () => $11 => Prelude_Types_prim__integerToNat($11), Data_String_parsePositive({a1: csegen_0(), a2: csegen_1(), a3: $1c => $1c}, $0.a1)), a2: $a.a2};
    }
   }
  }
 }
}

/* Main.main : IO () */
function Main_main($0) {
 const $1 = Prelude_IO_map_Functor_IO($4 => Data_List_drop(1n, $4), System_getArgs(csegen_37()), $0);
 const $d = Main_parseArgs($1);
 const $10 = Main_readIn(csegen_37(), Data_Fuel_limit(50n))($0);
 const $19 = Data_SortedSet_fromList({a1: {a1: $1e => $1f => Main_x3dx3d_Eq_Proclevity($1e, $1f), a2: $24 => $25 => Main_x2fx3d_Eq_Proclevity($24, $25)}, a2: $2a => $2b => Main_compare_Ord_Proclevity($2a, $2b), a3: $30 => $31 => Main_x3c_Ord_Proclevity($30, $31), a4: $36 => $37 => Main_x3e_Ord_Proclevity($36, $37), a5: $3c => $3d => Main_x3cx3d_Ord_Proclevity($3c, $3d), a6: $42 => $43 => Main_x3ex3d_Ord_Proclevity($42, $43), a7: $48 => $49 => Main_max_Ord_Proclevity($48, $49), a8: $4e => $4f => Main_min_Ord_Proclevity($4e, $4f)}, $10);
 switch($d.a2) {
  case 0: return Main_printToTerminal(csegen_37(), $d.a1, $19)($0);
  case 1: return Main_printToHTML(csegen_37(), $d.a1, $19)($0);
 }
}

/* Main.length : Lane -> Nat */
function Main_length($0) {
 return Prelude_Types_String_length($0.a1);
}

/* Main.headLength : Nat */
const Main_headLength = __lazy(function () {
 return Prelude_Types_String_length(Main_divergence());
});

/* Main.effectiveEndYear : Bool -> Proclevity -> Nat */
function Main_effectiveEndYear($0, $1) {
 return Prelude_Types_max_Ord_Nat((($1.a1+$1.a2)*Main_timelineMultiplier()), ((($1.a1*Main_timelineMultiplier())+Prelude_Types_String_length(Main_renderedTitle($1.a3)))+Main_n__6355_6805_divergenceLen($1.a3, $1.a2, $1.a1, $0)));
}

/* Main.divergence : String */
const Main_divergence = __lazy(function () {
 return '\u{2570}\u{2500}';
});

/* Main.convergence : String */
const Main_convergence = __lazy(function () {
 return '\u{2500}\u{25c9}';
});

/* Main.continuance : String */
const Main_continuance = __lazy(function () {
 return '\u{2500}\u{2508}';
});

/* Main.abs : Nat -> Nat -> String -> Proclevity */
function Main_abs($0, $1, $2) {
 return {a1: $0, a2: Prelude_Types_prim__integerToNat(($1-$0)), a3: $2};
}

/* System.File.Virtual.stdin : File */
const System_File_Virtual_stdin = __lazy(function () {
 return System_File_Virtual_prim__stdin();
});

/* Prelude.Basics.uncurry : (a -> b -> c) -> (a, b) -> c */
function Prelude_Basics_uncurry($0, $1) {
 return $0($1.a1)($1.a2);
}

/* Prelude.Basics.flip : (a -> b -> c) -> b -> a -> c */
function Prelude_Basics_flip($0, $1, $2) {
 return $0($2)($1);
}

/* Builtin.snd : (a, b) -> b */
function Builtin_snd($0) {
 return $0.a2;
}

/* Builtin.fst : (a, b) -> a */
function Builtin_fst($0) {
 return $0.a1;
}

/* Prelude.Types.traverse */
function Prelude_Types_traverse_Traversable_List($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return $0.a2(undefined)({h: 0});
  case undefined: /* cons */ return $0.a3(undefined)(undefined)($0.a3(undefined)(undefined)($0.a2(undefined)($1e => $1f => ({a1: $1e, a2: $1f})))($1($2.a1)))(Prelude_Types_traverse_Traversable_List($0, $1, $2.a2));
 }
}

/* Prelude.Types.rangeFromTo */
function Prelude_Types_rangeFromTo_Range_x24a($0, $1, $2) {
 const $4 = Builtin_fst(Builtin_snd($0));
 const $3 = $4.a2($1)($2);
 switch($3) {
  case 0: {
   const $e = $f => {
    const $10 = Builtin_fst(Builtin_snd($0));
    return $10.a6($f)($2);
   };
   const $1c = $1d => {
    const $1e = Builtin_snd(Builtin_snd($0));
    const $28 = Builtin_snd(Builtin_snd($0));
    const $27 = $28.a1.a3(1n);
    return $1e.a1.a1($1d)($27);
   };
   const $19 = Prelude_Types_countFrom($1, $1c);
   return Prelude_Types_takeUntil($e, $19);
  }
  case 1: return Prelude_Types_pure_Applicative_List($1);
  case 2: {
   const $33 = $34 => {
    const $35 = Builtin_fst(Builtin_snd($0));
    return $35.a5($34)($2);
   };
   const $41 = x => {
    const $42 = Builtin_snd(Builtin_snd($0));
    const $4b = Builtin_snd(Builtin_snd($0));
    const $4a = $4b.a1.a3(1n);
    return $42.a3(x)($4a);
   };
   const $3e = Prelude_Types_countFrom($1, $41);
   return Prelude_Types_takeUntil($33, $3e);
  }
 }
}

/* Prelude.Types.pure */
function Prelude_Types_pure_Applicative_List($0) {
 return {a1: $0, a2: {h: 0}};
}

/* Prelude.Types.null */
function Prelude_Types_null_Foldable_List($0) {
 switch($0.h) {
  case 0: /* nil */ return 1;
  case undefined: /* cons */ return 0;
 }
}

/* Prelude.Types.max */
function Prelude_Types_max_Ord_Nat($0, $1) {
 switch(Prelude_Types_x3e_Ord_Nat($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.Types.map */
function Prelude_Types_map_Functor_Maybe($0, $1) {
 switch($1.h) {
  case undefined: /* just */ return {a1: $0($1.a1)};
  case 0: /* nothing */ return {h: 0};
 }
}

/* Prelude.Types.foldr */
function Prelude_Types_foldr_Foldable_List($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return $1;
  case undefined: /* cons */ return $0($2.a1)(Prelude_Types_foldr_Foldable_List($0, $1, $2.a2));
 }
}

/* Prelude.Types.foldlM */
function Prelude_Types_foldlM_Foldable_List($0, $1, $2, $3) {
 return Prelude_Types_foldl_Foldable_List(ma => b => $0.a2(undefined)(undefined)(ma)($f => Prelude_Basics_flip($1, b, $f)), $0.a1.a2(undefined)($2), $3);
}

/* Prelude.Types.foldMap */
function Prelude_Types_foldMap_Foldable_List($0, $1, $2) {
 return Prelude_Types_foldl_Foldable_List(acc => elem => $0.a1(acc)($1(elem)), $0.a2, $2);
}

/* Prelude.Types.> */
function Prelude_Types_x3e_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 2);
}

/* Prelude.Types.< */
function Prelude_Types_x3c_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 0);
}

/* Prelude.Types.takeUntil : (n -> Bool) -> Stream n -> List n */
function Prelude_Types_takeUntil($0, $1) {
 switch($0($1.a1)) {
  case 1: return {a1: $1.a1, a2: {h: 0}};
  case 0: return {a1: $1.a1, a2: Prelude_Types_takeUntil($0, $1.a2())};
 }
}

/* Prelude.Types.prim__integerToNat : Integer -> Nat */
function Prelude_Types_prim__integerToNat($0) {
 switch(((0n<=$0)?1:0)) {
  case 0: return 0n;
  default: return $0;
 }
}

/* Prelude.Types.maybe : Lazy b -> Lazy (a -> b) -> Maybe a -> b */
function Prelude_Types_maybe($0, $1, $2) {
 switch($2.h) {
  case 0: /* nothing */ return $0();
  case undefined: /* just */ return $1()($2.a1);
 }
}

/* Prelude.Types.String.length : String -> Nat */
function Prelude_Types_String_length($0) {
 return Prelude_Types_prim__integerToNat(BigInt($0.length));
}

/* Prelude.Types.isSpace : Char -> Bool */
function Prelude_Types_isSpace($0) {
 switch($0) {
  case ' ': return 1;
  case '\u{9}': return 1;
  case '\r': return 1;
  case '\n': return 1;
  case '\u{c}': return 1;
  case '\u{b}': return 1;
  case '\u{a0}': return 1;
  default: return 0;
 }
}

/* Prelude.Types.countFrom : n -> (n -> n) -> Stream n */
function Prelude_Types_countFrom($0, $1) {
 return {a1: $0, a2: () => Prelude_Types_countFrom($1($0), $1)};
}

/* Prelude.Num.mod */
function Prelude_Num_mod_Integral_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($1, Number(_truncBigInt32(0n)))) {
  case 0: return _mod($0, $1);
  default: return _crashExp('Unhandled input for Prelude.Num.case block in mod at Prelude.Num:131:3--133:40');
 }
}

/* Prelude.Num.div */
function Prelude_Num_div_Integral_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($1, Number(_truncBigInt32(0n)))) {
  case 0: return _div32s($0, $1);
  default: return _crashExp('Unhandled input for Prelude.Num.case block in div at Prelude.Num:128:3--130:40');
 }
}

/* Prelude.EqOrd.min */
function Prelude_EqOrd_min_Ord_Int($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Int($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.EqOrd.max */
function Prelude_EqOrd_max_Ord_Int($0, $1) {
 switch(Prelude_EqOrd_x3e_Ord_Int($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.EqOrd.compare */
function Prelude_EqOrd_compare_Ord_String($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_String($0, $1)) {
  case 1: return 0;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_String($0, $1)) {
    case 1: return 1;
    case 0: return 2;
   }
  }
 }
}

/* Prelude.EqOrd.compare */
function Prelude_EqOrd_compare_Ord_Integer($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Integer($0, $1)) {
  case 1: return 0;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1)) {
    case 1: return 1;
    case 0: return 2;
   }
  }
 }
}

/* Prelude.EqOrd.compare */
function Prelude_EqOrd_compare_Ord_Int($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Int($0, $1)) {
  case 1: return 0;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_Int($0, $1)) {
    case 1: return 1;
    case 0: return 2;
   }
  }
 }
}

/* Prelude.EqOrd.> */
function Prelude_EqOrd_x3e_Ord_Int($0, $1) {
 switch((($0>$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.>= */
function Prelude_EqOrd_x3ex3d_Ord_Int($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.>= */
function Prelude_EqOrd_x3ex3d_Ord_Char($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_String($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 2: {
   switch($1) {
    case 2: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Int($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Char($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_String($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Integer($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Int($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.<= */
function Prelude_EqOrd_x3cx3d_Ord_Int($0, $1) {
 switch((($0<=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.<= */
function Prelude_EqOrd_x3cx3d_Ord_Char($0, $1) {
 switch((($0<=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_Ordering($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd.compareInteger : Integer -> Integer -> Ordering */
function Prelude_EqOrd_compareInteger($0, $1) {
 return Prelude_EqOrd_compare_Ord_Integer($0, $1);
}

/* Prelude.Interfaces.Applicative.pure */
function Prelude_Interfaces_Applicative_pure_Applicative_Composex28x28x2ex20x24fx29x20x24gx29($0, $1, $2) {
 return $0.a2(undefined)($1.a2(undefined)($2));
}

/* Prelude.Interfaces.traverse_ : Applicative f => Foldable t => (a -> f b) -> t a -> f () */
function Prelude_Interfaces_traverse_($0, $1, $2, $3) {
 return $1.a1(undefined)(undefined)($d => $e => Prelude_Interfaces_x2ax3e($0, $2($d), $e))($0.a2(undefined)(undefined))($3);
}

/* Prelude.Interfaces.(*>) : Applicative f => f a -> f b -> f b */
function Prelude_Interfaces_x2ax3e($0, $1, $2) {
 const $d = $0.a1;
 const $c = $f => $10 => $d(undefined)(undefined)($f)($10);
 const $b = $c($1a => $1b => $1b);
 const $a = $b($1);
 const $4 = $0.a3(undefined)(undefined)($a);
 return $4($2);
}

/* Prelude.IO.map */
function Prelude_IO_map_Functor_IO($0, $1, $2) {
 const $3 = $1($2);
 return $0($3);
}

/* PrimIO.unsafePerformIO : IO a -> a */
function PrimIO_unsafePerformIO($0) {
 const $2 = w => {
  const $3 = $0(w);
  return $3;
 };
 return PrimIO_unsafeCreateWorld($2);
}

/* PrimIO.unsafeCreateWorld : (1 _ : ((1 _ : %World) -> a)) -> a */
function PrimIO_unsafeCreateWorld($0) {
 return $0(_idrisworld);
}

/* System.File.Support.ok : HasIO io => a -> io (Either err a) */
function System_File_Support_ok($0, $1) {
 return $0.a1.a1.a2(undefined)({h: 1 /* Right */, a1: $1});
}

/* System.File.ReadWrite.getStringAndFree : HasIO io => File -> Ptr String -> io (Either FileError String) */
function System_File_ReadWrite_getStringAndFree($0, $1, $2) {
 switch(Prelude_EqOrd_x2fx3d_Eq_Int(PrimIO_prim__nullAnyPtr($2), Number(_truncBigInt32(0n)))) {
  case 1: {
   const $16 = $17 => {
    switch($17) {
     case 1: return System_File_Error_returnError($0);
     case 0: {
      const $20 = b => a => func => $21 => {
       switch($21.h) {
        case 0: /* Left */ return {h: 0 /* Left */, a1: $21.a1};
        case 1: /* Right */ return {h: 1 /* Right */, a1: func($21.a1)};
       }
      };
      const $2a = b => a => $2b => $2c => {
       switch($2b.h) {
        case 0: /* Left */ return {h: 0 /* Left */, a1: $2b.a1};
        case 1: /* Right */ {
         switch($2c.h) {
          case 1: /* Right */ return {h: 1 /* Right */, a1: $2b.a1($2c.a1)};
          case 0: /* Left */ return {h: 0 /* Left */, a1: $2c.a1};
         }
        }
       }
      };
      const $1f = {a1: $20, a2: a => $28 => ({h: 1 /* Right */, a1: $28}), a3: $2a};
      return Prelude_Interfaces_Applicative_pure_Applicative_Composex28x28x2ex20x24fx29x20x24gx29($0.a1.a1, $1f, '');
     }
    }
   };
   return $0.a1.a2(undefined)(undefined)(System_File_Error_fileError($0, $1))($16);
  }
  case 0: {
   const $35 = Prelude_IO_prim__getString($2);
   return $0.a1.a2(undefined)(undefined)(System_FFI_free($0, $2))($45 => System_File_Support_ok($0, $35));
  }
 }
}

/* System.File.ReadWrite.fGetLine : HasIO io => File -> io (Either FileError String) */
function System_File_ReadWrite_fGetLine($0, $1) {
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($10 => System_File_ReadWrite_prim__readLine($1, $10)))(res => System_File_ReadWrite_getStringAndFree($0, $1, res));
}

/* System.FFI.free : HasIO io => AnyPtr -> io () */
function System_FFI_free($0, $1) {
 return $0.a2(undefined)($7 => System_FFI_prim__free($1, $7));
}

/* System.File.Error.returnError : HasIO io => io (Either FileError a) */
function System_File_Error_returnError($0) {
 const $12 = err => {
  let $1a;
  switch(err) {
   case 0: {
    $1a = {h: 1 /* FileReadError */};
    break;
   }
   case 1: {
    $1a = {h: 2 /* FileWriteError */};
    break;
   }
   case 2: {
    $1a = {h: 3 /* FileNotFound */};
    break;
   }
   case 3: {
    $1a = {h: 4 /* PermissionDenied */};
    break;
   }
   case 4: {
    $1a = {h: 5 /* FileExists */};
    break;
   }
   default: $1a = {h: 0 /* GenericFileError */, a1: _sub32s(err, 5)};
  }
  const $19 = {h: 0 /* Left */, a1: $1a};
  return $0.a1.a1.a2(undefined)($19);
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($f => System_File_Error_prim__fileErrno($f)))($12);
}

/* System.File.Error.fileError : HasIO io => File -> io Bool */
function System_File_Error_fileError($0, $1) {
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($10 => System_File_Error_prim__error($1, $10)))(x => $0.a1.a1.a2(undefined)(Prelude_EqOrd_x2fx3d_Eq_Int(x, Number(_truncBigInt32(0n)))));
}

/* Data.Nat.divNatNZ : Nat -> (y : Nat) -> (0 _ : NonZero y) -> Nat */
function Data_Nat_divNatNZ($0, $1) {
 switch($1) {
  case 0n: _crashExp('Nat case not covered');
  default: {
   const $3 = ($1-1n);
   return Data_Nat_divx27($0, $0, $3);
  }
 }
}

/* Data.Nat.divNat : Nat -> Nat -> Nat */
function Data_Nat_divNat($0, $1) {
 switch($1) {
  case 0n: return _crashExp('Unhandled input for Data.Nat.divNat at Data.Nat:375:1--375:59');
  default: {
   const $5 = ($1-1n);
   return Data_Nat_divNatNZ($0, ($5+1n));
  }
 }
}

/* Data.Nat.div' : Nat -> Nat -> Nat -> Nat */
function Data_Nat_divx27($0, $1, $2) {
 switch($0) {
  case 0n: return 0n;
  default: {
   const $4 = ($0-1n);
   switch(Data_Nat_lte($1, $2)) {
    case 1: return 0n;
    case 0: return (Data_Nat_divx27($4, Prelude_Types_prim__integerToNat(($1-($2+1n))), $2)+1n);
   }
  }
 }
}

/* Data.List1.map */
function Data_List1_map_Functor_List1($0, $1) {
 return {a1: $0($1.a1), a2: Prelude_Types_List_mapAppend({h: 0}, $0, $1.a2)};
}

/* Data.List1.singleton : a -> List1 a */
function Data_List1_singleton($0) {
 return {a1: $0, a2: {h: 0}};
}

/* Data.List1.forget : List1 a -> List a */
function Data_List1_forget($0) {
 return {a1: $0.a1, a2: $0.a2};
}

/* Data.List.split : (a -> Bool) -> List a -> List1 (List a) */
function Data_List_split($0, $1) {
 const $2 = Data_List_break$($0, $1);
 switch($2.a2.h) {
  case 0: /* nil */ return Data_List1_singleton($2.a1);
  case undefined: /* cons */ return {a1: $2.a1, a2: Data_List1_forget(Data_List_split($0, $2.a2.a2))};
 }
}

/* Data.List.span : (a -> Bool) -> List a -> (List a, List a) */
function Data_List_span($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {a1: {h: 0}, a2: {h: 0}};
  case undefined: /* cons */ {
   switch($0($1.a1)) {
    case 1: {
     const $8 = Data_List_span($0, $1.a2);
     return {a1: {a1: $1.a1, a2: $8.a1}, a2: $8.a2};
    }
    case 0: return {a1: {h: 0}, a2: {a1: $1.a1, a2: $1.a2}};
   }
  }
 }
}

/* Data.List.mergeReplicate : a -> List a -> List a */
function Data_List_mergeReplicate($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ return {a1: $0, a2: {a1: $1.a1, a2: Data_List_mergeReplicate($0, $1.a2)}};
 }
}

/* Data.List.intersperse : a -> List a -> List a */
function Data_List_intersperse($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ return {a1: $1.a1, a2: Data_List_mergeReplicate($0, $1.a2)};
 }
}

/* Data.List.break : (a -> Bool) -> List a -> (List a, List a) */
function Data_List_break$($0, $1) {
 const $3 = $4 => {
  switch($0($4)) {
   case 1: return 0;
   case 0: return 1;
  }
 };
 return Data_List_span($3, $1);
}

/* Data.Fuel.limit : Nat -> Fuel */
function Data_Fuel_limit($0) {
 switch($0) {
  case 0n: return {h: 0};
  default: {
   const $2 = ($0-1n);
   return {a1: () => Data_Fuel_limit($2)};
  }
 }
}

/* Data.String.with block in parsePositive,parsePosTrimmed */
function Data_String_with__parsePositivex2cparsePosTrimmed_9869($0, $1, $2, $3, $4) {
 switch($3) {
  case '': {
   switch($4.h) {
    case 0: /* nil */ return {h: 0};
    default: {
     switch($4.a1) {
      case '+': return Prelude_Types_map_Functor_Maybe($b => $1.a3($b), Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($4.a2), 0n));
      default: {
       let $15;
       switch(Prelude_EqOrd_x3ex3d_Ord_Char($4.a1, '0')) {
        case 1: {
         $15 = Prelude_EqOrd_x3cx3d_Ord_Char($4.a1, '9');
         break;
        }
        case 0: {
         $15 = 0;
         break;
        }
       }
       switch($15) {
        case 1: return Prelude_Types_map_Functor_Maybe($1f => $1.a3($1f), Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($4.a2), BigInt(_sub32s(_truncInt32($4.a1.codePointAt(0)), _truncInt32('0'.codePointAt(0))))));
        case 0: return {h: 0};
       }
      }
     }
    }
   }
  }
  default: {
   switch($4.a1) {
    case '+': return Prelude_Types_map_Functor_Maybe($32 => $1.a3($32), Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($4.a2), 0n));
    default: {
     let $3c;
     switch(Prelude_EqOrd_x3ex3d_Ord_Char($4.a1, '0')) {
      case 1: {
       $3c = Prelude_EqOrd_x3cx3d_Ord_Char($4.a1, '9');
       break;
      }
      case 0: {
       $3c = 0;
       break;
      }
     }
     switch($3c) {
      case 1: return Prelude_Types_map_Functor_Maybe($46 => $1.a3($46), Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($4.a2), BigInt(_sub32s(_truncInt32($4.a1.codePointAt(0)), _truncInt32('0'.codePointAt(0))))));
      case 0: return {h: 0};
     }
    }
   }
  }
 }
}

/* Data.String.with block in asList */
function Data_String_with__asList_9518($0, $1) {
 switch($0) {
  case '': {
   switch($1.h) {
    case 0: /* nil */ return {h: 0 /* Nil */};
    default: return {h: 1 /* :: */, a1: $1.a1, a2: $1.a2, a3: () => Data_String_asList($1.a2)};
   }
  }
  default: return {h: 1 /* :: */, a1: $1.a1, a2: $1.a2, a3: () => Data_String_asList($1.a2)};
 }
}

/* Data.String.4450:9863:parsePosTrimmed */
function Data_String_n__4450_9863_parsePosTrimmed($0, $1, $2) {
 return Data_String_with__parsePositivex2cparsePosTrimmed_9869(undefined, $0, $2, $2, Data_String_strM($2));
}

/* Data.String.unwords : List String -> String */
function Data_String_unwords($0) {
 return Data_String_joinBy(' ', $0);
}

/* Data.String.trim : String -> String */
function Data_String_trim($0) {
 return Data_String_ltrim(_strReverse(Data_String_ltrim(_strReverse($0))));
}

/* Data.String.strM : (x : String) -> StrM x */
function Data_String_strM($0) {
 switch($0) {
  case '': return {h: 0};
  default: return {a1: ($0.charAt(0)), a2: ($0.slice(1))};
 }
}

/* Data.String.split : (Char -> Bool) -> String -> List1 String */
function Data_String_split($0, $1) {
 return Data_List1_map_Functor_List1($4 => Prelude_Types_fastPack($4), Data_List_split($0, Prelude_Types_fastUnpack($1)));
}

/* Data.String.span : (Char -> Bool) -> String -> (String, String) */
function Data_String_span($0, $1) {
 const $2 = Data_List_span($0, Prelude_Types_fastUnpack($1));
 return {a1: Prelude_Types_fastPack($2.a1), a2: Prelude_Types_fastPack($2.a2)};
}

/* Data.String.replicate : Nat -> Char -> String */
function Data_String_replicate($0, $1) {
 return Prelude_Types_fastPack(Data_List_replicateTR({h: 0}, $0, $1));
}

/* Data.String.parsePositive : Num a => String -> Maybe a */
function Data_String_parsePositive($0, $1) {
 return Data_String_n__4450_9863_parsePosTrimmed($0, $1, Data_String_trim($1));
}

/* Data.String.ltrim : String -> String */
function Data_String_ltrim($0) {
 return Data_String_with__ltrim_9542($0, Data_String_asList($0));
}

/* Data.String.joinBy : String -> List String -> String */
function Data_String_joinBy($0, $1) {
 return Prelude_Types_foldMap_Foldable_List(csegen_6(), $6 => $6, Data_List_intersperse($0, $1));
}

/* Data.String.indent : Nat -> String -> String */
function Data_String_indent($0, $1) {
 return (Data_String_replicate($0, ' ')+$1);
}

/* Data.String.break : (Char -> Bool) -> String -> (String, String) */
function Data_String_break$($0, $1) {
 const $3 = $4 => {
  switch($0($4)) {
   case 1: return 0;
   case 0: return 1;
  }
 };
 return Data_String_span($3, $1);
}

/* Data.String.asList : (str : String) -> AsList str */
function Data_String_asList($0) {
 return Data_String_with__asList_9518($0, Data_String_strM($0));
}

/* System.getArgs : HasIO io => io (List String) */
function System_getArgs($0) {
 const $12 = n => {
  switch(Prelude_EqOrd_x3e_Ord_Int(n, Number(_truncBigInt32(0n)))) {
   case 1: return Prelude_Basics_flip($1a => $1b => Prelude_Types_traverse_Traversable_List($0.a1.a1, $1a, $1b), Prelude_Types_rangeFromTo_Range_x24a({a1: {a1: csegen_54(), a2: $29 => $2a => Prelude_Num_div_Integral_Int($29, $2a), a3: $2f => $30 => Prelude_Num_mod_Integral_Int($2f, $30)}, a2: {a1: {a1: {a1: $38 => $39 => Prelude_EqOrd_x3dx3d_Eq_Int($38, $39), a2: $3e => $3f => Prelude_EqOrd_x2fx3d_Eq_Int($3e, $3f)}, a2: $44 => $45 => Prelude_EqOrd_compare_Ord_Int($44, $45), a3: $4a => $4b => Prelude_EqOrd_x3c_Ord_Int($4a, $4b), a4: $50 => $51 => Prelude_EqOrd_x3e_Ord_Int($50, $51), a5: $56 => $57 => Prelude_EqOrd_x3cx3d_Ord_Int($56, $57), a6: $5c => $5d => Prelude_EqOrd_x3ex3d_Ord_Int($5c, $5d), a7: $62 => $63 => Prelude_EqOrd_max_Ord_Int($62, $63), a8: $68 => $69 => Prelude_EqOrd_min_Ord_Int($68, $69)}, a2: {a1: csegen_54(), a2: $71 => _sub32s(0, $71), a3: $75 => $76 => _sub32s($75, $76)}}}, 0, _sub32s(n, 1)), $7e => $0.a2(undefined)($84 => System_prim__getArg($7e, $84)));
   case 0: return $0.a1.a1.a2(undefined)({h: 0});
  }
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($f => System_prim__getArgCount($f)))($12);
}

/* Data.SortedSet.toList : SortedSet k -> List k */
function Data_SortedSet_toList($0) {
 return Data_SortedMap_keys($0);
}

/* Data.SortedSet.fromList : Ord k => List k -> SortedSet k */
function Data_SortedSet_fromList($0, $1) {
 return Data_SortedMap_fromList($0, Prelude_Types_List_mapAppend({h: 0}, i => ({a1: i, a2: undefined}), $1));
}

/* Data.SortedMap.Dependent.treeToList : Tree n k v o -> List (x : k ** v x) */
function Data_SortedMap_Dependent_treeToList($0) {
 return Data_SortedMap_Dependent_n__6841_6801_treeToListx27($3 => ({a1: $3, a2: {h: 0}}), $0);
}

/* Data.SortedMap.Dependent.treeInsert' : Ord k => (x : k) -> v x -> Tree n k v o -> Either (Tree n k v o) (Tree n k v o,
(k, Tree n k v o)) */
function Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3) {
 switch($3.h) {
  case 0: /* Leaf */ {
   switch($0.a2($1)($3.a1)) {
    case 0: return {h: 1 /* Right */, a1: {a1: {h: 0 /* Leaf */, a1: $1, a2: $2}, a2: {a1: $1, a2: {h: 0 /* Leaf */, a1: $3.a1, a2: $3.a2}}}};
    case 1: return {h: 0 /* Left */, a1: {h: 0 /* Leaf */, a1: $1, a2: $2}};
    case 2: return {h: 1 /* Right */, a1: {a1: {h: 0 /* Leaf */, a1: $3.a1, a2: $3.a2}, a2: {a1: $3.a1, a2: {h: 0 /* Leaf */, a1: $1, a2: $2}}}};
   }
  }
  case 1: /* Branch2 */ {
   switch($0.a5($1)($3.a2)) {
    case 1: {
     const $26 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a1);
     switch($26.h) {
      case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 1 /* Branch2 */, a1: $26.a1, a2: $3.a2, a3: $3.a3}};
      case 1: /* Right */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $26.a1.a1, a2: $26.a1.a2.a1, a3: $26.a1.a2.a2, a4: $3.a2, a5: $3.a3}};
     }
    }
    case 0: {
     const $38 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a3);
     switch($38.h) {
      case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 1 /* Branch2 */, a1: $3.a1, a2: $3.a2, a3: $38.a1}};
      case 1: /* Right */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $3.a1, a2: $3.a2, a3: $38.a1.a1, a4: $38.a1.a2.a1, a5: $38.a1.a2.a2}};
     }
    }
   }
  }
  case 2: /* Branch3 */ {
   switch($0.a5($1)($3.a2)) {
    case 1: {
     const $50 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a1);
     switch($50.h) {
      case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $50.a1, a2: $3.a2, a3: $3.a3, a4: $3.a4, a5: $3.a5}};
      case 1: /* Right */ return {h: 1 /* Right */, a1: {a1: {h: 1 /* Branch2 */, a1: $50.a1.a1, a2: $50.a1.a2.a1, a3: $50.a1.a2.a2}, a2: {a1: $3.a2, a2: {h: 1 /* Branch2 */, a1: $3.a3, a2: $3.a4, a3: $3.a5}}}};
     }
    }
    case 0: {
     switch($0.a5($1)($3.a4)) {
      case 1: {
       const $6f = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a3);
       switch($6f.h) {
        case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $3.a1, a2: $3.a2, a3: $6f.a1, a4: $3.a4, a5: $3.a5}};
        case 1: /* Right */ return {h: 1 /* Right */, a1: {a1: {h: 1 /* Branch2 */, a1: $3.a1, a2: $3.a2, a3: $6f.a1.a1}, a2: {a1: $6f.a1.a2.a1, a2: {h: 1 /* Branch2 */, a1: $6f.a1.a2.a2, a2: $3.a4, a3: $3.a5}}}};
       }
      }
      case 0: {
       const $88 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a5);
       switch($88.h) {
        case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $3.a1, a2: $3.a2, a3: $3.a3, a4: $3.a4, a5: $88.a1}};
        case 1: /* Right */ return {h: 1 /* Right */, a1: {a1: {h: 1 /* Branch2 */, a1: $3.a1, a2: $3.a2, a3: $3.a3}, a2: {a1: $3.a4, a2: {h: 1 /* Branch2 */, a1: $88.a1.a1, a2: $88.a1.a2.a1, a3: $88.a1.a2.a2}}}};
       }
      }
     }
    }
   }
  }
 }
}

/* Data.SortedMap.Dependent.treeInsert : Ord k => (x : k) ->
v x -> Tree n k v o -> Either (Tree n k v o) (Tree (S n) k v o) */
function Data_SortedMap_Dependent_treeInsert($0, $1, $2, $3) {
 const $4 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3);
 switch($4.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $4.a1};
  case 1: /* Right */ return {h: 1 /* Right */, a1: {h: 1 /* Branch2 */, a1: $4.a1.a1, a2: $4.a1.a2.a1, a3: $4.a1.a2.a2}};
 }
}

/* Data.SortedMap.Dependent.toList : SortedDMap k v -> List (x : k ** v x) */
function Data_SortedMap_Dependent_toList($0) {
 switch($0.h) {
  case 0: /* Empty */ return {h: 0};
  case 1: /* M */ return Data_SortedMap_Dependent_treeToList($0.a3);
 }
}

/* Data.SortedMap.Dependent.insert : (x : k) -> v x -> SortedDMap k v -> SortedDMap k v */
function Data_SortedMap_Dependent_insert($0, $1, $2) {
 switch($2.h) {
  case 0: /* Empty */ return {h: 1 /* M */, a1: $2.a1, a2: 0n, a3: {h: 0 /* Leaf */, a1: $0, a2: $1}};
  case 1: /* M */ {
   const $9 = Data_SortedMap_Dependent_treeInsert($2.a1, $0, $1, $2.a3);
   switch($9.h) {
    case 0: /* Left */ return {h: 1 /* M */, a1: $2.a1, a2: $2.a2, a3: $9.a1};
    case 1: /* Right */ return {h: 1 /* M */, a1: $2.a1, a2: ($2.a2+1n), a3: $9.a1};
   }
  }
 }
}

/* Data.SortedMap.Dependent.empty : Ord k => SortedDMap k v */
function Data_SortedMap_Dependent_empty($0) {
 return {h: 0 /* Empty */, a1: $0};
}

/* Data.SortedMap.unDPair : (x : a ** const b x) -> (a, b) */
function Data_SortedMap_unDPair($0) {
 return {a1: $0.a1, a2: $0.a2};
}

/* Data.SortedMap.toList : SortedMap k v -> List (k, v) */
function Data_SortedMap_toList($0) {
 return Prelude_Types_List_mapAppend({h: 0}, $4 => Data_SortedMap_unDPair($4), Data_SortedMap_Dependent_toList($0));
}

/* Data.SortedMap.keys : SortedMap k v -> List k */
function Data_SortedMap_keys($0) {
 return Prelude_Types_List_mapAppend({h: 0}, $4 => Builtin_fst($4), Data_SortedMap_toList($0));
}

/* Data.SortedMap.insertFrom : Foldable f => f (k, v) -> SortedMap k v -> SortedMap k v */
function Data_SortedMap_insertFrom($0, $1, $2) {
 return Prelude_Basics_flip($5 => $6 => $0.a2(undefined)(undefined)($10 => $11 => Prelude_Basics_flip($14 => Prelude_Basics_uncurry($17 => $18 => $19 => Data_SortedMap_insert($17, $18, $19), $14), $10, $11))($5)($6), $1, $2);
}

/* Data.SortedMap.insert : k -> v -> SortedMap k v -> SortedMap k v */
function Data_SortedMap_insert($0, $1, $2) {
 return Data_SortedMap_Dependent_insert($0, $1, $2);
}

/* Data.SortedMap.fromList : Ord k => List (k, v) -> SortedMap k v */
function Data_SortedMap_fromList($0, $1) {
 return Prelude_Basics_flip($4 => $5 => Data_SortedMap_insertFrom(csegen_21(), $4, $5), Data_SortedMap_empty($0), $1);
}

/* Data.SortedMap.empty : Ord k => SortedMap k v */
function Data_SortedMap_empty($0) {
 return Data_SortedMap_Dependent_empty($0);
}


try{__mainExpression_0()}catch(e){if(e instanceof IdrisError){console.log('ERROR: ' + e.message)}else{throw e} }
