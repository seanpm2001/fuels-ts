import { bn } from '@fuel-ts/math';
import type {
  InputCoin,
  InputContract,
  InputMessage,
  OutputChange,
  OutputCoin,
  OutputContract,
  OutputContractCreated,
  OutputVariable,
  Transaction,
} from '@fuel-ts/transactions';
import { InputType, OutputType, ReceiptType, TransactionType } from '@fuel-ts/transactions';

import type {
  TransactionResultCallReceipt,
  TransactionResultReturnReceipt,
  TransactionResultTransferReceipt,
  TransactionResultTransferOutReceipt,
  TransactionResultReturnDataReceipt,
  TransactionResultMessageOutReceipt,
  TransactionResultScriptResultReceipt,
  AbiMap,
  SuccessStatus,
  FailureStatus,
  SubmittedStatus,
  SqueezedOutStatus,
} from '../../src';

export const MOCK_INPUT_COIN: InputCoin = {
  amount: bn(4999989993),
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  owner: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
  predicateGasUsed: bn(0),
  predicate: '0x',
  predicateData: '0x',
  predicateDataLength: bn(0),
  predicateLength: bn(0),
  txPointer: { blockHeight: 0, txIndex: 0 },
  type: InputType.Coin,
  txID: '0xf23da6e1d6a55d05f2a0ebbb90b6b161d9e70f1723680f610f08c98279bc6855',
  outputIndex: 1,
  witnessIndex: 0,
};
export const MOCK_INPUT_CONTRACT: InputContract = {
  balanceRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
  contractID: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
  stateRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
  txPointer: {
    blockHeight: 0,
    txIndex: 0,
  },
  type: InputType.Contract,
  outputIndex: 0,
  txID: '0xf23da6e1d6a55d05f2a0ebbb90b6b161d9e70f1723680f610f08c98279bc6855',
};

export const MOCK_INPUT_MESSAGE: InputMessage = {
  amount: bn.parseUnits('0.001'),
  data: '0x',
  dataLength: 0,
  nonce: '0x02',
  predicate: '0x',
  predicateGasUsed: bn(0),
  predicateData: '0x',
  predicateDataLength: bn(0),
  predicateLength: bn(0),
  recipient: '0x06300e686a5511c7ba0399fc68dcbe0ca2d8f54f7e6afea73c505dd3bcacf33b',
  sender: '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  type: InputType.Message,
  witnessIndex: 0,
};

export const MOCK_OUTPUT_COIN: OutputCoin = {
  type: OutputType.Coin,
  to: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
  amount: bn(1),
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
};

export const MOCK_OUTPUT_CONTRACT: OutputContract = {
  type: OutputType.Contract,
  inputIndex: 0,
  balanceRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
  stateRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
};

export const MOCK_OUTPUT_CHANGE: OutputChange = {
  type: OutputType.Change,
  to: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
  amount: bn(4899989992),
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
};

export const MOCK_OUTPUT_VARIABLE: OutputVariable = {
  type: OutputType.Variable,
  to: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
  amount: bn(100000000),
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
};

export const MOCK_OUTPUT_CONTRACT_CREATED: OutputContractCreated = {
  type: OutputType.ContractCreated,
  contractId: '0xef066899413ef8dc7c3073a50868bafb3d039d9bad8006c2635b7f0efa992553',
  stateRoot: '0x1494a821f0dac0da6978dd03fbb5d02910d184a17cb7ff895fc0aa750bab88ea',
};

export const MOCK_RECEIPT_CALL: TransactionResultCallReceipt = {
  type: ReceiptType.Call,
  from: '0x0000000000000000000000000000000000000000000000000000000000000000',
  to: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
  amount: bn(100000000),
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  gas: bn('0x5f56dca'),
  param1: bn('0x6b0a60fc'),
  param2: bn('0x3868'),
  pc: bn('0x4370'),
  is: bn('0x4370'),
};

export const MOCK_RECEIPT_RETURN: TransactionResultReturnReceipt = {
  type: ReceiptType.Return,
  id: '0x0000000000000000000000000000000000000000000000000000000000000000',
  val: bn(0),
  pc: bn('0x2868'),
  is: bn('0x2868'),
};

export const MOCK_RECEIPT_TRANSFER: TransactionResultTransferReceipt = {
  type: ReceiptType.Transfer,
  from: '0x0000000000000000000000000000000000000000000000000000000000000000',
  to: '0xaab4884920fa4d3a35fc2977cc442b0caddf87e001ef62321b6c02f5ab0f4115',
  amount: bn(988),
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  pc: bn(10360),
  is: bn(10344),
};

export const MOCK_RECEIPT_TRANSFER_OUT: TransactionResultTransferOutReceipt = {
  type: ReceiptType.TransferOut,
  from: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
  to: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
  amount: bn(100000000),
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  pc: bn('0x57dc'),
  is: bn('0x4370'),
};

export const MOCK_RECEIPT_RETURN_DATA_1: TransactionResultReturnDataReceipt = {
  type: ReceiptType.ReturnData,
  id: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
  ptr: bn('0x66e0'),
  len: bn('0x58'),
  digest: '0x2ff699ad2d07577eef288783f7a7d4f41f8e8837178c42f603a2f8799145a053',
  pc: bn('0x58'),
  is: bn('0x3'),
  data: '0x000000000000000300000000000000050000000005f5e10000000000000000003e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b23024d79206576656e7400000000000000000000000000000001',
};

export const MOCK_RECEIPT_RETURN_DATA_2: TransactionResultReturnDataReceipt = {
  type: ReceiptType.ReturnData,
  id: '0x0000000000000000000000000000000000000000000000000000000000000000',
  ptr: bn('0x3fffd70'),
  len: bn('0xf8'),
  digest: '0x31120b8025b758fa96c911171d8211e53eb256f2ecc9b45c657c0ddfe6241ef5',
  pc: bn('0xf8'),
  is: bn('0x1'),
  data: '0x000000000000000100000000000000010000000000000000000000000000005800000000000000000000000005f563ca00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c400000000005f5e1000000000000003d1800000000000000000000000000003c9000000000000035980000000000003ae8000000000000000300000000000000050000000005f5e10000000000000000003e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b23024d79206576656e7400000000000000000000000000000001',
};

export const MOCK_RECEIPT_MESSAGE_OUT: TransactionResultMessageOutReceipt = {
  type: ReceiptType.MessageOut,
  messageId: '0x609a3e324753376cdbb64627d7365a5e039e522c584f73a3bf5ece00509cd24f',
  sender: '0x4aec2335430f52d0314a03b244d285c675d790dfbf0bc853fd31e39548ad8b7d',
  recipient: '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  amount: bn.parseUnits('0.001'),
  nonce: '0x66c4d70c08ff30cd2d9dae0b6fd05972997579328529bb0605dd604afedfdf93',
  digest: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  data: new Uint8Array(),
};

export const MOCK_RECEIPT_SCRIPT_RESULT: TransactionResultScriptResultReceipt = {
  type: ReceiptType.ScriptResult,
  result: bn(0),
  gasUsed: bn(167824),
};

export const MOCK_TRANSACTION_RAWPAYLOAD =
  '0x000000000000000000000000000000010000000005f5e10000000000000000000000000000000d2c00000000000003300000000000000002000000000000000400000000000000017241460c27a187712bb4c0637ac7de13ba613639058252be53930d95e303046290000004470000000000000000000cd45dfcc00110fff3001a5c5000910005b861440006724002d0164114005b40100d360000006158000c61440001504175305f5d10a6504175305d4570a6504171385f5d1027504171385d417027134100007340001a9000001f1a445000910000085d43f0005f4500009000002b504171385d4170271341004073400024900000291a445000910000085d43f0015f4500009000002b360000001a44000050417528504175286041100850457528504170085041700860411008504170085d4100001341000073400037900000396144000c9000003b360000001a440000504174305f5d1086504174305d4570865d43f00210450440504174485f5d108961440001504175405f5d10a8504175405d4570a8504171405f5d1028504171405d417028134100007340004f900000541a445000910000085d43f0005f45000090000060504171405d41702813410040734000599000005e1a445000910000085d43f0015f45000090000060360000001a44000050417538504175386041100850457538504170005041700060411008504170005d410000134100007340006c9000006e6144000690000078504170005d410000134100407340007390000076360000001a44000090000078360000001a4400005d43f00220451400504173805f5d1070504174485d497089504173805d4170701a445000910000105f4520005f450001504175a8504175a8604110105d47f00326440000504470015041726050417260604110a026000000504070011a445000910000105f4500005f440001504174785041747860411010504173505f5c006a5d47f0025d43f00412451400504173005f5d1060504173505d45706a504173005d41706016411400734000a4900000b150496000504173505d41706a5545009010452440504170785041707860411090504170785d41000013410040734001249000031f504972601a445000910000a050411000604120a05041748850417488604110a026000000504070011a445000910000105f4500005f44000150417198504171986041101050517198505574885d454001504174085f5d10815d4540015d43f00310450440504173c85f5d10795d4140005d4d4001504573c85d457079154914c0734800d3900000e12644000050487001504573a85f5d207515453000734400da900000de504573a85d457075284504c0900000de504173a85d417075900000e15f510000504173c85d4170795f5100015d454000504174085d417081104504405d43f0032845540050557198505174785d41400113410000734000f1900000f35d4150019000011c5d455001504174105f5d10825d4550015d41400110450440504173d05f5d107a5d4150005d4d5001504573d05d45707a154914c073480102900001102644000050487001504573b05f5d207615453000734401099000010d504573b05d457076284504c09000010d504173b05d417076900001105f550000504173d05d41707a5f5500015d4940005d455000504174105d417082104504405d414001284524005d417082504171985d450000504171985d41000125450000504574885d43f003254500005041707850450008504171a8504171a860411088504171a850450028504171085041710860411018504171085d41000013410000734001339000013f504171085d450002504175485f5d10a9504175485d4970a91a445000910000185d43f0005f4500005f4520029000017b504171085d41000013410040734001449000016050417108504100085d450000504173e85f5d107d50417108504100085d450001504173785f5d106f504175a85d450000504173e85d41707d10450440504173785d41706f1a485000910000105f4910005f4900011a445000910000185d43f0015f45000050411008604120109000017b50417108504100085d450000504173f05f5d107e50417108504100085d450001504173905f5d1072504175a85d450000504173f05d41707e10450440504173905d4170721a485000910000105f4910005f4900011a445000910000185d43f0015f4500005041100860412010504173085041730860411018504171a850550000504171a85d51000450457308504171a8504d0040504170105041701060411018504170105d410000134100007340018d90000194504170105d450002504175505f5d10aa504175505d4570aa900001a8504170105d4100001341004073400199900001a150417010504100085d450000504174385f5d1087504174385d457087900001a850417010504100085d450000504174505f5d108a504174505d45708a504173205f5d1064504173205d4970641a4450009100003050411000604150205f4540045f45200550417230504172306041103050453000504170285041702860411010504170285d41000013410040734001be900001c5504170285d450001504171485f5d1029504171485d457029900001cd504170285d41000013410000734001ca900001cc1a440000900001cd1a440000504171505f5d102a50453010504170385041703860411028504170385d41000013410040734001d8900001df504170385045000850417358504173586041102050497358900001f1504170385d41000013410000734001e4900001eb1a485000910000205d47f00a104513005041200060411020900001f11a485000910000205d47f00a10451300504120006041102050417158504171586041202050453038504170605041706060411010504170605d41000013410040734001fd90000204504170605d450001504173405f5d1068504173405d4570689000020c504170605d41000013410000734002099000020b1a44a0009000020c1a44a000504173485f5d1069504d7230504171505d49702a50457158504173485d4170692d4d24501a44e000504170705f5d100e504170705d41700e134100007340021d900002281a44d000504175785f5d10af504175785d4570af1a485000910000185d43f0005f4900005f4910029000023d504170705d45700e504173885f5d10711a44d000504174585f5d108b504174585d49708b504173885d4170711a445000910000105f4520005f4500011a485000910000185d43f0015f490000504120086041101050417460504174606041201850457460504171205041712060411018504171205d410000134100007340024990000255504171205d450002504175a05f5d10b4504175a05d4970b41a445000910000185d43f0005f4500005f45200290000309504171205d410000134100407340025a900002b250417120504100085d450000504174285f5d108550417120504100085d450001504173985f5d1073504174285d497085504173985d4170731a445000910000105f4520005f45000150417178504171786041101050557478505171785d4140011341000073400275900002775d455001900002a15d455001504174185f5d10835d4550015d41400110450440504173d85f5d107b5d4150005d4d5001504573d85d45707b154914c073480286900002942644000050487001504573b85f5d2077154530007344028d90000291504573b85d457077284504c090000291504173b85d417077900002945f550000504173d85d41707b5f5500015d4940005d455000504174185d417083104504405d41400128452400504174185d457083504173f85f5d107f504173f85d45707f504173985d4170731a485000910000105f4910005f4900011a445000910000185d43f0015f45000050411008604120109000030950417120504100085d450000504174405f5d108850417120504100085d450001504173a05f5d1074504174405d497088504173a05d4170741a445000910000105f4520005f45000150417188504171886041101050557478505171885d41400113410000734002cd900002cf5d455001900002f95d455001504174205f5d10845d4550015d41400110450440504173e05f5d107c5d4150005d4d5001504573e05d45707c154914c0734802de900002ec2644000050487001504573c05f5d207815453000734402e5900002e9504573c05d457078284504c0900002e9504173c05d417078900002ec5f550000504173e05d41707c5f5500015d4940005d455000504174205d417084104504405d41400128452400504174205d457084504174005f5d1080504174005d457080504173a05d4170741a485000910000105f4910005f4900011a445000910000185d43f0015f4500005041100860412010504173285041732860411018504973281a445000910000205d43f0015f450000504110086041201850417558504175586041102050457260504173505d41706a5549002010491480504575585d43f009284914009000032e504175801a445000910000205d43f0005f450000504175806041102050457260504173505d41706a5549002010491480504575805d43f0092849140050417350504173505d41706a104014005f5d006a9000009d470000000000000000000000000000000000000100000000000002d000000000000000a00000000000000090000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000cfc000000000000000000000001d58568036bb3c01142d3149f238bcf2d75478c01fa97dfc1b8caee0f808651ff000000006b0a60fc0000000000000001000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001d58568036bb3c01142d3149f238bcf2d75478c01fa97dfc1b8caee0f808651ff000000006b0a60fc0000000000000001000000000000003000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064a5a77a7d97c6708b08de873528ae6879ef5e9900fbc2e3f3cb74e28917bf703800000000000000640000000000000064a5a77a7d97c6708b08de873528ae6879ef5e9900fbc2e3f3cb74e28917bf703800000000000000640000000000000001cffdfa19ccb53f78eaaa922690ca53b5de25b77f6093182526e81a70ac305cee0000000000000000e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b85500000000000000000000000000000000d58568036bb3c01142d3149f238bcf2d75478c01fa97dfc1b8caee0f808651ff0000000000000000cffdfa19ccb53f78eaaa922690ca53b5de25b77f6093182526e81a70ac305cee0000000000000001560bd412cb06f0b0f71709a42eb8eaa333ab301108d61548edcd81a5276a8888000000001dcd64ff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000cb139c5a7c7980d83b5a7461127ff8ca52580273c1a4e68abf9d2986cf356d18e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8550000000000000003560bd412cb06f0b0f71709a42eb8eaa333ab301108d61548edcd81a5276a8888000000001dcd64fe00000000000000000000000000000000000000000000000000000000000000000000000000000004a5a77a7d97c6708b08de873528ae6879ef5e9900fbc2e3f3cb74e28917bf70380000000000000064d58568036bb3c01142d3149f238bcf2d75478c01fa97dfc1b8caee0f808651ff0000000000000004a5a77a7d97c6708b08de873528ae6879ef5e9900fbc2e3f3cb74e28917bf70380000000000000064d58568036bb3c01142d3149f238bcf2d75478c01fa97dfc1b8caee0f808651ff0000000000000040efb577f1b0a7bd37a87af0487f006a1a15a9924010b0817ede153cb769494d655c753c6fb6cb79afb3492ec43b6c36b16c7b54217f4ae309ef4f038622bc2456';

export const MOCK_ABI_MAP: AbiMap = {
  '0x17a88dcb90a4b5df7433200c7eb7bd47015079b90043f197d64977443396f1c2': {
    specVersion: '1',
    programType: 'contract',
    encodingVersion: '1',
    concreteTypes: [{ type: '()', concreteTypeId: 'randomhash' }],
    configurables: [],
    loggedTypes: [],
    messagesTypes: [],
    metadataTypes: [],
    functions: [
      {
        name: 'main',
        inputs: [],
        output: 'randomhash',
        attributes: [],
      },
    ],
  },
};

export const CONTRACT_CALL_ABI =
  MOCK_ABI_MAP['0x17a88dcb90a4b5df7433200c7eb7bd47015079b90043f197d64977443396f1c2'];

export const MOCK_ABIMAP = {
  [MOCK_INPUT_CONTRACT.contractID]: CONTRACT_CALL_ABI,
};

export const MOCK_TRANSACTION: Transaction = {
  scriptGasLimit: bn(100000000),
  inputsCount: 3,
  inputs: [MOCK_INPUT_CONTRACT, MOCK_INPUT_COIN],
  outputsCount: 3,
  outputs: [MOCK_OUTPUT_CONTRACT, MOCK_OUTPUT_VARIABLE, MOCK_OUTPUT_CHANGE],
  receiptsRoot: '0x80fc095e6c66a2deb42087bd63e5490f79b650d2cd245f7771e6bae51dcd4aec',
  script: '0x9000000447000000000000000000',
  scriptData: '0x00000000000000010a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74',
  scriptDataLength: bn(80),
  scriptLength: bn(30),
  type: TransactionType.Script,
};

export const MOCK_SUCCESS_STATUS: SuccessStatus = {
  time: '4611686020122012518',
  type: 'SuccessStatus',
  block: {
    id: '0x123',
  },
  receipts: [],
  totalFee: '1000',
  totalGas: '1000',
};

export const MOCK_FAILURE_STATUS: FailureStatus = {
  type: 'FailureStatus',
  block: {
    id: '0x123',
  },
  reason: 'reason',
  time: '4611686020122012535',
  receipts: [],
  totalFee: '1000',
  totalGas: '1000',
};

export const MOCK_SUBMITTED_STATUS: SubmittedStatus = {
  time: '4611686020122012562',
  type: 'SubmittedStatus',
};

export const MOCK_SQUEEZEDOUT_STATUS: SqueezedOutStatus = {
  type: 'SqueezedOutStatus',
  reason: 'Transaction removed.',
};

export const MOCK_TX_SCRIPT_RAW_PAYLOAD =
  '0x000000000000000000000000000002ddc27a4ce0f152478cf32027140179d8a65aa85bae900a0054c5afdeb69503c4f00000000000000004000000000000000000000000000000090000000000000001000000000000000200000000000000012400000000000000000000000000000000000000000003770000000000000000a4d42cbb02adb32f5f3a9eab33a0ee7bdab8910ad9f615dfc86a7bb9e49a732b00000000000000005d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4effffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b627b411e4687c2f90d8a4779337b0e5f32b864e37c8630213f05fc682d34b680000000005f5e100000000000000000000000000000000000000000000000000000000000000000000000000000000025d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4efffffffffa0a1b88000000000000000000000000000000000000000000000000000000000000000000000000000000407eab045eaa91049cc09cf7fcb2c993e249d5775645fb5d4738cb5c30665983a348dab1e09dd66ac9b40f0e7be099e967a6d6380aaa6e3c1793b8630e998049d6';
export const MOCK_TX_CREATE_RAW_PAYLOAD =
  '0x00000000000000010000000000000000b100016b3e4e6c6ec572832e5cd9b5bd9162d1371f932ee28c5a61f5a8607f7e0000000000000000000000000000000900000000000000010000000000000002000000000000000200000000000000000000000000000754000000000000000002cc837ec4516621729d615acb83b4871b34b59772c9ad42674f24cbf232f25b0000000000000000a1bfd8f997bb7654af676f6d8a9ebda7eb1ab63426d7f3e5745fdc1672f0031000000000004c4b4000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000e00000000000000010000000000000000000000000000000000000000000000000000000000000004181c794f94f71f983a1cb57b18ee43be3d1d3a74aa2e3ed4c9e50687a18f015600000000000000000000000000000000000000000000000000000000000000000000000000000002a1bfd8f997bb7654af676f6d8a9ebda7eb1ab63426d7f3e5745fdc1672f0031000000000004c43ec00000000000000000000000000000000000000000000000000000000000000000000000000000594740000034700000000000000000003945dfcc00110fff3005d4060495d47f03213490440764800085d47f033134904407648007c5d47f03413490440764800bf72f0007b36f000001aec5000910001405d43f035104103005fec00005047b00f5e4410005d47f03610451300504bb010724c0020284914c05053b0505fec000a5045400f5e4410005057b03072440020285504405043b0605fec100c5045000f5c4bf0905e4520005047b0705e440000504910085c4ff0985e493000504910105c4ff0a05e4930005d4bf0155fed201150491020724c0010284944c050491030724c0020284954c05045105072480010284504805d43f0371041030072440010340004117240001034001ed05d43f038104103005d47f01672480010340114125043b0105d47f01772480020340114125d43f039104103005d47f01872480008340114125043b0705d47f01972480060340114125d43f03a104103005d47f01a72480010340114125043b0705c4100005d47f01b334110005d43f03b104103005d47f01c72480010340114125043b0105047b0d05d4bf0165fed201a5049100f5c4ff0905e493000504bb0e05c4ff0e85e493000504d20085c53f0f05e4d4000504d20105c53f0f85e4d40005d4ff0205fed301f504d202072500010284fb500504d203072500020284d05005041205072480010284114805043b0e05d47f02172480060340114125d43f03c104103005d47f02272480008340114125c43f090244000001aec5000910001305d40604a5d4900005d4d00015d43f035104103005fec00005047b00f5e4410005047b120725000102847b5005047b0305fec00065051100f5e5010005053b01072540020285105405057b0405fec10085041500f5c5bf0905e416000505bb0505e580000504160085c5ff0985e417000504160105c5ff0a05e4170005d43f0155fed000d50416020725c0010284115c0504160307244002028414440504160507244001028415440134124c05047b050134100007640000e5d43f03d104103005d4bf025724c0010340124135043b120504bb110724c0010284904c05d43f026724c0010340104935c43f090244000005043b0b072480060284114805d47f02772480060340114125d43f028364000001aec5000910000305d40604a5c450000504100085d4bf03e104923005d4ff03072500018340134947248002028ed04805d43f0315fed00045fed10055d43f03f104103001a44a0002dec04115c43f0902440000047000000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00fffffffffffffffffffffffffffff47616d65205374617465000000000000436f6e7472616374204964000000000047616d652052656647616d65205265662053636f726500004469726563742047616d6500000000005761732054727565010000000000000064000000000000000a000000000000000000000000018af8000000000000000200000000000000030000000000000004000000000000000500000000000000060000000000000007000000000000000865000000000000000c00000000000000030000000000000000000000000201570000000000000009000000000000000a48656c6c6f2054657374657200000000000000000000000d000000000000000e000000000000000cffffffffffff000048656c6c6f2066726f6d206d61696e20436f6e74726163740000000000000000000000000000000000000000000000000000000000000000000000000000000f00000000b1abb86f000000002151bd4b00000000fdbf0f6a0000000045b1551100000000000003b4000000000000039400000000000003d400000000000003e400000000000003f400000000000003fc000000000000040c000000000000041c00000000000004ac00000000000004dc00000000000004f400000000000000000000004041836759e99b4bd0b1a8d9a622e091bf15cbfe9f975dacc38334dfb084ced1c55d58b4e5b4072d22fd3279bf90b1f3bf6429ce4096626905037cccbc05bec7e4';
export const MOCK_TX_MINT_RAW_PAYLOAD =
  '0x0000000000000002000000000000000500000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001';
