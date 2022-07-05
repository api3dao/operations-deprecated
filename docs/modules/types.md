[@api3/operations](../README.md) / [Modules](../modules.md) / types

# Module: types

## Table of contents

### Type Aliases

- [Api](types.md#api)
- [ApiMetadata](types.md#apimetadata)
- [Apis](types.md#apis)
- [BasePolicy](types.md#basepolicy)
- [Beacon](types.md#beacon)
- [Beacons](types.md#beacons)
- [ChainDeploymentReferences](types.md#chaindeploymentreferences)
- [Chains](types.md#chains)
- [ChainsMetadata](types.md#chainsmetadata)
- [Dapis](types.md#dapis)
- [DeploymentSet](types.md#deploymentset)
- [Deployments](types.md#deployments)
- [Explorer](types.md#explorer)
- [ExtendedChainDescription](types.md#extendedchaindescription)
- [Oises](types.md#oises)
- [OperationsRepository](types.md#operationsrepository)
- [Policies](types.md#policies)
- [Policy](types.md#policy)
- [Secrets](types.md#secrets)
- [Template](types.md#template)
- [Templates](types.md#templates)
- [TopUpWalletSchema](types.md#topupwalletschema)
- [ValidationResult](types.md#validationresult)
- [WalletType](types.md#wallettype)

## Type Aliases

### Api

Ƭ **Api**: `z.infer`<typeof [`apiSchema`](utils_validation.md#apischema)\>

#### Defined in

[src/types.ts:35](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L35)

---

### ApiMetadata

Ƭ **ApiMetadata**: `z.infer`<typeof [`apiMetadataSchema`](utils_validation.md#apimetadataschema)\>

#### Defined in

[src/types.ts:34](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L34)

---

### Apis

Ƭ **Apis**: `z.infer`<typeof [`apisSchema`](utils_validation.md#apisschema)\>

#### Defined in

[src/types.ts:36](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L36)

---

### BasePolicy

Ƭ **BasePolicy**: `z.infer`<typeof [`basePolicySchema`](utils_validation.md#basepolicyschema)\>

#### Defined in

[src/types.ts:47](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L47)

---

### Beacon

Ƭ **Beacon**: `z.infer`<typeof [`beaconSchema`](utils_validation.md#beaconschema)\>

#### Defined in

[src/types.ts:27](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L27)

---

### Beacons

Ƭ **Beacons**: `z.infer`<typeof [`beaconsSchema`](utils_validation.md#beaconsschema)\>

#### Defined in

[src/types.ts:28](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L28)

---

### ChainDeploymentReferences

Ƭ **ChainDeploymentReferences**: `z.infer`<typeof
[`chainDeploymentReferencesSchema`](utils_validation.md#chaindeploymentreferencesschema)\>

#### Defined in

[src/types.ts:37](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L37)

---

### Chains

Ƭ **Chains**: `z.infer`<typeof [`chainsSchema`](utils_validation.md#chainsschema)\>

#### Defined in

[src/types.ts:39](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L39)

---

### ChainsMetadata

Ƭ **ChainsMetadata**: `z.infer`<typeof [`chainsMetadataSchema`](utils_validation.md#chainsmetadataschema)\>

#### Defined in

[src/types.ts:38](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L38)

---

### Dapis

Ƭ **Dapis**: `z.infer`<typeof [`dapisSchema`](utils_validation.md#dapisschema)\>

#### Defined in

[src/types.ts:40](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L40)

---

### DeploymentSet

Ƭ **DeploymentSet**: `z.infer`<typeof [`deploymentSetSchema`](utils_validation.md#deploymentsetschema)\>

#### Defined in

[src/types.ts:29](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L29)

---

### Deployments

Ƭ **Deployments**: `z.infer`<typeof [`deploymentsSchema`](utils_validation.md#deploymentsschema)\>

#### Defined in

[src/types.ts:30](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L30)

---

### Explorer

Ƭ **Explorer**: `z.infer`<typeof [`explorerSchema`](utils_validation.md#explorerschema)\>

#### Defined in

[src/types.ts:45](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L45)

---

### ExtendedChainDescription

Ƭ **ExtendedChainDescription**: `z.infer`<typeof
[`extendedChainDescriptionSchema`](utils_validation.md#extendedchaindescriptionschema)\>

#### Defined in

[src/types.ts:44](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L44)

---

### Oises

Ƭ **Oises**: `z.infer`<typeof [`oisesSchema`](utils_validation.md#oisesschema)\>

#### Defined in

[src/types.ts:33](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L33)

---

### OperationsRepository

Ƭ **OperationsRepository**: `z.infer`<typeof
[`operationsRepositorySchema`](utils_validation.md#operationsrepositoryschema)\>

#### Defined in

[src/types.ts:49](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L49)

---

### Policies

Ƭ **Policies**: `z.infer`<typeof [`policiesSchema`](utils_validation.md#policiesschema)\>

#### Defined in

[src/types.ts:46](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L46)

---

### Policy

Ƭ **Policy**: [`BasePolicy`](types.md#basepolicy) & { `dapiName?`: `string` ; `dataFeedId?`: `string` }

#### Defined in

[src/types.ts:51](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L51)

---

### Secrets

Ƭ **Secrets**: `z.infer`<typeof [`secretsSchema`](utils_validation.md#secretsschema)\>

#### Defined in

[src/types.ts:41](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L41)

---

### Template

Ƭ **Template**: `z.infer`<typeof [`templateSchema`](utils_validation.md#templateschema)\>

#### Defined in

[src/types.ts:31](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L31)

---

### Templates

Ƭ **Templates**: `z.infer`<typeof [`templatesSchema`](utils_validation.md#templatesschema)\>

#### Defined in

[src/types.ts:32](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L32)

---

### TopUpWalletSchema

Ƭ **TopUpWalletSchema**: `z.infer`<typeof [`topUpWalletSchema`](utils_validation.md#topupwalletschema)\>

#### Defined in

[src/types.ts:42](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L42)

---

### ValidationResult

Ƭ **ValidationResult**<`T`\>: [``true``, `T`] \| [`false`, `string`[]]

The output of Zod validation

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types.ts:59](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L59)

---

### WalletType

Ƭ **WalletType**: `z.infer`<typeof [`walletTypeSchema`](utils_validation.md#wallettypeschema)\>

#### Defined in

[src/types.ts:43](https://github.com/api3dao/operations/blob/0d61e4d/src/types.ts#L43)
