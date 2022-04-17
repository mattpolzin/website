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

const _truncBigInt8 = x => {
  const res = Number(x & 0xffn);
  return res >= 0x80 ? res - 0x100 : res;
}

// Euclidian Division
const _div = (a,b) => {
  let q = Math.trunc(a / b)
  let r = a % b
  return r < 0 ? (b > 0 ? q - 1 : q + 1) : q
}

const _divBigInt = (a,b) => {
  let q = a / b
  let r = a % b
  return r < 0n ? (b > 0n ? q - 1n : q + 1n) : q
}

// Euclidian Modulo
const _mod = (a,b) => {
  r = a % b
  return r < 0 ? (b > 0 ? r + b : r - b) : r
}

const _modBigInt = (a,b) => {
  r = a % b
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

const _truncBigInt16 = x => {
  const res = Number(x & 0xffffn);
  return res >= 0x8000 ? res - 0x10000 : res;
}

const _add16s = (a,b) => _truncInt16(a + b)
const _sub16s = (a,b) => _truncInt16(a - b)
const _mul16s = (a,b) => _truncInt16(a * b)
const _div16s = (a,b) => _truncInt16(_div(a,b))
const _shl16s = (a,b) => _truncInt16(a << b)
const _shr16s = (a,b) => _truncInt16(a >> b)

//Int32
const _truncInt32 = x => x & 0xffffffff

const _truncBigInt32 = x => {
  const res = Number(x & 0xffffffffn);
  return res >= 0x80000000 ? res - 0x100000000 : res;
}

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
const _truncBigInt64 = x => {
  const res = x & 0xffffffffffffffffn;
  return res >= 0x8000000000000000n ? res - 0x10000000000000000n : res;
}

const _add64s = (a,b) => _truncBigInt64(a + b)
const _sub64s = (a,b) => _truncBigInt64(a - b)
const _mul64s = (a,b) => _truncBigInt64(a * b)
const _div64s = (a,b) => _truncBigInt64(_divBigInt(a,b))
const _shl64s = (a,b) => _truncBigInt64(a << b)
const _shr64s = (a,b) => _truncBigInt64(a >> b)

//Bits8
const _truncUInt8 = x => x & 0xff

const _truncUBigInt8 = x => Number(x & 0xffn)

const _add8u = (a,b) => (a + b) & 0xff
const _sub8u = (a,b) => (a - b) & 0xff
const _mul8u = (a,b) => (a * b) & 0xff
const _div8u = (a,b) => Math.trunc(a / b)
const _shl8u = (a,b) => (a << b) & 0xff
const _shr8u = (a,b) => (a >> b) & 0xff

//Bits16
const _truncUInt16 = x => x & 0xffff

const _truncUBigInt16 = x => Number(x & 0xffffn)

const _add16u = (a,b) => (a + b) & 0xffff
const _sub16u = (a,b) => (a - b) & 0xffff
const _mul16u = (a,b) => (a * b) & 0xffff
const _div16u = (a,b) => Math.trunc(a / b)
const _shl16u = (a,b) => (a << b) & 0xffff
const _shr16u = (a,b) => (a >> b) & 0xffff

//Bits32
const _truncUBigInt32 = x => Number(x & 0xffffffffn)

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
const _truncUBigInt64 = x => x & 0xffffffffffffffffn

const _add64u = (a,b) => (a + b) & 0xffffffffffffffffn
const _mul64u = (a,b) => (a * b) & 0xffffffffffffffffn
const _div64u = (a,b) => a / b
const _shl64u = (a,b) => (a << b) & 0xffffffffffffffffn
const _shr64u = (a,b) => (a >> b) & 0xffffffffffffffffn
const _sub64u = (a,b) => (a - b) & 0xffffffffffffffffn

//String
const _strReverse = x => x.split('').reverse().join('')

const _substr = (o,l,x) => x.slice(o, o + l)

const support_system_file_fs = require('fs')


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

function support_system_file_openFile (n, m) {
  try {
    const fd = support_system_file_fs.openSync(n, m.replace('b', ''))
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

const System_File_Virtual_prim__stdin = (x=>({fd:0, buffer: Buffer.alloc(0), name:'<stdin>', eof: false}));
const Prelude_Types_fastUnpack = ((str)=>__prim_js2idris_array(Array.from(str)));
const Prelude_Types_fastPack = ((xs)=>__prim_idris2js_array(xs).join(''));
const Prelude_IO_prim__putStr = (x=>process.stdout.write(x));
const Prelude_IO_prim__getString = (x=>x);
const PrimIO_prim__nullAnyPtr = (x=>x===undefined||x===null?1:0);
const System_File_ReadWrite_prim__readLine = support_system_file_readLine;
const System_File_Error_prim__fileErrno = support_system_file_fileErrno;
const System_prim__getArgCount = (() => process.argv.length);
const System_prim__getArg = (n => process.argv[n]);
function x24tcOpt_1($0) {
 switch($0.a2.h) {
  case 0: return {h: 0, a1: $0.a1({a1: $0.a2.a1, a2: $0.a2.a2})};
  case 1: return {h: 1, a1: $9 => ({a1: $9, a2: Data_SortedMap_Dependent_n__6681_4761_treeToListx27($0.a1, $0.a2.a3)}), a2: $0.a2.a1};
  case 2: return {h: 1, a1: $11 => ({a1: $11, a2: Data_SortedMap_Dependent_n__6681_4761_treeToListx27($16 => ({a1: $16, a2: Data_SortedMap_Dependent_n__6681_4761_treeToListx27($0.a1, $0.a2.a5)}), $0.a2.a3)}), a2: $0.a2.a1};
 }
}

function Data_SortedMap_Dependent_n__6681_4761_treeToListx27($0, $1) {
 return __tailRec(x24tcOpt_1, {h: 1, a1: $0, a2: $1});
}

function x24tcOpt_2($0) {
 switch($0.a3.h) {
  case 0: return {h: 0, a1: $0.a2};
  case undefined: return {h: 1, a1: $0.a1, a2: $0.a1($0.a2)($0.a3.a1), a3: $0.a3.a2};
 }
}

function Prelude_Types_foldl_Foldable_List($0, $1, $2) {
 return __tailRec(x24tcOpt_2, {h: 1, a1: $0, a2: $1, a3: $2});
}

function x24tcOpt_3($0) {
 switch($0.a1.h) {
  case 0: return {h: 0, a1: {a1: $0.a2}};
  case undefined: {
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
    case 1: return {h: 1, a1: $0.a1.a2, a2: (($0.a2*10n)+Prelude_Cast_cast_Cast_Int_Integer(_sub32s(_truncInt32($0.a1.a1.codePointAt(0)), _truncInt32('0'.codePointAt(0)))))};
    case 0: return {h: 0, a1: {h: 0}};
   }
  }
 }
}

function Data_String_parseNumWithoutSign($0, $1) {
 return __tailRec(x24tcOpt_3, {h: 1, a1: $0, a2: $1});
}

function x24tcOpt_4($0) {
 switch($0.a1.h) {
  case undefined: {
   switch($0.a1.a1) {
    case 'html': return {h: 0, a1: 1};
    default: return {h: 1, a1: $0.a1.a2};
   }
  }
  default: return {h: 0, a1: 0};
 }
}

function Main_parseArgs($0) {
 return __tailRec(x24tcOpt_4, {h: 1, a1: $0});
}

function x24tcOpt_5($0) {
 switch($0.a1) {
  case '': {
   switch($0.a2.h) {
    case 0: return {h: 0, a1: ''};
    default: {
     const $6 = ($0.a2.a1+$0.a2.a2);
     switch(Prelude_Types_isSpace($0.a2.a1)) {
      case 1: return {h: 1, a1: $0.a2.a2, a2: $0.a2.a3()};
      case 0: return {h: 0, a1: $6};
     }
    }
   }
  }
  default: {
   const $11 = ($0.a2.a1+$0.a2.a2);
   switch(Prelude_Types_isSpace($0.a2.a1)) {
    case 1: return {h: 1, a1: $0.a2.a2, a2: $0.a2.a3()};
    case 0: return {h: 0, a1: $11};
   }
  }
 }
}

function Data_String_with__ltrim_5272($0, $1) {
 return __tailRec(x24tcOpt_5, {h: 1, a1: $0, a2: $1});
}

function x24tcOpt_6($0) {
 switch($0.a1) {
  case 0n: return {h: 0, a1: 1};
  default: {
   switch($0.a2) {
    case 0n: return {h: 0, a1: 0};
    default: {
     switch($0.a1) {
      case 0n: _crashExp('Nat case not covered');
      default: {
       const $7 = ($0.a1-1n);
       switch($0.a2) {
        case 0n: _crashExp('Nat case not covered');
        default: {
         const $b = ($0.a2-1n);
         return {h: 1, a1: $7, a2: $b};
        }
       }
      }
     }
    }
   }
  }
 }
}

function Data_Nat_lte($0, $1) {
 return __tailRec(x24tcOpt_6, {h: 1, a1: $0, a2: $1});
}

function x24tcOpt_7($0) {
 switch($0.a1) {
  case 0n: return {h: 0, a1: $0.a2};
  default: {
   const $4 = ($0.a1-1n);
   switch($0.a2.h) {
    case 0: return {h: 0, a1: {h: 0}};
    case undefined: return {h: 1, a1: $4, a2: $0.a2.a2};
   }
  }
 }
}

function Data_List_drop($0, $1) {
 return __tailRec(x24tcOpt_7, {h: 1, a1: $0, a2: $1});
}

const __mainExpression_0 = __lazy(function () {
 return PrimIO_unsafePerformIO($2 => Main_main($2));
});

const csegen_2 = __lazy(function () {
 return {a1: $1 => $2 => ($1+$2), a2: $6 => $7 => ($6*$7), a3: $b => Prelude_Types_prim__integerToNat($b)};
});

const csegen_5 = __lazy(function () {
 return {a1: $1 => $2 => ($1+$2), a2: ''};
});

const csegen_20 = __lazy(function () {
 return {a1: acc => elem => func => init => input => Prelude_Types_foldr_Foldable_List(func, init, input), a2: elem => acc => func => init => input => Prelude_Types_foldl_Foldable_List(func, init, input), a3: elem => $b => Prelude_Types_null_Foldable_List($b), a4: elem => acc => m => $f => funcM => init => input => Prelude_Types_foldlM_Foldable_List($f, funcM, init, input), a5: elem => $16 => $16, a6: a => m => $18 => f => $19 => Prelude_Types_foldMap_Foldable_List($18, f, $19)};
});

const csegen_44 = __lazy(function () {
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

const csegen_72 = __lazy(function () {
 return {a1: $1 => $2 => _add32s($1, $2), a2: $6 => $7 => _mul32s($6, $7), a3: $b => Number(_truncBigInt32($b))};
});

function prim__add_Integer($0, $1) {
 return ($0+$1);
}

function prim__sub_Integer($0, $1) {
 return ($0-$1);
}

function prim__mul_Integer($0, $1) {
 return ($0*$1);
}

function Main_with__renderSequence_4990($0, $1, $2) {
 switch($1.h) {
  case 0: return {h: 0};
  case undefined: return Prelude_Types_foldl_Foldable_List($6 => $7 => Main_n__5698_4999_renderToNextLane($1.a1, $1.a2, $2, $0, 0, $1.a1.a1, $6, $7), {h: 0}, {a1: $1.a1, a2: $1.a2});
 }
}

function Main_case__casex20blockx20inx20readInx2cread_5312($0, $1, $2, $3, $4) {
 switch($4.h) {
  case undefined: {
   switch($4.a2.h) {
    case undefined: {
     const $7 = Data_String_parsePositive(csegen_2(), $4.a1);
     switch($7.h) {
      case undefined: {
       const $c = Data_String_parsePositive(csegen_2(), $4.a2.a1);
       switch($c.h) {
        case undefined: return $0.a1.a1.a2(undefined)({a1: Main_abs($7.a1, $c.a1, Builtin_fst(Data_String_break$($21 => Prelude_EqOrd_x3dx3d_Eq_Char($21, '\n'), Prelude_Interfaces_concat(csegen_5(), csegen_20(), $4.a2.a2))))});
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

function Main_n__5698_4999_renderToNextLane($0, $1, $2, $3, $4, $5, $6, $7) {
 switch($6.h) {
  case 0: return {a1: {a1: Main_renderProclevity($4, Prelude_Types_prim__integerToNat(($7.a1-$5)), $2, $7), a2: Main_effectiveEndYear($4, $7)}, a2: {h: 0}};
  case undefined: return Prelude_Types_maybe(() => ({a1: $6.a1, a2: Main_n__5698_4999_renderToNextLane($0, $1, $2, $3, 1, $5, $6.a2, $7)}), () => $28 => ({a1: $28, a2: $6.a2}), Main_n__5698_4998_renderToLane($0, $1, $2, $3, $4, $5, $7, $6.a1));
 }
}

function Main_n__5698_4998_renderToLane($0, $1, $2, $3, $4, $5, $6, $7) {
 switch(Prelude_Types_x3e_Ord_Nat(($6.a1*Main_timelineMultiplier()), $7.a2)) {
  case 1: return {a1: {a1: ($7.a1+Main_renderProclevity($4, Prelude_Types_prim__integerToNat((Prelude_Types_prim__integerToNat(($6.a1-$5))-Data_Nat_divNat(Main_length($7), Main_timelineMultiplier()))), $2, $6)), a2: Main_effectiveEndYear($4, $6)}};
  case 0: return {h: 0};
 }
}

function Main_n__4943_4360_renderLaneSplit($0, $1, $2, $3, $4, $5) {
 switch($5) {
  case 1: return Main_divergence();
  case 2: return Main_terminus();
  case 0: return '';
 }
}

function Main_n__4943_4361_renderLaneJoin($0, $1, $2, $3, $4, $5) {
 switch($4) {
  case 2: return Main_continuance();
  case 1: return Main_convergence();
  case 0: return '';
 }
}

function Main_n__5955_5268_read($0, $1) {
 const $f = $10 => {
  switch($10.h) {
   case 1: {
    const $12 = {h: 1, a1: $10.a1};
    return Main_case__casex20blockx20inx20readInx2cread_5312($0, $1, $10.a1, $12, Data_String_split($1c => Prelude_EqOrd_x3dx3d_Eq_Char($1c, ' '), $10.a1));
   }
   default: return $0.a1.a1.a2(undefined)({h: 0});
  }
 };
 return $0.a1.a2(undefined)(undefined)(System_File_ReadWrite_fGetLine($0, System_File_Virtual_stdin()))($f);
}

function Main_n__5635_4945_divergenceLen($0, $1, $2, $3) {
 switch($3) {
  case 1: return Main_headLength();
  case 0: return 0n;
 }
}

function Main_show_Show_Lane($0) {
 return $0.a1;
}

function Main_showPrec_Show_Lane($0, $1) {
 return Main_show_Show_Lane($1);
}

function Main_min_Ord_Proclevity($0, $1) {
 switch(Main_x3c_Ord_Proclevity($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

function Main_max_Ord_Proclevity($0, $1) {
 switch(Main_x3e_Ord_Proclevity($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

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

function Main_x3e_Ord_Proclevity($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Main_compare_Ord_Proclevity($0, $1), 2);
}

function Main_x3ex3d_Ord_Proclevity($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Main_compare_Ord_Proclevity($0, $1), 0);
}

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

function Main_x3c_Ord_Proclevity($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Main_compare_Ord_Proclevity($0, $1), 0);
}

function Main_x3cx3d_Ord_Proclevity($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Main_compare_Ord_Proclevity($0, $1), 2);
}

function Main_x2fx3d_Eq_Proclevity($0, $1) {
 switch(Main_x3dx3d_Eq_Proclevity($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

const Main_timelineMultiplier = __lazy(function () {
 return 6n;
});

const Main_timeline = __lazy(function () {
 return '\u{2500}';
});

const Main_terminus = __lazy(function () {
 return '\u{25c9}\u{2500}';
});

const Main_tailLength = __lazy(function () {
 return Prelude_Types_String_length(Main_convergence());
});

function Main_renderedTitle($0) {
 return Prelude_Interfaces_concat(csegen_5(), csegen_20(), {a1: '| ', a2: {a1: $0, a2: {a1: ' |', a2: {h: 0}}}});
}

function Main_renderSequence($0, $1) {
 return Main_with__renderSequence_4990($1, Data_SortedSet_toList($1), $0);
}

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

function Main_render($0, $1, $2, $3, $4, $5) {
 return Data_String_indent($2, (Main_n__4943_4360_renderLaneSplit($5, $4, $3, $2, $1, $0)+(Data_String_replicate($3, Main_timeline())+(Main_renderedTitle($5)+(Data_String_replicate($4, Main_timeline())+Main_n__4943_4361_renderLaneJoin($5, $4, $3, $2, $1, $0))))));
}

function Main_readIn($0, $1) {
 switch($1.h) {
  case 0: return $0.a1.a1.a2(undefined)({h: 0});
  case undefined: {
   const $16 = $17 => {
    switch($17.h) {
     case undefined: return $0.a1.a2(undefined)(undefined)(Main_readIn($0, $1.a1()))($27 => $0.a1.a1.a2(undefined)({a1: $17.a1, a2: $27}));
     default: return $0.a1.a1.a2(undefined)({h: 0});
    }
   };
   return $0.a1.a2(undefined)(undefined)(Main_n__5955_5268_read($0, $1.a1))($16);
  }
 }
}

function Main_printToTerminal($0, $1) {
 return Prelude_Interfaces_traverse_($0.a1.a1, csegen_20(), $9 => Prelude_IO_printLn({a1: $0, a2: {a1: x => Main_show_Show_Lane(x), a2: d => x => Main_showPrec_Show_Lane(d, x)}}, $9), Main_renderSequence(Main_now(), $1));
}

function Main_printToHTML($0, $1) {
 const $2 = Prelude_Interfaces_concat(csegen_5(), csegen_20(), Data_List_intersperse('<br/>', Prelude_Interfaces_x3cx24x3e($e => $f => $10 => $11 => Prelude_Types_map_Functor_List($10, $11), $16 => Main_show_Show_Lane($16), Main_renderSequence(Main_now(), $1))));
 return Prelude_IO_putStrLn($0, Prelude_Interfaces_concat(csegen_5(), csegen_20(), {a1: '<html style=\"font-family: Monospace; height: 100%; overflow: hidden;\">\n<head>\n  <meta charset=\"utf-8\">\n  <link rel=\"stylesheet\" href=\"https://unpkg.com/@picocss/pico@latest/css/pico.classless.min.css\">\n</head>\n<body style=\"height: 100%;\">\n  <div style=\"white-space: pre; line-height: 2em; padding: 2em; overflow-x: scroll; height: 100%;\">', a2: {a1: $2, a2: {a1: '</div>\n</body>\n</html>', a2: {h: 0}}}}));
}

const Main_now = __lazy(function () {
 return Prelude_Types_prim__integerToNat(2022n);
});

function Main_main($0) {
 const $1 = Prelude_Interfaces_x3cx24x3e($5 => $6 => $7 => $8 => $9 => Prelude_IO_map_Functor_IO($7, $8, $9), $f => Data_List_drop(1n, $f), System_getArgs(csegen_44()))($0);
 const $18 = Main_parseArgs($1);
 const $1b = Main_readIn(csegen_44(), Data_Fuel_limit(50n))($0);
 const $24 = Data_SortedSet_fromList({a1: {a1: $29 => $2a => Main_x3dx3d_Eq_Proclevity($29, $2a), a2: $2f => $30 => Main_x2fx3d_Eq_Proclevity($2f, $30)}, a2: $35 => $36 => Main_compare_Ord_Proclevity($35, $36), a3: $3b => $3c => Main_x3c_Ord_Proclevity($3b, $3c), a4: $41 => $42 => Main_x3e_Ord_Proclevity($41, $42), a5: $47 => $48 => Main_x3cx3d_Ord_Proclevity($47, $48), a6: $4d => $4e => Main_x3ex3d_Ord_Proclevity($4d, $4e), a7: $53 => $54 => Main_max_Ord_Proclevity($53, $54), a8: $59 => $5a => Main_min_Ord_Proclevity($59, $5a)}, $1b);
 switch($18) {
  case 0: return Main_printToTerminal(csegen_44(), $24)($0);
  case 1: return Main_printToHTML(csegen_44(), $24)($0);
 }
}

function Main_length($0) {
 return Prelude_Types_String_length($0.a1);
}

const Main_headLength = __lazy(function () {
 return Prelude_Types_String_length(Main_divergence());
});

function Main_effectiveEndYear($0, $1) {
 return Prelude_Types_max_Ord_Nat((($1.a1+$1.a2)*Main_timelineMultiplier()), ((($1.a1*Main_timelineMultiplier())+Prelude_Types_String_length(Main_renderedTitle($1.a3)))+Main_n__5635_4945_divergenceLen($1.a3, $1.a2, $1.a1, $0)));
}

const Main_divergence = __lazy(function () {
 return '\u{2570}\u{2500}';
});

const Main_convergence = __lazy(function () {
 return '\u{2500}\u{25c9}';
});

const Main_continuance = __lazy(function () {
 return '\u{2500}\u{2508}';
});

function Main_abs($0, $1, $2) {
 return {a1: $0, a2: Prelude_Types_prim__integerToNat(($1-$0)), a3: $2};
}

const System_File_Virtual_stdin = __lazy(function () {
 return System_File_Virtual_prim__stdin();
});

function Prelude_Basics_uncurry($0, $1) {
 return $0($1.a1)($1.a2);
}

function Prelude_Basics_flip($0, $1, $2) {
 return $0($2)($1);
}

function Builtin_snd($0) {
 return $0.a2;
}

function Builtin_idris_crash($0) {
 return _crashExp($0);
}

function Builtin_fst($0) {
 return $0.a1;
}

function Builtin_believe_me($0) {
 return $0;
}

function Prelude_Types_traverse_Traversable_List($0, $1, $2) {
 switch($2.h) {
  case 0: return $0.a2(undefined)({h: 0});
  case undefined: return $0.a3(undefined)(undefined)($0.a3(undefined)(undefined)($0.a2(undefined)($1e => $1f => ({a1: $1e, a2: $1f})))($1($2.a1)))(Prelude_Types_traverse_Traversable_List($0, $1, $2.a2));
 }
}

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

function Prelude_Types_pure_Applicative_List($0) {
 return {a1: $0, a2: {h: 0}};
}

function Prelude_Types_null_Foldable_List($0) {
 switch($0.h) {
  case 0: return 1;
  case undefined: return 0;
 }
}

function Prelude_Types_max_Ord_Nat($0, $1) {
 switch(Prelude_Types_x3e_Ord_Nat($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

function Prelude_Types_map_Functor_Maybe($0, $1) {
 switch($1.h) {
  case undefined: return {a1: $0($1.a1)};
  case 0: return {h: 0};
 }
}

function Prelude_Types_map_Functor_List($0, $1) {
 switch($1.h) {
  case 0: return {h: 0};
  case undefined: return {a1: $0($1.a1), a2: Prelude_Types_map_Functor_List($0, $1.a2)};
 }
}

function Prelude_Types_foldr_Foldable_List($0, $1, $2) {
 switch($2.h) {
  case 0: return $1;
  case undefined: return $0($2.a1)(Prelude_Types_foldr_Foldable_List($0, $1, $2.a2));
 }
}

function Prelude_Types_foldlM_Foldable_List($0, $1, $2, $3) {
 return Prelude_Types_foldl_Foldable_List(ma => b => $0.a2(undefined)(undefined)(ma)($f => Prelude_Basics_flip($1, b, $f)), $0.a1.a2(undefined)($2), $3);
}

function Prelude_Types_foldMap_Foldable_List($0, $1, $2) {
 return Prelude_Types_foldl_Foldable_List(acc => elem => $0.a1(acc)($1(elem)), $0.a2, $2);
}

function Prelude_Types_x3e_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 2);
}

function Prelude_Types_x3c_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 0);
}

function Prelude_Types_takeUntil($0, $1) {
 switch($0($1.a1)) {
  case 1: return {a1: $1.a1, a2: {h: 0}};
  case 0: return {a1: $1.a1, a2: Prelude_Types_takeUntil($0, $1.a2())};
 }
}

function Prelude_Types_prim__integerToNat($0) {
 let $1;
 switch(((0n<=$0)?1:0)) {
  case 0: {
   $1 = 0;
   break;
  }
  default: $1 = 1;
 }
 switch($1) {
  case 1: return Builtin_believe_me($0);
  case 0: return 0n;
 }
}

function Prelude_Types_maybe($0, $1, $2) {
 switch($2.h) {
  case 0: return $0();
  case undefined: return $1()($2.a1);
 }
}

function Prelude_Types_String_length($0) {
 return Prelude_Types_prim__integerToNat(BigInt($0.length));
}

function Prelude_Types_isSpace($0) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Char($0, ' ')) {
  case 1: return 1;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_Char($0, '\u{9}')) {
    case 1: return 1;
    case 0: {
     switch(Prelude_EqOrd_x3dx3d_Eq_Char($0, '\r')) {
      case 1: return 1;
      case 0: {
       switch(Prelude_EqOrd_x3dx3d_Eq_Char($0, '\n')) {
        case 1: return 1;
        case 0: {
         switch(Prelude_EqOrd_x3dx3d_Eq_Char($0, '\u{c}')) {
          case 1: return 1;
          case 0: {
           switch(Prelude_EqOrd_x3dx3d_Eq_Char($0, '\u{b}')) {
            case 1: return 1;
            case 0: return Prelude_EqOrd_x3dx3d_Eq_Char($0, '\u{a0}');
           }
          }
         }
        }
       }
      }
     }
    }
   }
  }
 }
}

function Prelude_Types_countFrom($0, $1) {
 return {a1: $0, a2: () => Prelude_Types_countFrom($1($0), $1)};
}

function Prelude_Num_mod_Integral_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($1, Number(_truncBigInt32(0n)))) {
  case 0: return _mod($0, $1);
  default: return Builtin_idris_crash(undefined)('Unhandled input for Prelude.Num.case block in mod at Prelude.Num:131:3--133:40');
 }
}

function Prelude_Num_div_Integral_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($1, Number(_truncBigInt32(0n)))) {
  case 0: return _div32s($0, $1);
  default: return Builtin_idris_crash(undefined)('Unhandled input for Prelude.Num.case block in div at Prelude.Num:128:3--130:40');
 }
}

function Prelude_EqOrd_min_Ord_Int($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Int($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

function Prelude_EqOrd_max_Ord_Int($0, $1) {
 switch(Prelude_EqOrd_x3e_Ord_Int($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

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

function Prelude_EqOrd_x3e_Ord_Int($0, $1) {
 switch((($0>$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3ex3d_Ord_Int($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3ex3d_Ord_Char($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3dx3d_Eq_String($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

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

function Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3dx3d_Eq_Int($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3dx3d_Eq_Char($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3c_Ord_String($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3c_Ord_Integer($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3c_Ord_Int($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3cx3d_Ord_Int($0, $1) {
 switch((($0<=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x3cx3d_Ord_Char($0, $1) {
 switch((($0<=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

function Prelude_EqOrd_x2fx3d_Eq_Ordering($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

function Prelude_EqOrd_x2fx3d_Eq_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

function Prelude_Interfaces_traverse_($0, $1, $2, $3) {
 return $1.a1(undefined)(undefined)($d => $e => Prelude_Interfaces_x2ax3e($0, $2($d), $e))($0.a2(undefined)(undefined))($3);
}

function Prelude_Interfaces_for($0, $1, $2, $3) {
 return Prelude_Basics_flip($6 => $7 => $1.a3(undefined)(undefined)(undefined)($0)($6)($7), $2, $3);
}

function Prelude_Interfaces_concat($0, $1, $2) {
 return $1.a6(undefined)(undefined)($0)($d => $d)($2);
}

function Prelude_Interfaces_x3cx24x3e($0, $1, $2) {
 return $0(undefined)(undefined)($1)($2);
}

function Prelude_Interfaces_x2ax3e($0, $1, $2) {
 return $0.a3(undefined)(undefined)($0.a1(undefined)(undefined)($13 => $14 => $14)($1))($2);
}

function Prelude_IO_map_Functor_IO($0, $1, $2) {
 const $3 = $1($2);
 return $0($3);
}

function Prelude_IO_putStrLn($0, $1) {
 return Prelude_IO_putStr($0, ($1+'\n'));
}

function Prelude_IO_putStr($0, $1) {
 return $0.a2(undefined)($7 => Prelude_IO_prim__putStr($1, $7));
}

function Prelude_IO_printLn($0, $1) {
 const $7 = Builtin_snd($0);
 const $6 = $7.a1($1);
 return Prelude_IO_putStrLn(Builtin_fst($0), $6);
}

function PrimIO_unsafePerformIO($0) {
 return PrimIO_unsafeCreateWorld(w => $0(w));
}

function PrimIO_unsafeCreateWorld($0) {
 return $0(_idrisworld);
}

function PrimIO_prim__forgetPtr($0) {
 return Builtin_believe_me($0);
}

function Prelude_Cast_cast_Cast_Int_Integer($0) {
 return BigInt($0);
}

function System_File_Support_ok($0, $1) {
 return $0.a1.a1.a2(undefined)({h: 1, a1: $1});
}

function System_File_ReadWrite_fGetLine($0, $1) {
 const $14 = res => {
  switch(Prelude_EqOrd_x2fx3d_Eq_Int(PrimIO_prim__nullAnyPtr(PrimIO_prim__forgetPtr(res)), Number(_truncBigInt32(0n)))) {
   case 1: return System_File_Error_returnError($0);
   case 0: return System_File_Support_ok($0, Prelude_IO_prim__getString(res));
  }
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($10 => System_File_ReadWrite_prim__readLine($1, $10)))($14);
}

function System_File_Error_returnError($0) {
 const $12 = err => {
  let $1a;
  switch(err) {
   case 0: {
    $1a = {h: 1};
    break;
   }
   case 1: {
    $1a = {h: 2};
    break;
   }
   case 2: {
    $1a = {h: 3};
    break;
   }
   case 3: {
    $1a = {h: 4};
    break;
   }
   case 4: {
    $1a = {h: 5};
    break;
   }
   default: $1a = {h: 0, a1: _sub32s(err, 5)};
  }
  const $19 = {h: 0, a1: $1a};
  return $0.a1.a1.a2(undefined)($19);
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($f => System_File_Error_prim__fileErrno($f)))($12);
}

function Data_Nat_divNatNZ($0, $1) {
 switch($1) {
  case 0n: _crashExp('Nat case not covered');
  default: {
   const $3 = ($1-1n);
   return Data_Nat_divx27($0, $0, $3);
  }
 }
}

function Data_Nat_divNat($0, $1) {
 switch($1) {
  case 0n: return Builtin_idris_crash('Unhandled input for Data.Nat.divNat at Data.Nat:349:1--349:59');
  default: {
   const $5 = ($1-1n);
   return Data_Nat_divNatNZ($0, ($5+1n));
  }
 }
}

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

function Data_List1_map_Functor_List1($0, $1) {
 return {a1: $0($1.a1), a2: Prelude_Types_map_Functor_List($0, $1.a2)};
}

function Data_List1_singleton($0) {
 return {a1: $0, a2: {h: 0}};
}

function Data_List1_forget($0) {
 return {a1: $0.a1, a2: $0.a2};
}

function Data_List_split($0, $1) {
 const $2 = Data_List_break$($0, $1);
 switch($2.a2.h) {
  case 0: return Data_List1_singleton($2.a1);
  case undefined: return {a1: $2.a1, a2: Data_List1_forget(Data_List_split($0, $2.a2.a2))};
 }
}

function Data_List_span($0, $1) {
 switch($1.h) {
  case 0: return {a1: {h: 0}, a2: {h: 0}};
  case undefined: {
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

function Data_List_replicate($0, $1) {
 switch($0) {
  case 0n: return {h: 0};
  default: {
   const $3 = ($0-1n);
   return {a1: $1, a2: Data_List_replicate($3, $1)};
  }
 }
}

function Data_List_mergeReplicate($0, $1) {
 switch($1.h) {
  case 0: return {h: 0};
  case undefined: return {a1: $0, a2: {a1: $1.a1, a2: Data_List_mergeReplicate($0, $1.a2)}};
 }
}

function Data_List_intersperse($0, $1) {
 switch($1.h) {
  case 0: return {h: 0};
  case undefined: return {a1: $1.a1, a2: Data_List_mergeReplicate($0, $1.a2)};
 }
}

function Data_List_break$($0, $1) {
 const $3 = $4 => {
  switch($0($4)) {
   case 1: return 0;
   case 0: return 1;
  }
 };
 return Data_List_span($3, $1);
}

function Data_Fuel_limit($0) {
 switch($0) {
  case 0n: return {h: 0};
  default: {
   const $2 = ($0-1n);
   return {a1: () => Data_Fuel_limit($2)};
  }
 }
}

function System_getArgs($0) {
 const $12 = n => {
  switch(Prelude_EqOrd_x3e_Ord_Int(n, Number(_truncBigInt32(0n)))) {
   case 1: return Prelude_Interfaces_for($0.a1.a1, {a1: b => a => func => $1e => Prelude_Types_map_Functor_List(func, $1e), a2: csegen_20(), a3: b => a => f => $25 => $26 => $27 => Prelude_Types_traverse_Traversable_List($25, $26, $27)}, Prelude_Types_rangeFromTo_Range_x24a({a1: {a1: csegen_72(), a2: $33 => $34 => Prelude_Num_div_Integral_Int($33, $34), a3: $39 => $3a => Prelude_Num_mod_Integral_Int($39, $3a)}, a2: {a1: {a1: {a1: $42 => $43 => Prelude_EqOrd_x3dx3d_Eq_Int($42, $43), a2: $48 => $49 => Prelude_EqOrd_x2fx3d_Eq_Int($48, $49)}, a2: $4e => $4f => Prelude_EqOrd_compare_Ord_Int($4e, $4f), a3: $54 => $55 => Prelude_EqOrd_x3c_Ord_Int($54, $55), a4: $5a => $5b => Prelude_EqOrd_x3e_Ord_Int($5a, $5b), a5: $60 => $61 => Prelude_EqOrd_x3cx3d_Ord_Int($60, $61), a6: $66 => $67 => Prelude_EqOrd_x3ex3d_Ord_Int($66, $67), a7: $6c => $6d => Prelude_EqOrd_max_Ord_Int($6c, $6d), a8: $72 => $73 => Prelude_EqOrd_min_Ord_Int($72, $73)}, a2: {a1: csegen_72(), a2: $7b => _sub32s(0, $7b), a3: $7f => $80 => _sub32s($7f, $80)}}}, 0, _sub32s(n, 1)), $88 => $0.a2(undefined)($8e => System_prim__getArg($88, $8e)));
   case 0: return $0.a1.a1.a2(undefined)({h: 0});
  }
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($f => System_prim__getArgCount($f)))($12);
}

function Data_String_with__parsePositivex2cparsePosTrimmed_5599($0, $1, $2, $3, $4) {
 switch($3) {
  case '': {
   switch($4.h) {
    case 0: return {h: 0};
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
        case 1: return Prelude_Types_map_Functor_Maybe($1f => $1.a3($1f), Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($4.a2), Prelude_Cast_cast_Cast_Int_Integer(_sub32s(_truncInt32($4.a1.codePointAt(0)), _truncInt32('0'.codePointAt(0))))));
        case 0: return {h: 0};
       }
      }
     }
    }
   }
  }
  default: {
   switch($4.a1) {
    case '+': return Prelude_Types_map_Functor_Maybe($33 => $1.a3($33), Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($4.a2), 0n));
    default: {
     let $3d;
     switch(Prelude_EqOrd_x3ex3d_Ord_Char($4.a1, '0')) {
      case 1: {
       $3d = Prelude_EqOrd_x3cx3d_Ord_Char($4.a1, '9');
       break;
      }
      case 0: {
       $3d = 0;
       break;
      }
     }
     switch($3d) {
      case 1: return Prelude_Types_map_Functor_Maybe($47 => $1.a3($47), Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($4.a2), Prelude_Cast_cast_Cast_Int_Integer(_sub32s(_truncInt32($4.a1.codePointAt(0)), _truncInt32('0'.codePointAt(0))))));
      case 0: return {h: 0};
     }
    }
   }
  }
 }
}

function Data_String_with__asList_5248($0, $1) {
 switch($0) {
  case '': {
   switch($1.h) {
    case 0: return {h: 0};
    default: return {h: 1, a1: $1.a1, a2: $1.a2, a3: () => Data_String_asList($1.a2)};
   }
  }
  default: return {h: 1, a1: $1.a1, a2: $1.a2, a3: () => Data_String_asList($1.a2)};
 }
}

function Data_String_n__4094_5593_parsePosTrimmed($0, $1, $2) {
 return Data_String_with__parsePositivex2cparsePosTrimmed_5599(undefined, $0, $2, $2, Data_String_strM($2));
}

function Data_String_trim($0) {
 return Data_String_ltrim(_strReverse(Data_String_ltrim(_strReverse($0))));
}

function Data_String_strM($0) {
 switch($0) {
  case '': return {h: 0};
  default: return Builtin_believe_me({a1: ($0.charAt(0)), a2: ($0.slice(1))});
 }
}

function Data_String_split($0, $1) {
 return Data_List1_map_Functor_List1($4 => Prelude_Types_fastPack($4), Data_List_split($0, Prelude_Types_fastUnpack($1)));
}

function Data_String_span($0, $1) {
 const $2 = Data_List_span($0, Prelude_Types_fastUnpack($1));
 return {a1: Prelude_Types_fastPack($2.a1), a2: Prelude_Types_fastPack($2.a2)};
}

function Data_String_replicate($0, $1) {
 return Prelude_Types_fastPack(Data_List_replicate($0, $1));
}

function Data_String_parsePositive($0, $1) {
 return Data_String_n__4094_5593_parsePosTrimmed($0, $1, Data_String_trim($1));
}

function Data_String_ltrim($0) {
 return Data_String_with__ltrim_5272($0, Data_String_asList($0));
}

function Data_String_indent($0, $1) {
 return (Data_String_replicate($0, ' ')+$1);
}

function Data_String_break$($0, $1) {
 const $3 = $4 => {
  switch($0($4)) {
   case 1: return 0;
   case 0: return 1;
  }
 };
 return Data_String_span($3, $1);
}

function Data_String_asList($0) {
 return Data_String_with__asList_5248($0, Data_String_strM($0));
}

function Data_SortedSet_toList($0) {
 return Data_SortedMap_keys($0);
}

function Data_SortedSet_fromList($0, $1) {
 return Data_SortedMap_fromList($0, Prelude_Types_map_Functor_List(i => ({a1: i, a2: undefined}), $1));
}

function Data_SortedMap_Dependent_treeToList($0) {
 return Data_SortedMap_Dependent_n__6681_4761_treeToListx27($3 => ({a1: $3, a2: {h: 0}}), $0);
}

function Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3) {
 switch($3.h) {
  case 0: {
   switch($0.a2($1)($3.a1)) {
    case 0: return {h: 1, a1: {a1: {h: 0, a1: $1, a2: $2}, a2: {a1: $1, a2: {h: 0, a1: $3.a1, a2: $3.a2}}}};
    case 1: return {h: 0, a1: {h: 0, a1: $1, a2: $2}};
    case 2: return {h: 1, a1: {a1: {h: 0, a1: $3.a1, a2: $3.a2}, a2: {a1: $3.a1, a2: {h: 0, a1: $1, a2: $2}}}};
   }
  }
  case 1: {
   switch($0.a5($1)($3.a2)) {
    case 1: {
     const $26 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a1);
     switch($26.h) {
      case 0: return {h: 0, a1: {h: 1, a1: $26.a1, a2: $3.a2, a3: $3.a3}};
      case 1: return {h: 0, a1: {h: 2, a1: $26.a1.a1, a2: $26.a1.a2.a1, a3: $26.a1.a2.a2, a4: $3.a2, a5: $3.a3}};
     }
    }
    case 0: {
     const $38 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a3);
     switch($38.h) {
      case 0: return {h: 0, a1: {h: 1, a1: $3.a1, a2: $3.a2, a3: $38.a1}};
      case 1: return {h: 0, a1: {h: 2, a1: $3.a1, a2: $3.a2, a3: $38.a1.a1, a4: $38.a1.a2.a1, a5: $38.a1.a2.a2}};
     }
    }
   }
  }
  case 2: {
   switch($0.a5($1)($3.a2)) {
    case 1: {
     const $50 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a1);
     switch($50.h) {
      case 0: return {h: 0, a1: {h: 2, a1: $50.a1, a2: $3.a2, a3: $3.a3, a4: $3.a4, a5: $3.a5}};
      case 1: return {h: 1, a1: {a1: {h: 1, a1: $50.a1.a1, a2: $50.a1.a2.a1, a3: $50.a1.a2.a2}, a2: {a1: $3.a2, a2: {h: 1, a1: $3.a3, a2: $3.a4, a3: $3.a5}}}};
     }
    }
    case 0: {
     switch($0.a5($1)($3.a4)) {
      case 1: {
       const $6f = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a3);
       switch($6f.h) {
        case 0: return {h: 0, a1: {h: 2, a1: $3.a1, a2: $3.a2, a3: $6f.a1, a4: $3.a4, a5: $3.a5}};
        case 1: return {h: 1, a1: {a1: {h: 1, a1: $3.a1, a2: $3.a2, a3: $6f.a1.a1}, a2: {a1: $6f.a1.a2.a1, a2: {h: 1, a1: $6f.a1.a2.a2, a2: $3.a4, a3: $3.a5}}}};
       }
      }
      case 0: {
       const $88 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a5);
       switch($88.h) {
        case 0: return {h: 0, a1: {h: 2, a1: $3.a1, a2: $3.a2, a3: $3.a3, a4: $3.a4, a5: $88.a1}};
        case 1: return {h: 1, a1: {a1: {h: 1, a1: $3.a1, a2: $3.a2, a3: $3.a3}, a2: {a1: $3.a4, a2: {h: 1, a1: $88.a1.a1, a2: $88.a1.a2.a1, a3: $88.a1.a2.a2}}}};
       }
      }
     }
    }
   }
  }
 }
}

function Data_SortedMap_Dependent_treeInsert($0, $1, $2, $3) {
 const $4 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3);
 switch($4.h) {
  case 0: return {h: 0, a1: $4.a1};
  case 1: return {h: 1, a1: {h: 1, a1: $4.a1.a1, a2: $4.a1.a2.a1, a3: $4.a1.a2.a2}};
 }
}

function Data_SortedMap_Dependent_toList($0) {
 switch($0.h) {
  case 0: return {h: 0};
  case 1: return Data_SortedMap_Dependent_treeToList($0.a3);
 }
}

function Data_SortedMap_Dependent_insert($0, $1, $2) {
 switch($2.h) {
  case 0: return {h: 1, a1: $2.a1, a2: 0n, a3: {h: 0, a1: $0, a2: $1}};
  case 1: {
   const $9 = Data_SortedMap_Dependent_treeInsert($2.a1, $0, $1, $2.a3);
   switch($9.h) {
    case 0: return {h: 1, a1: $2.a1, a2: $2.a2, a3: $9.a1};
    case 1: return {h: 1, a1: $2.a1, a2: ($2.a2+1n), a3: $9.a1};
   }
  }
 }
}

function Data_SortedMap_Dependent_empty($0) {
 return {h: 0, a1: $0};
}

function Data_SortedMap_unDPair($0) {
 return {a1: $0.a1, a2: $0.a2};
}

function Data_SortedMap_toList($0) {
 return Prelude_Types_map_Functor_List($3 => Data_SortedMap_unDPair($3), Data_SortedMap_Dependent_toList($0));
}

function Data_SortedMap_keys($0) {
 return Prelude_Types_map_Functor_List($3 => Builtin_fst($3), Data_SortedMap_toList($0));
}

function Data_SortedMap_insertFrom($0, $1, $2) {
 return Prelude_Basics_flip($5 => $6 => $0.a2(undefined)(undefined)($10 => $11 => Prelude_Basics_flip($14 => Prelude_Basics_uncurry($17 => $18 => $19 => Data_SortedMap_insert($17, $18, $19), $14), $10, $11))($5)($6), $1, $2);
}

function Data_SortedMap_insert($0, $1, $2) {
 return Data_SortedMap_Dependent_insert($0, $1, $2);
}

function Data_SortedMap_fromList($0, $1) {
 return Prelude_Basics_flip($4 => $5 => Data_SortedMap_insertFrom(csegen_20(), $4, $5), Data_SortedMap_empty($0), $1);
}

function Data_SortedMap_empty($0) {
 return Data_SortedMap_Dependent_empty($0);
}


try{__mainExpression_0()}catch(e){if(e instanceof IdrisError){console.log('ERROR: ' + e.message)}else{throw e} }
