[@api3/operations](../README.md) / [Modules](../modules.md) / utils/validation

# Module: utils/validation

## Table of contents

### Variables

- [airkeeperDeploymentAWSSchema](utils_validation.md#airkeeperdeploymentawsschema)
- [airkeeperDeploymentSchema](utils_validation.md#airkeeperdeploymentschema)
- [airnodeDeploymentAWSSchema](utils_validation.md#airnodedeploymentawsschema)
- [airnodeDeploymentGCPSchema](utils_validation.md#airnodedeploymentgcpschema)
- [airnodeDeploymentSchema](utils_validation.md#airnodedeploymentschema)
- [api3Schema](utils_validation.md#api3schema)
- [apiMetadataSchema](utils_validation.md#apimetadataschema)
- [apiSchema](utils_validation.md#apischema)
- [apisSchema](utils_validation.md#apisschema)
- [basePolicySchema](utils_validation.md#basepolicyschema)
- [beaconMetadataSchema](utils_validation.md#beaconmetadataschema)
- [beaconSchema](utils_validation.md#beaconschema)
- [beaconSetsSchema](utils_validation.md#beaconsetsschema)
- [beaconsSchema](utils_validation.md#beaconsschema)
- [chainDeploymentReferencesSchema](utils_validation.md#chaindeploymentreferencesschema)
- [chainsMetadataContractsSchema](utils_validation.md#chainsmetadatacontractsschema)
- [chainsMetadataSchema](utils_validation.md#chainsmetadataschema)
- [chainsSchema](utils_validation.md#chainsschema)
- [commonLogosSchema](utils_validation.md#commonlogosschema)
- [dapiMetadataSchema](utils_validation.md#dapimetadataschema)
- [dapiPolicySchema](utils_validation.md#dapipolicyschema)
- [dapisSchema](utils_validation.md#dapisschema)
- [dataFeedPolicySchema](utils_validation.md#datafeedpolicyschema)
- [deploymentSetSchema](utils_validation.md#deploymentsetschema)
- [deploymentsSchema](utils_validation.md#deploymentsschema)
- [evmAddressSchema](utils_validation.md#evmaddressschema)
- [evmBeaconIdSchema](utils_validation.md#evmbeaconidschema)
- [evmEndpointIdSchema](utils_validation.md#evmendpointidschema)
- [evmTemplateIdSchema](utils_validation.md#evmtemplateidschema)
- [evmXpubSchema](utils_validation.md#evmxpubschema)
- [explorerSchema](utils_validation.md#explorerschema)
- [extendedChainDescriptionSchema](utils_validation.md#extendedchaindescriptionschema)
- [oisesSchema](utils_validation.md#oisesschema)
- [operationsRepositorySchema](utils_validation.md#operationsrepositoryschema)
- [policiesSchema](utils_validation.md#policiesschema)
- [pricingCoverageSchema](utils_validation.md#pricingcoverageschema)
- [secretsSchema](utils_validation.md#secretsschema)
- [templateDecodedParametersSchema](utils_validation.md#templatedecodedparametersschema)
- [templateSchema](utils_validation.md#templateschema)
- [templatesSchema](utils_validation.md#templatesschema)
- [topUpWalletSchema](utils_validation.md#topupwalletschema)
- [walletTypeSchema](utils_validation.md#wallettypeschema)

### Functions

- [replaceInterpolatedVariables](utils_validation.md#replaceinterpolatedvariables)
- [validate](utils_validation.md#validate)

## Variables

### airkeeperDeploymentAWSSchema

• `Const` **airkeeperDeploymentAWSSchema**: `ZodObject`<{ `airkeeper`: `ZodOptional`<`ZodAny`\> ; `aws`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> ; `config`:
`ZodOptional`<`ZodAny`\> ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` },
`"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string`
}\>\> }, `"strip"`, `ZodTypeAny`, { `airkeeper`: `any` ; `aws`: `undefined` \| { filename: string; content: string; } ;
`config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, { `airkeeper`: `any` ; `aws`:
`undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string;
content: string; } }\>

Airkeeper AWS Deployment Schema

Describes an Airkeeper deployment to AWS

#### Defined in

[src/utils/validation.ts:147](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L147)

---

### airkeeperDeploymentSchema

• `Const` **airkeeperDeploymentSchema**: `ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `airkeeper`:
`ZodOptional`<`ZodAny`\> ; `aws`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` },
`"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string`
}\>\> ; `config`: `ZodOptional`<`ZodAny`\> ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`:
`ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ;
`filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, { `airkeeper`: `any` ; `aws`: `undefined` \| { filename: string;
content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, {
`airkeeper`: `any` ; `aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`:
`undefined` \| { filename: string; content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| {
config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string; content: string;
} \| undefined; airkeeper?: any; } }, { `aws`: `undefined` \| { config?: any; secrets?: { filename: string; content:
string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; airkeeper?: any; } }\>

Airkeeper Deployment Schema

Describes an Airkeeper deployment

#### Defined in

[src/utils/validation.ts:159](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L159)

---

### airnodeDeploymentAWSSchema

• `Const` **airnodeDeploymentAWSSchema**: `ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ;
`filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`:
`string` ; `filename`: `string` }\>\> ; `config`: `ZodAny` ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`:
`ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, {
`content`: `string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { filename: string;
content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, { `aws`:
`undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string;
content: string; } }\>

Airnode AWS Deployment Schema

Describes an Airnode deployment to AWS

#### Defined in

[src/utils/validation.ts:115](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L115)

---

### airnodeDeploymentGCPSchema

• `Const` **airnodeDeploymentGCPSchema**: `ZodObject`<{ `config`: `ZodAny` ; `gcp`: `ZodOptional`<`ZodAny`\> ;
`secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, {
`content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strip"`,
`ZodTypeAny`, { `config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, {
`config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }\>

Airnode GCP Deployment Schema

Describes an Airnode deployment to GCP

#### Defined in

[src/utils/validation.ts:126](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L126)

---

### airnodeDeploymentSchema

• `Const` **airnodeDeploymentSchema**: `ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `aws`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> ; `config`: `ZodAny` ; `secrets`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, {
`aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename:
string; content: string; } }, { `aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ;
`secrets`: `undefined` \| { filename: string; content: string; } }\>\> ; `gcp`: `ZodOptional`<`ZodObject`<{ `config`:
`ZodAny` ; `gcp`: `ZodOptional`<`ZodAny`\> ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`:
`ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ;
`filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, { `config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| {
filename: string; content: string; } }, { `config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| { filename: string;
content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { config?: any; secrets?: { filename:
string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; } ; `gcp`:
`undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?: any; } }, { `aws`:
`undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string;
content: string; } \| undefined; } ; `gcp`: `undefined` \| { config?: any; secrets?: { filename: string; content:
string; } \| undefined; gcp?: any; } }\>

Airnode Deployment Schema

Describes an optional set of Airnode deployments

#### Defined in

[src/utils/validation.ts:137](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L137)

---

### api3Schema

• `Const` **api3Schema**: `ZodObject`<{ `airseeker`: `ZodRecord`<`ZodString`, `ZodObject`<{ `airseeker`: `ZodAny` ;
`secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, {
`content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strict"`,
`ZodTypeAny`, { `airseeker`: `any` ; `secrets`: `undefined` \| { `content`: `string` ; `filename`: `string` } }, {
`airseeker`: `any` ; `secrets`: `undefined` \| { `content`: `string` ; `filename`: `string` } }\>\> =
airseekerDeploymentsSchema }, `"strict"`, `ZodTypeAny`, { `airseeker`: `Record`<`string`, { secrets?: { filename:
string; content: string; } \| undefined; airseeker?: any; }\> = airseekerDeploymentsSchema }, { `airseeker`:
`Record`<`string`, { secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\> =
airseekerDeploymentsSchema }\>

#### Defined in

[src/utils/validation.ts:330](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L330)

---

### apiMetadataSchema

• `Const` **apiMetadataSchema**: `ZodObject`<{ `active`: `ZodBoolean` ; `airnode`: `ZodString` = evmAddressSchema;
`description`: `ZodString` ; `homepage`: `ZodString` ; `logoPath`: `ZodString` ; `maxSubscriptionPeriod`: `ZodNumber` ;
`name`: `ZodString` ; `orderLogoPath`: `ZodOptional`<`ZodString`\> ; `xpub`: `ZodString` = evmXpubSchema }, `"strict"`,
`ZodTypeAny`, { `active`: `boolean` ; `airnode`: `string` = evmAddressSchema; `description`: `string` ; `homepage`:
`string` ; `logoPath`: `string` ; `maxSubscriptionPeriod`: `number` ; `name`: `string` ; `orderLogoPath`: `undefined` \|
`string` ; `xpub`: `string` = evmXpubSchema }, { `active`: `boolean` ; `airnode`: `string` = evmAddressSchema;
`description`: `string` ; `homepage`: `string` ; `logoPath`: `string` ; `maxSubscriptionPeriod`: `number` ; `name`:
`string` ; `orderLogoPath`: `undefined` \| `string` ; `xpub`: `string` = evmXpubSchema }\>

API Provider Metadata Schema

The API provider metadata provides information about an API provider.

**`Param`**

A UI-suitably formatted name for the provider

**`Param`**

Whether any of the provider's beacons are active

**`Param`**

A UI-suitably formatted description of the API provider

**`Param`**

The API provider's homepage

**`Param`**

The API Provider's Airnode address, see:
https://docs.api3.org/airnode/latest/reference/packages/admin-cli.html#derive-airnode-address

**`Param`**

The extended public key of the API Provider's Airnode, see:
https://docs.api3.org/airnode/latest/reference/packages/admin-cli.html#derive-airnode-xpub

**`Param`**

The API Provider's web-accessible logo as a URL

**`Param`**

An alternative logo for the API Provider for light backgrounds

**`Param`**

The maximum period that a requester contract may be allowed to read from the API provider's beacons in months

#### Defined in

[src/utils/validation.ts:241](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L241)

---

### apiSchema

• `Const` **apiSchema**: `ZodEffects`<`ZodEffects`<`ZodObject`<{ `apiMetadata`: `ZodObject`<{ `active`: `ZodBoolean` ;
`airnode`: `ZodString` = evmAddressSchema; `description`: `ZodString` ; `homepage`: `ZodString` ; `logoPath`:
`ZodString` ; `maxSubscriptionPeriod`: `ZodNumber` ; `name`: `ZodString` ; `orderLogoPath`: `ZodOptional`<`ZodString`\>
; `xpub`: `ZodString` = evmXpubSchema }, `"strict"`, `ZodTypeAny`, { `active`: `boolean` ; `airnode`: `string` =
evmAddressSchema; `description`: `string` ; `homepage`: `string` ; `logoPath`: `string` ; `maxSubscriptionPeriod`:
`number` ; `name`: `string` ; `orderLogoPath`: `undefined` \| `string` ; `xpub`: `string` = evmXpubSchema }, { `active`:
`boolean` ; `airnode`: `string` = evmAddressSchema; `description`: `string` ; `homepage`: `string` ; `logoPath`:
`string` ; `maxSubscriptionPeriod`: `number` ; `name`: `string` ; `orderLogoPath`: `undefined` \| `string` ; `xpub`:
`string` = evmXpubSchema }\> = apiMetadataSchema; `beacons`: `ZodRecord`<`ZodString`, `ZodObject`<{ `airnodeAddress`:
`ZodString` = evmAddressSchema; `beaconId`: `ZodString` = evmBeaconIdSchema; `chains`: `ZodRecord`<`ZodString`,
`ZodObject`<{ `active`: `ZodBoolean` ; `airseekerConfig`: `ZodOptional`<`ZodObject`<{ `deviationThreshold`: `ZodNumber`
; `heartbeatInterval`: `ZodNumber` ; `updateInterval`: `ZodNumber` }, `"strip"`, `ZodTypeAny`, { `deviationThreshold`:
`number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` }, { `deviationThreshold`: `number` ;
`heartbeatInterval`: `number` ; `updateInterval`: `number` }\>\> ; `displayDisabled`: `ZodOptional`<`ZodBoolean`\> ;
`sponsor`: `ZodString` ; `topUpWallets`: `ZodArray`<`ZodObject`<{ `address`: `ZodOptional`<`ZodString`\> ; `walletType`:
`ZodEnum`<[``"Provider"``, ``"API3"``, ``"Provider-Sponsor"``, ``"API3-Sponsor"``]\> = walletTypeSchema }, `"strict"`,
`ZodTypeAny`, { `address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \|
`"API3-Sponsor"` = walletTypeSchema }, { `address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \|
`"Provider-Sponsor"` \| `"API3-Sponsor"` = walletTypeSchema }\>, `"many"`\> ; `updateConditionPercentage`:
`ZodOptional`<`ZodNumber`\> }, `"strict"`, `ZodTypeAny`, { `active`: `boolean` ; `airseekerConfig`: `undefined` \| {
`deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` } ; `displayDisabled`:
`undefined` \| `boolean` ; `sponsor`: `string` ; `topUpWallets`: { address?: string \| undefined; walletType: "Provider"
\| "API3" \| "Provider-Sponsor" \| "API3-Sponsor"; }[] ; `updateConditionPercentage`: `undefined` \| `number` }, {
`active`: `boolean` ; `airseekerConfig`: `undefined` \| { `deviationThreshold`: `number` ; `heartbeatInterval`: `number`
; `updateInterval`: `number` } ; `displayDisabled`: `undefined` \| `boolean` ; `sponsor`: `string` ; `topUpWallets`: {
address?: string \| undefined; walletType: "Provider" \| "API3" \| "Provider-Sponsor" \| "API3-Sponsor"; }[] ;
`updateConditionPercentage`: `undefined` \| `number` }\>\> ; `description`: `ZodString` ; `name`: `ZodString` ;
`templateId`: `ZodString` = evmTemplateIdSchema }, `"strict"`, `ZodTypeAny`, { `airnodeAddress`: `string` =
evmAddressSchema; `beaconId`: `string` = evmBeaconIdSchema; `chains`: `Record`<`string`, { updateConditionPercentage?:
number \| undefined; displayDisabled?: boolean \| undefined; airseekerConfig?: { deviationThreshold: number;
heartbeatInterval: number; updateInterval: number; } \| undefined; active: boolean; sponsor: string; topUpWallets: {
...; }[]; }\> ; `description`: `string` ; `name`: `string` ; `templateId`: `string` = evmTemplateIdSchema }, {
`airnodeAddress`: `string` = evmAddressSchema; `beaconId`: `string` = evmBeaconIdSchema; `chains`: `Record`<`string`, {
updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined; airseekerConfig?: {
deviationThreshold: number; heartbeatInterval: number; updateInterval: number; } \| undefined; active: boolean; sponsor:
string; topUpWallets: { ...; }[]; }\> ; `description`: `string` ; `name`: `string` ; `templateId`: `string` =
evmTemplateIdSchema }\>\> = beaconsSchema; `deployments`: `ZodRecord`<`ZodString`, `ZodObject`<{ `airkeeper`:
`ZodOptional`<`ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `airkeeper`: `ZodOptional`<`ZodAny`\> ; `aws`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> ; `config`:
`ZodOptional`<`ZodAny`\> ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` },
`"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string`
}\>\> }, `"strip"`, `ZodTypeAny`, { `airkeeper`: `any` ; `aws`: `undefined` \| { filename: string; content: string; } ;
`config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, { `airkeeper`: `any` ; `aws`:
`undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string;
content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { config?: any; secrets?: { filename:
string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; airkeeper?: any; }
}, { `aws`: `undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: {
filename: string; content: string; } \| undefined; airkeeper?: any; } }\>\> ; `airnode`: `ZodObject`<{ `aws`:
`ZodOptional`<`ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` },
`"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string`
}\>\> ; `config`: `ZodAny` ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` },
`"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string`
}\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ;
`secrets`: `undefined` \| { filename: string; content: string; } }, { `aws`: `undefined` \| { filename: string; content:
string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }\>\> ; `gcp`:
`ZodOptional`<`ZodObject`<{ `config`: `ZodAny` ; `gcp`: `ZodOptional`<`ZodAny`\> ; `secrets`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, {
`config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, { `config`: `any` ;
`gcp`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, {
`aws`: `undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename:
string; content: string; } \| undefined; } ; `gcp`: `undefined` \| { config?: any; secrets?: { filename: string;
content: string; } \| undefined; gcp?: any; } }, { `aws`: `undefined` \| { config?: any; secrets?: { filename: string;
content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; } ; `gcp`: `undefined` \| {
config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?: any; } }\> = airnodeDeploymentSchema
}, `"strip"`, `ZodTypeAny`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: { filename: string; content:
string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; airkeeper?: any; } \| undefined; } ;
`airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename:
string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?: { filename: string; content:
string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }, { `airkeeper`: `undefined` \| { aws?:
{ config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string; content:
string; } \| undefined; airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename:
string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined;
gcp?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } =
airnodeDeploymentSchema }\>\> = deploymentsSchema; `ois`: `ZodRecord`<`ZodString`,
`ZodEffects`<`ZodEffects`<`ZodObject`<{ `apiSpecifications`: `ZodEffects`<`ZodObject`<{ `components`: `ZodObject`<{
`securitySchemes`: `ZodRecord`<`ZodString`, `ZodDiscriminatedUnion`<`"type"`, `Primitive`, `ZodObject`<{ `scheme`:
`ZodUnion`<[`ZodLiteral`<``"bearer"``\>, `ZodLiteral`<``"basic"``\>]\> ; `type`: `ZodLiteral`<`"http"`\> }, `"strict"`,
`ZodTypeAny`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` }, { `scheme`: `"bearer"` \| `"basic"` ; `type`:
`"http"` }\> \| `ZodObject`<`extendShape`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>]\> ; `name`: `ZodString` }, { `type`: `ZodLiteral`<`"apiKey"`\> }\>, `"strict"`,
`ZodTypeAny`, { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` }, { `in`: `"query"`
\| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` }\> \| `ZodObject`<`extendShape`<{ `in`:
`ZodUnion`<[`ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>, `ZodLiteral`<``"cookie"``\>]\> ; `name`:
`ZodString` }, { `type`: `ZodLiteral`<`"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"`\> }\>, `"strict"`, `ZodTypeAny`, { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }, { `in`: `"query"` \| `"header"`
\| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\>\>\> }, `"strict"`, `ZodTypeAny`, { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> }, { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> }\> ; `paths`:
`ZodEffects`<`ZodEffects`<`ZodRecord`<`ZodString`, `ZodRecord`<`ZodUnion`<[`ZodLiteral`<``"get"``\>,
`ZodLiteral`<``"post"``\>]\>, `ZodObject`<{ `parameters`: `ZodArray`<`ZodObject`<{ `in`:
`ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\>,
`"many"`\> }, `"strict"`, `ZodTypeAny`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[]
}\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>\>, `Record`<`string`,
`Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[]
}\>\>\>\> ; `security`: `ZodRecord`<`ZodString`, `ZodTuple`<[], `null`\>\> ; `servers`: `ZodArray`<`ZodObject`<{ `url`:
`ZodString` }, `"strict"`, `ZodTypeAny`, { `url`: `string` }, { `url`: `string` }\>, `"many"`\> }, `"strict"`,
`ZodTypeAny`, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`:
`"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }\>, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }\> ; `endpoints`: `ZodArray`<`ZodObject`<{ `description`: `ZodOptional`<`ZodString`\> ;
`externalDocs`: `ZodOptional`<`ZodString`\> ; `fixedOperationParameters`: `ZodArray`<`ZodObject`<{ `operationParameter`:
`ZodObject`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\> ;
`value`: `ZodString` }, `"strict"`, `ZodTypeAny`, { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \|
`"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }, { `operationParameter`: { `in`: `"path"` \|
`"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }\>, `"many"`\> ;
`name`: `ZodString` ; `operation`: `ZodObject`<{ `method`: `ZodUnion`<[`ZodLiteral`<``"get"``\>,
`ZodLiteral`<``"post"``\>]\> ; `path`: `ZodString` }, `"strict"`, `ZodTypeAny`, { `method`: `"get"` \| `"post"` ;
`path`: `string` }, { `method`: `"get"` \| `"post"` ; `path`: `string` }\> ; `parameters`:
`ZodEffects`<`ZodArray`<`ZodObject`<{ `default`: `ZodOptional`<`ZodString`\> ; `description`:
`ZodOptional`<`ZodString`\> ; `example`: `ZodOptional`<`ZodString`\> ; `name`: `ZodString` ; `operationParameter`:
`ZodObject`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\> ;
`required`: `ZodOptional`<`ZodBoolean`\> }, `"strict"`, `ZodTypeAny`, { `default?`: `string` ; `description?`: `string`
; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \|
`"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }, { `default?`: `string` ; `description?`:
`string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }\>, `"many"`\>, { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[], { `default?`: `string`
; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \|
`"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[]\> ;
`postProcessingSpecifications`: `ZodOptional`<`ZodArray`<`ZodObject`<{ `environment`: `ZodUnion`<[`ZodLiteral`<``"Node
14"``\>, `ZodLiteral`<``"Node 14 async"``\>]\> ; `timeoutMs`: `ZodNumber` ; `value`: `ZodString` }, `"strict"`,
`ZodTypeAny`, { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }, {
`environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }\>, `"many"`\>\> ;
`preProcessingSpecifications`: `ZodOptional`<`ZodArray`<`ZodObject`<{ `environment`: `ZodUnion`<[`ZodLiteral`<``"Node
14"``\>, `ZodLiteral`<``"Node 14 async"``\>]\> ; `timeoutMs`: `ZodNumber` ; `value`: `ZodString` }, `"strict"`,
`ZodTypeAny`, { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }, {
`environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }\>, `"many"`\>\> ;
`reservedParameters`: `ZodArray`<`ZodEffects`<`ZodObject`<{ `default`: `ZodOptional`<`ZodString`\> ; `fixed`:
`ZodOptional`<`ZodString`\> ; `name`: `ZodUnion`<[`ZodLiteral`<``"_type"``\>, `ZodLiteral`<``"_path"``\>,
`ZodLiteral`<``"_times"``\>]\> }, `"strict"`, `ZodTypeAny`, { `default?`: `string` ; `fixed?`: `string` ; `name`:
`"_type"` \| `"_path"` \| `"_times"` }, { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \|
`"_times"` }\>, { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }, {
`default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }\>, `"many"`\> ; `summary`:
`ZodOptional`<`ZodString`\> }, `"strict"`, `ZodTypeAny`, { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }, {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }\>, `"many"`\> ; `oisFormat`: `ZodEffects`<`ZodString`, `string`,
`string`\> ; `title`: `ZodString` ; `version`: `ZodEffects`<`ZodString`, `string`, `string`\> }, `"strict"`,
`ZodTypeAny`, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \|
`"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"`
} \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"`
\| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"`
; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| {
`in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"`
; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| {
`in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>\> = oisesSchema; `templates`: `ZodRecord`<`ZodString`, `ZodObject`<{ `decodedParameters`: `ZodArray`<`ZodObject`<{
`name`: `ZodString` ; `type`: `ZodString` ; `value`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `name`: `string` ;
`type`: `string` ; `value`: `string` }, { `name`: `string` ; `type`: `string` ; `value`: `string` }\>, `"many"`\> ;
`endpointId`: `ZodString` = evmEndpointIdSchema; `name`: `ZodString` ; `parameters`: `ZodString` ; `templateId`:
`ZodString` = evmTemplateIdSchema }, `"strict"`, `ZodTypeAny`, { `decodedParameters`: { `name`: `string` ; `type`:
`string` ; `value`: `string` }[] ; `endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`:
`string` ; `templateId`: `string` = evmTemplateIdSchema }, { `decodedParameters`: { `name`: `string` ; `type`: `string`
; `value`: `string` }[] ; `endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`: `string` ;
`templateId`: `string` = evmTemplateIdSchema }\>\> = templatesSchema }, `"strict"`, `ZodTypeAny`, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }\>, { `apiMetadata`:
{ orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }\>, { `apiMetadata`:
{ orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }\>

API Schema

Data describing an API provider's on-chain services.

#### Defined in

[src/utils/validation.ts:260](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L260)

---

### apisSchema

• `Const` **apisSchema**: `ZodRecord`<`ZodString`, `ZodEffects`<`ZodEffects`<`ZodObject`<{ `apiMetadata`: `ZodObject`<{
`active`: `ZodBoolean` ; `airnode`: `ZodString` = evmAddressSchema; `description`: `ZodString` ; `homepage`: `ZodString`
; `logoPath`: `ZodString` ; `maxSubscriptionPeriod`: `ZodNumber` ; `name`: `ZodString` ; `orderLogoPath`:
`ZodOptional`<`ZodString`\> ; `xpub`: `ZodString` = evmXpubSchema }, `"strict"`, `ZodTypeAny`, { `active`: `boolean` ;
`airnode`: `string` = evmAddressSchema; `description`: `string` ; `homepage`: `string` ; `logoPath`: `string` ;
`maxSubscriptionPeriod`: `number` ; `name`: `string` ; `orderLogoPath`: `undefined` \| `string` ; `xpub`: `string` =
evmXpubSchema }, { `active`: `boolean` ; `airnode`: `string` = evmAddressSchema; `description`: `string` ; `homepage`:
`string` ; `logoPath`: `string` ; `maxSubscriptionPeriod`: `number` ; `name`: `string` ; `orderLogoPath`: `undefined` \|
`string` ; `xpub`: `string` = evmXpubSchema }\> = apiMetadataSchema; `beacons`: `ZodRecord`<`ZodString`, `ZodObject`<{
`airnodeAddress`: `ZodString` = evmAddressSchema; `beaconId`: `ZodString` = evmBeaconIdSchema; `chains`:
`ZodRecord`<`ZodString`, `ZodObject`<{ `active`: `ZodBoolean` ; `airseekerConfig`: `ZodOptional`<`ZodObject`<{
`deviationThreshold`: `ZodNumber` ; `heartbeatInterval`: `ZodNumber` ; `updateInterval`: `ZodNumber` }, `"strip"`,
`ZodTypeAny`, { `deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` }, {
`deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` }\>\> ; `displayDisabled`:
`ZodOptional`<`ZodBoolean`\> ; `sponsor`: `ZodString` ; `topUpWallets`: `ZodArray`<`ZodObject`<{ `address`:
`ZodOptional`<`ZodString`\> ; `walletType`: `ZodEnum`<[``"Provider"``, ``"API3"``, ``"Provider-Sponsor"``,
``"API3-Sponsor"``]\> = walletTypeSchema }, `"strict"`, `ZodTypeAny`, { `address`: `undefined` \| `string` ;
`walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \| `"API3-Sponsor"` = walletTypeSchema }, { `address`:
`undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \| `"API3-Sponsor"` =
walletTypeSchema }\>, `"many"`\> ; `updateConditionPercentage`: `ZodOptional`<`ZodNumber`\> }, `"strict"`, `ZodTypeAny`,
{ `active`: `boolean` ; `airseekerConfig`: `undefined` \| { `deviationThreshold`: `number` ; `heartbeatInterval`:
`number` ; `updateInterval`: `number` } ; `displayDisabled`: `undefined` \| `boolean` ; `sponsor`: `string` ;
`topUpWallets`: { address?: string \| undefined; walletType: "Provider" \| "API3" \| "Provider-Sponsor" \|
"API3-Sponsor"; }[] ; `updateConditionPercentage`: `undefined` \| `number` }, { `active`: `boolean` ; `airseekerConfig`:
`undefined` \| { `deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` } ;
`displayDisabled`: `undefined` \| `boolean` ; `sponsor`: `string` ; `topUpWallets`: { address?: string \| undefined;
walletType: "Provider" \| "API3" \| "Provider-Sponsor" \| "API3-Sponsor"; }[] ; `updateConditionPercentage`: `undefined`
\| `number` }\>\> ; `description`: `ZodString` ; `name`: `ZodString` ; `templateId`: `ZodString` = evmTemplateIdSchema
}, `"strict"`, `ZodTypeAny`, { `airnodeAddress`: `string` = evmAddressSchema; `beaconId`: `string` = evmBeaconIdSchema;
`chains`: `Record`<`string`, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { deviationThreshold: number; heartbeatInterval: number; updateInterval: number; } \| undefined;
active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\> ; `description`: `string` ; `name`: `string` ;
`templateId`: `string` = evmTemplateIdSchema }, { `airnodeAddress`: `string` = evmAddressSchema; `beaconId`: `string` =
evmBeaconIdSchema; `chains`: `Record`<`string`, { updateConditionPercentage?: number \| undefined; displayDisabled?:
boolean \| undefined; airseekerConfig?: { deviationThreshold: number; heartbeatInterval: number; updateInterval: number;
} \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\> ; `description`: `string` ; `name`:
`string` ; `templateId`: `string` = evmTemplateIdSchema }\>\> = beaconsSchema; `deployments`: `ZodRecord`<`ZodString`,
`ZodObject`<{ `airkeeper`: `ZodOptional`<`ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `airkeeper`:
`ZodOptional`<`ZodAny`\> ; `aws`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` },
`"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string`
}\>\> ; `config`: `ZodOptional`<`ZodAny`\> ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`:
`ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ;
`filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, { `airkeeper`: `any` ; `aws`: `undefined` \| { filename: string;
content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, {
`airkeeper`: `any` ; `aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`:
`undefined` \| { filename: string; content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| {
config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string; content: string;
} \| undefined; airkeeper?: any; } }, { `aws`: `undefined` \| { config?: any; secrets?: { filename: string; content:
string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; airkeeper?: any; } }\>\> ; `airnode`:
`ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`:
`ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ;
`filename`: `string` }\>\> ; `config`: `ZodAny` ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ;
`filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`:
`string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { filename: string; content:
string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, { `aws`: `undefined`
\| { filename: string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string; content:
string; } }\>\> ; `gcp`: `ZodOptional`<`ZodObject`<{ `config`: `ZodAny` ; `gcp`: `ZodOptional`<`ZodAny`\> ; `secrets`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, {
`config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, { `config`: `any` ;
`gcp`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, {
`aws`: `undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename:
string; content: string; } \| undefined; } ; `gcp`: `undefined` \| { config?: any; secrets?: { filename: string;
content: string; } \| undefined; gcp?: any; } }, { `aws`: `undefined` \| { config?: any; secrets?: { filename: string;
content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; } ; `gcp`: `undefined` \| {
config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?: any; } }\> = airnodeDeploymentSchema
}, `"strip"`, `ZodTypeAny`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: { filename: string; content:
string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; airkeeper?: any; } \| undefined; } ;
`airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename:
string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?: { filename: string; content:
string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }, { `airkeeper`: `undefined` \| { aws?:
{ config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string; content:
string; } \| undefined; airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename:
string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined;
gcp?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } =
airnodeDeploymentSchema }\>\> = deploymentsSchema; `ois`: `ZodRecord`<`ZodString`,
`ZodEffects`<`ZodEffects`<`ZodObject`<{ `apiSpecifications`: `ZodEffects`<`ZodObject`<{ `components`: `ZodObject`<{
`securitySchemes`: `ZodRecord`<`ZodString`, `ZodDiscriminatedUnion`<`"type"`, `Primitive`, `ZodObject`<{ `scheme`:
`ZodUnion`<[`ZodLiteral`<``"bearer"``\>, `ZodLiteral`<``"basic"``\>]\> ; `type`: `ZodLiteral`<`"http"`\> }, `"strict"`,
`ZodTypeAny`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` }, { `scheme`: `"bearer"` \| `"basic"` ; `type`:
`"http"` }\> \| `ZodObject`<`extendShape`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>]\> ; `name`: `ZodString` }, { `type`: `ZodLiteral`<`"apiKey"`\> }\>, `"strict"`,
`ZodTypeAny`, { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` }, { `in`: `"query"`
\| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` }\> \| `ZodObject`<`extendShape`<{ `in`:
`ZodUnion`<[`ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>, `ZodLiteral`<``"cookie"``\>]\> ; `name`:
`ZodString` }, { `type`: `ZodLiteral`<`"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"`\> }\>, `"strict"`, `ZodTypeAny`, { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }, { `in`: `"query"` \| `"header"`
\| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\>\>\> }, `"strict"`, `ZodTypeAny`, { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> }, { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> }\> ; `paths`:
`ZodEffects`<`ZodEffects`<`ZodRecord`<`ZodString`, `ZodRecord`<`ZodUnion`<[`ZodLiteral`<``"get"``\>,
`ZodLiteral`<``"post"``\>]\>, `ZodObject`<{ `parameters`: `ZodArray`<`ZodObject`<{ `in`:
`ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\>,
`"many"`\> }, `"strict"`, `ZodTypeAny`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[]
}\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>\>, `Record`<`string`,
`Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[]
}\>\>\>\> ; `security`: `ZodRecord`<`ZodString`, `ZodTuple`<[], `null`\>\> ; `servers`: `ZodArray`<`ZodObject`<{ `url`:
`ZodString` }, `"strict"`, `ZodTypeAny`, { `url`: `string` }, { `url`: `string` }\>, `"many"`\> }, `"strict"`,
`ZodTypeAny`, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`:
`"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }\>, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }\> ; `endpoints`: `ZodArray`<`ZodObject`<{ `description`: `ZodOptional`<`ZodString`\> ;
`externalDocs`: `ZodOptional`<`ZodString`\> ; `fixedOperationParameters`: `ZodArray`<`ZodObject`<{ `operationParameter`:
`ZodObject`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\> ;
`value`: `ZodString` }, `"strict"`, `ZodTypeAny`, { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \|
`"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }, { `operationParameter`: { `in`: `"path"` \|
`"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }\>, `"many"`\> ;
`name`: `ZodString` ; `operation`: `ZodObject`<{ `method`: `ZodUnion`<[`ZodLiteral`<``"get"``\>,
`ZodLiteral`<``"post"``\>]\> ; `path`: `ZodString` }, `"strict"`, `ZodTypeAny`, { `method`: `"get"` \| `"post"` ;
`path`: `string` }, { `method`: `"get"` \| `"post"` ; `path`: `string` }\> ; `parameters`:
`ZodEffects`<`ZodArray`<`ZodObject`<{ `default`: `ZodOptional`<`ZodString`\> ; `description`:
`ZodOptional`<`ZodString`\> ; `example`: `ZodOptional`<`ZodString`\> ; `name`: `ZodString` ; `operationParameter`:
`ZodObject`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\> ;
`required`: `ZodOptional`<`ZodBoolean`\> }, `"strict"`, `ZodTypeAny`, { `default?`: `string` ; `description?`: `string`
; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \|
`"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }, { `default?`: `string` ; `description?`:
`string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }\>, `"many"`\>, { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[], { `default?`: `string`
; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \|
`"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[]\> ;
`postProcessingSpecifications`: `ZodOptional`<`ZodArray`<`ZodObject`<{ `environment`: `ZodUnion`<[`ZodLiteral`<``"Node
14"``\>, `ZodLiteral`<``"Node 14 async"``\>]\> ; `timeoutMs`: `ZodNumber` ; `value`: `ZodString` }, `"strict"`,
`ZodTypeAny`, { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }, {
`environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }\>, `"many"`\>\> ;
`preProcessingSpecifications`: `ZodOptional`<`ZodArray`<`ZodObject`<{ `environment`: `ZodUnion`<[`ZodLiteral`<``"Node
14"``\>, `ZodLiteral`<``"Node 14 async"``\>]\> ; `timeoutMs`: `ZodNumber` ; `value`: `ZodString` }, `"strict"`,
`ZodTypeAny`, { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }, {
`environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }\>, `"many"`\>\> ;
`reservedParameters`: `ZodArray`<`ZodEffects`<`ZodObject`<{ `default`: `ZodOptional`<`ZodString`\> ; `fixed`:
`ZodOptional`<`ZodString`\> ; `name`: `ZodUnion`<[`ZodLiteral`<``"_type"``\>, `ZodLiteral`<``"_path"``\>,
`ZodLiteral`<``"_times"``\>]\> }, `"strict"`, `ZodTypeAny`, { `default?`: `string` ; `fixed?`: `string` ; `name`:
`"_type"` \| `"_path"` \| `"_times"` }, { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \|
`"_times"` }\>, { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }, {
`default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }\>, `"many"`\> ; `summary`:
`ZodOptional`<`ZodString`\> }, `"strict"`, `ZodTypeAny`, { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }, {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }\>, `"many"`\> ; `oisFormat`: `ZodEffects`<`ZodString`, `string`,
`string`\> ; `title`: `ZodString` ; `version`: `ZodEffects`<`ZodString`, `string`, `string`\> }, `"strict"`,
`ZodTypeAny`, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \|
`"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"`
} \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"`
\| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"`
; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| {
`in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"`
; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| {
`in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>\> = oisesSchema; `templates`: `ZodRecord`<`ZodString`, `ZodObject`<{ `decodedParameters`: `ZodArray`<`ZodObject`<{
`name`: `ZodString` ; `type`: `ZodString` ; `value`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `name`: `string` ;
`type`: `string` ; `value`: `string` }, { `name`: `string` ; `type`: `string` ; `value`: `string` }\>, `"many"`\> ;
`endpointId`: `ZodString` = evmEndpointIdSchema; `name`: `ZodString` ; `parameters`: `ZodString` ; `templateId`:
`ZodString` = evmTemplateIdSchema }, `"strict"`, `ZodTypeAny`, { `decodedParameters`: { `name`: `string` ; `type`:
`string` ; `value`: `string` }[] ; `endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`:
`string` ; `templateId`: `string` = evmTemplateIdSchema }, { `decodedParameters`: { `name`: `string` ; `type`: `string`
; `value`: `string` }[] ; `endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`: `string` ;
`templateId`: `string` = evmTemplateIdSchema }\>\> = templatesSchema }, `"strict"`, `ZodTypeAny`, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }\>, { `apiMetadata`:
{ orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }\>, { `apiMetadata`:
{ orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }\>\>

#### Defined in

[src/utils/validation.ts:272](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L272)

---

### basePolicySchema

• `Const` **basePolicySchema**: `ZodObject`<{ `beneficiaryAddress`: `ZodString` = evmAddressSchema; `claimantAddress`:
`ZodString` = evmAddressSchema; `coverageAmount`: `ZodString` ; `endDate`: `ZodNumber` ; `ipfsPolicyHash`: `ZodString` ;
`ipfsServicePolicyHash`: `ZodString` ; `paymentTxHash`: `ZodString` ; `readerAddress`: `ZodString` = evmAddressSchema;
`startDate`: `ZodNumber` }, `"strict"`, `ZodTypeAny`, { `beneficiaryAddress`: `string` = evmAddressSchema;
`claimantAddress`: `string` = evmAddressSchema; `coverageAmount`: `string` ; `endDate`: `number` ; `ipfsPolicyHash`:
`string` ; `ipfsServicePolicyHash`: `string` ; `paymentTxHash`: `string` ; `readerAddress`: `string` = evmAddressSchema;
`startDate`: `number` }, { `beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`: `string` =
evmAddressSchema; `coverageAmount`: `string` ; `endDate`: `number` ; `ipfsPolicyHash`: `string` ;
`ipfsServicePolicyHash`: `string` ; `paymentTxHash`: `string` ; `readerAddress`: `string` = evmAddressSchema;
`startDate`: `number` }\>

Base Policy

Describes a base poly schema to be extended. Policies describe coverage purchased and committed on-chain.

**`Param`**

The transaction hash of a payment for a policy

**`Param`**

The address related to the claimant in the event of a claim against a policy

**`Param`**

The beneficiary address for disbursement of funds if a claim is paid out

**`Param`**

The address of a consuming contract

**`Param`**

The amount covered, as per pricingCoverage

**`Param`**

The start date of the policy in seconds since the Unix epoch

**`Param`**

The end date of the policy in seconds since the Unix epoch

**`Param`**

An IPFS hash referencing a document that describes the terms of the coverage policy

**`Param`**

An IPFS hash referencing a document that describes the service policy

#### Defined in

[src/utils/validation.ts:438](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L438)

---

### beaconMetadataSchema

• `Const` **beaconMetadataSchema**: `ZodRecord`<`ZodString`, `ZodObject`<{ `category`: `ZodString` ; `decimalPlaces`:
`ZodOptional`<`ZodNumber`\> ; `logos`: `ZodOptional`<`ZodArray`<`ZodString`, `"many"`\>\> ; `pricingCoverage`:
`ZodRecord`<`ZodString`, `ZodString`\> }, `"strip"`, `ZodTypeAny`, { `category`: `string` ; `decimalPlaces`: `undefined`
\| `number` ; `logos`: `undefined` \| `string`[] ; `pricingCoverage`: `Record`<`string`, `string`\> }, { `category`:
`string` ; `decimalPlaces`: `undefined` \| `number` ; `logos`: `undefined` \| `string`[] ; `pricingCoverage`:
`Record`<`string`, `string`\> }\>\>

UI-specific data relating to the display of beacons

**`Param`**

The category of the beacon as a neatly formatted string, eg. "Cryptocurrency" or "Commodities"

**`Param`**

A string as a key referencing keys in pricingCoverageSchema, keyed by chain name

**`Param`**

The number of digits to display after the decimal point for a feed, defaults to 2 if unspecified

**`Param`**

An array of logos, which should be displayed in order, representing the underlying asset(s) of the data feed

#### Defined in

[src/utils/validation.ts:357](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L357)

---

### beaconSchema

• `Const` **beaconSchema**: `ZodObject`<{ `airnodeAddress`: `ZodString` = evmAddressSchema; `beaconId`: `ZodString` =
evmBeaconIdSchema; `chains`: `ZodRecord`<`ZodString`, `ZodObject`<{ `active`: `ZodBoolean` ; `airseekerConfig`:
`ZodOptional`<`ZodObject`<{ `deviationThreshold`: `ZodNumber` ; `heartbeatInterval`: `ZodNumber` ; `updateInterval`:
`ZodNumber` }, `"strip"`, `ZodTypeAny`, { `deviationThreshold`: `number` ; `heartbeatInterval`: `number` ;
`updateInterval`: `number` }, { `deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`:
`number` }\>\> ; `displayDisabled`: `ZodOptional`<`ZodBoolean`\> ; `sponsor`: `ZodString` ; `topUpWallets`:
`ZodArray`<`ZodObject`<{ `address`: `ZodOptional`<`ZodString`\> ; `walletType`: `ZodEnum`<[``"Provider"``, ``"API3"``,
``"Provider-Sponsor"``, ``"API3-Sponsor"``]\> = walletTypeSchema }, `"strict"`, `ZodTypeAny`, { `address`: `undefined`
\| `string` ; `walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \| `"API3-Sponsor"` = walletTypeSchema }, {
`address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \| `"API3-Sponsor"`
= walletTypeSchema }\>, `"many"`\> ; `updateConditionPercentage`: `ZodOptional`<`ZodNumber`\> }, `"strict"`,
`ZodTypeAny`, { `active`: `boolean` ; `airseekerConfig`: `undefined` \| { `deviationThreshold`: `number` ;
`heartbeatInterval`: `number` ; `updateInterval`: `number` } ; `displayDisabled`: `undefined` \| `boolean` ; `sponsor`:
`string` ; `topUpWallets`: { address?: string \| undefined; walletType: "Provider" \| "API3" \| "Provider-Sponsor" \|
"API3-Sponsor"; }[] ; `updateConditionPercentage`: `undefined` \| `number` }, { `active`: `boolean` ; `airseekerConfig`:
`undefined` \| { `deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` } ;
`displayDisabled`: `undefined` \| `boolean` ; `sponsor`: `string` ; `topUpWallets`: { address?: string \| undefined;
walletType: "Provider" \| "API3" \| "Provider-Sponsor" \| "API3-Sponsor"; }[] ; `updateConditionPercentage`: `undefined`
\| `number` }\>\> ; `description`: `ZodString` ; `name`: `ZodString` ; `templateId`: `ZodString` = evmTemplateIdSchema
}, `"strict"`, `ZodTypeAny`, { `airnodeAddress`: `string` = evmAddressSchema; `beaconId`: `string` = evmBeaconIdSchema;
`chains`: `Record`<`string`, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { deviationThreshold: number; heartbeatInterval: number; updateInterval: number; } \| undefined;
active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\> ; `description`: `string` ; `name`: `string` ;
`templateId`: `string` = evmTemplateIdSchema }, { `airnodeAddress`: `string` = evmAddressSchema; `beaconId`: `string` =
evmBeaconIdSchema; `chains`: `Record`<`string`, { updateConditionPercentage?: number \| undefined; displayDisabled?:
boolean \| undefined; airseekerConfig?: { deviationThreshold: number; heartbeatInterval: number; updateInterval: number;
} \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\> ; `description`: `string` ; `name`:
`string` ; `templateId`: `string` = evmTemplateIdSchema }\>

Beacon Schema

**`Param`**

A name for a beacon, formatted for UI display.

**`Param`**

A description for a beacon, formatted for UI display.

#### Defined in

[src/utils/validation.ts:89](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L89)

---

### beaconSetsSchema

• `Const` **beaconSetsSchema**: `ZodEffects`<`ZodRecord`<`ZodString`, `ZodArray`<`ZodString`, `"many"`\>\>,
`Record`<`string`, `string`[]\>, `Record`<`string`, `string`[]\>\>

#### Defined in

[src/utils/validation.ts:339](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L339)

---

### beaconsSchema

• `Const` **beaconsSchema**: `ZodRecord`<`ZodString`, `ZodObject`<{ `airnodeAddress`: `ZodString` = evmAddressSchema;
`beaconId`: `ZodString` = evmBeaconIdSchema; `chains`: `ZodRecord`<`ZodString`, `ZodObject`<{ `active`: `ZodBoolean` ;
`airseekerConfig`: `ZodOptional`<`ZodObject`<{ `deviationThreshold`: `ZodNumber` ; `heartbeatInterval`: `ZodNumber` ;
`updateInterval`: `ZodNumber` }, `"strip"`, `ZodTypeAny`, { `deviationThreshold`: `number` ; `heartbeatInterval`:
`number` ; `updateInterval`: `number` }, { `deviationThreshold`: `number` ; `heartbeatInterval`: `number` ;
`updateInterval`: `number` }\>\> ; `displayDisabled`: `ZodOptional`<`ZodBoolean`\> ; `sponsor`: `ZodString` ;
`topUpWallets`: `ZodArray`<`ZodObject`<{ `address`: `ZodOptional`<`ZodString`\> ; `walletType`:
`ZodEnum`<[``"Provider"``, ``"API3"``, ``"Provider-Sponsor"``, ``"API3-Sponsor"``]\> = walletTypeSchema }, `"strict"`,
`ZodTypeAny`, { `address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \|
`"API3-Sponsor"` = walletTypeSchema }, { `address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \|
`"Provider-Sponsor"` \| `"API3-Sponsor"` = walletTypeSchema }\>, `"many"`\> ; `updateConditionPercentage`:
`ZodOptional`<`ZodNumber`\> }, `"strict"`, `ZodTypeAny`, { `active`: `boolean` ; `airseekerConfig`: `undefined` \| {
`deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` } ; `displayDisabled`:
`undefined` \| `boolean` ; `sponsor`: `string` ; `topUpWallets`: { address?: string \| undefined; walletType: "Provider"
\| "API3" \| "Provider-Sponsor" \| "API3-Sponsor"; }[] ; `updateConditionPercentage`: `undefined` \| `number` }, {
`active`: `boolean` ; `airseekerConfig`: `undefined` \| { `deviationThreshold`: `number` ; `heartbeatInterval`: `number`
; `updateInterval`: `number` } ; `displayDisabled`: `undefined` \| `boolean` ; `sponsor`: `string` ; `topUpWallets`: {
address?: string \| undefined; walletType: "Provider" \| "API3" \| "Provider-Sponsor" \| "API3-Sponsor"; }[] ;
`updateConditionPercentage`: `undefined` \| `number` }\>\> ; `description`: `ZodString` ; `name`: `ZodString` ;
`templateId`: `ZodString` = evmTemplateIdSchema }, `"strict"`, `ZodTypeAny`, { `airnodeAddress`: `string` =
evmAddressSchema; `beaconId`: `string` = evmBeaconIdSchema; `chains`: `Record`<`string`, { updateConditionPercentage?:
number \| undefined; displayDisabled?: boolean \| undefined; airseekerConfig?: { deviationThreshold: number;
heartbeatInterval: number; updateInterval: number; } \| undefined; active: boolean; sponsor: string; topUpWallets: {
...; }[]; }\> ; `description`: `string` ; `name`: `string` ; `templateId`: `string` = evmTemplateIdSchema }, {
`airnodeAddress`: `string` = evmAddressSchema; `beaconId`: `string` = evmBeaconIdSchema; `chains`: `Record`<`string`, {
updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined; airseekerConfig?: {
deviationThreshold: number; heartbeatInterval: number; updateInterval: number; } \| undefined; active: boolean; sponsor:
string; topUpWallets: { ...; }[]; }\> ; `description`: `string` ; `name`: `string` ; `templateId`: `string` =
evmTemplateIdSchema }\>\>

#### Defined in

[src/utils/validation.ts:100](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L100)

---

### chainDeploymentReferencesSchema

• `Const` **chainDeploymentReferencesSchema**: `ZodObject`<{ `chainNames`: `ZodRecord`<`ZodString`, `ZodString`\> ;
`contracts`: `ZodRecord`<`ZodString`, `ZodRecord`<`ZodString`, `ZodString`\>\> }, `"strict"`, `ZodTypeAny`, {
`chainNames`: `Record`<`string`, `string`\> ; `contracts`: `Record`<`string`, `Record`<`string`, `string`\>\> }, {
`chainNames`: `Record`<`string`, `string`\> ; `contracts`: `Record`<`string`, `Record`<`string`, `string`\>\> }\>

Chain Deployment References

Metadata around chains on which API3 services operate.

**`Param`**

A mapping between chain names and chain IDs

**`Param`**

A mapping between contracts deployed on chains and the IDs of those chains

#### Defined in

[src/utils/validation.ts:416](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L416)

---

### chainsMetadataContractsSchema

• `Const` **chainsMetadataContractsSchema**: `ZodObject`<{ `AirnodeRrp`: `ZodOptional`<`ZodString`\> ; `DapiServer`:
`ZodString` ; `RrpBeaconServer`: `ZodOptional`<`ZodString`\> }, `"strip"`, `ZodTypeAny`, { `AirnodeRrp`: `undefined` \|
`string` ; `DapiServer`: `string` ; `RrpBeaconServer`: `undefined` \| `string` }, { `AirnodeRrp`: `undefined` \|
`string` ; `DapiServer`: `string` ; `RrpBeaconServer`: `undefined` \| `string` }\>

Chains Metadata: Contracts

Describes contract deployments on a chain

#### Defined in

[src/utils/validation.ts:279](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L279)

---

### chainsMetadataSchema

• `Const` **chainsMetadataSchema**: `ZodObject`<{ `blockTime`: `ZodOptional`<`ZodNumber`\> ; `contracts`: `ZodObject`<{
`AirnodeRrp`: `ZodOptional`<`ZodString`\> ; `DapiServer`: `ZodString` ; `RrpBeaconServer`: `ZodOptional`<`ZodString`\>
}, `"strip"`, `ZodTypeAny`, { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ; `RrpBeaconServer`:
`undefined` \| `string` }, { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ; `RrpBeaconServer`:
`undefined` \| `string` }\> = chainsMetadataContractsSchema; `decimalPlaces`: `ZodNumber` ; `explorerUrl`:
`ZodOptional`<`ZodString`\> ; `fullName`: `ZodString` ; `id`: `ZodString` ; `logoPath`: `ZodOptional`<`ZodString`\> ;
`name`: `ZodString` ; `nativeToken`: `ZodOptional`<`ZodString`\> ; `orderLogoPath`: `ZodOptional`<`ZodString`\> ;
`testnet`: `ZodOptional`<`ZodBoolean`\> }, `"strict"`, `ZodTypeAny`, { `blockTime`: `undefined` \| `number` ;
`contracts`: { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ; `RrpBeaconServer`: `undefined` \|
`string` } = chainsMetadataContractsSchema; `decimalPlaces`: `number` ; `explorerUrl`: `undefined` \| `string` ;
`fullName`: `string` ; `id`: `string` ; `logoPath`: `undefined` \| `string` ; `name`: `string` ; `nativeToken`:
`undefined` \| `string` ; `orderLogoPath`: `undefined` \| `string` ; `testnet`: `undefined` \| `boolean` }, {
`blockTime`: `undefined` \| `number` ; `contracts`: { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ;
`RrpBeaconServer`: `undefined` \| `string` } = chainsMetadataContractsSchema; `decimalPlaces`: `number` ; `explorerUrl`:
`undefined` \| `string` ; `fullName`: `string` ; `id`: `string` ; `logoPath`: `undefined` \| `string` ; `name`: `string`
; `nativeToken`: `undefined` \| `string` ; `orderLogoPath`: `undefined` \| `string` ; `testnet`: `undefined` \|
`boolean` }\>

Chains Metadata Schema

Data describing chains served by operations services

**`Param`**

The name of the chain as used by `ethers`, eg. 'polygon-mumbai'

**`Param`**

The UI-suitable name of the chain, e.g. "Polygon Mumbai Testnet"

**`Param`**

The number of decimal places to display for the native token (useful for chains with high native token values. Defaults
to 2 if unspecified).

**`Param`**

The chainId number of the chain

**`Param`**

Contract addresses deployed on the target chain, keyed by their name

**`Param`**

The symbol of the native token of the target chain, e.g. "BTC"

**`Param`**

A URL pointing to the logo for the chain

**`Param`**

A URL pointing to an alternative logo for the chain, useful for light backgrounds

**`Param`**

Whether the target chain is a testnet

**`Param`**

A base URL pointing to an explorer for the target chain

#### Defined in

[src/utils/validation.ts:302](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L302)

---

### chainsSchema

• `Const` **chainsSchema**: `ZodRecord`<`ZodString`, `ZodObject`<{ `blockTime`: `ZodOptional`<`ZodNumber`\> ;
`contracts`: `ZodObject`<{ `AirnodeRrp`: `ZodOptional`<`ZodString`\> ; `DapiServer`: `ZodString` ; `RrpBeaconServer`:
`ZodOptional`<`ZodString`\> }, `"strip"`, `ZodTypeAny`, { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string`
; `RrpBeaconServer`: `undefined` \| `string` }, { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ;
`RrpBeaconServer`: `undefined` \| `string` }\> = chainsMetadataContractsSchema; `decimalPlaces`: `ZodNumber` ;
`explorerUrl`: `ZodOptional`<`ZodString`\> ; `fullName`: `ZodString` ; `id`: `ZodString` ; `logoPath`:
`ZodOptional`<`ZodString`\> ; `name`: `ZodString` ; `nativeToken`: `ZodOptional`<`ZodString`\> ; `orderLogoPath`:
`ZodOptional`<`ZodString`\> ; `testnet`: `ZodOptional`<`ZodBoolean`\> }, `"strict"`, `ZodTypeAny`, { `blockTime`:
`undefined` \| `number` ; `contracts`: { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ;
`RrpBeaconServer`: `undefined` \| `string` } = chainsMetadataContractsSchema; `decimalPlaces`: `number` ; `explorerUrl`:
`undefined` \| `string` ; `fullName`: `string` ; `id`: `string` ; `logoPath`: `undefined` \| `string` ; `name`: `string`
; `nativeToken`: `undefined` \| `string` ; `orderLogoPath`: `undefined` \| `string` ; `testnet`: `undefined` \|
`boolean` }, { `blockTime`: `undefined` \| `number` ; `contracts`: { `AirnodeRrp`: `undefined` \| `string` ;
`DapiServer`: `string` ; `RrpBeaconServer`: `undefined` \| `string` } = chainsMetadataContractsSchema; `decimalPlaces`:
`number` ; `explorerUrl`: `undefined` \| `string` ; `fullName`: `string` ; `id`: `string` ; `logoPath`: `undefined` \|
`string` ; `name`: `string` ; `nativeToken`: `undefined` \| `string` ; `orderLogoPath`: `undefined` \| `string` ;
`testnet`: `undefined` \| `boolean` }\>\>

#### Defined in

[src/utils/validation.ts:318](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L318)

---

### commonLogosSchema

• `Const` **commonLogosSchema**: `ZodRecord`<`ZodString`, `ZodString`\>

Common Logos are logos used for beacons which can have logos associated with them. For example USD/ETH could consist of
a USD logo and an ETH logo. There is significant re-use across token pairs, eg. both "USD/ETH" and "USD/BTC" will have
the USD logo in common. We'd therefore like to reference these logos separately.

#### Defined in

[src/utils/validation.ts:347](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L347)

---

### dapiMetadataSchema

• `Const` **dapiMetadataSchema**: `ZodRecord`<`ZodString`, `ZodObject`<{ `pricingCoverage`: `ZodRecord`<`ZodString`,
`ZodString`\> }, `"strip"`, `ZodTypeAny`, { `pricingCoverage`: `Record`<`string`, `string`\> }, { `pricingCoverage`:
`Record`<`string`, `string`\> }\>\>

UI-specific data around display of dapis

**`Param`**

A string as a key referencing keys in pricingCoverageSchema

#### Defined in

[src/utils/validation.ts:371](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L371)

---

### dapiPolicySchema

• `Const` **dapiPolicySchema**: `ZodObject`<`extendShape`<{ `beneficiaryAddress`: `ZodString` = evmAddressSchema;
`claimantAddress`: `ZodString` = evmAddressSchema; `coverageAmount`: `ZodString` ; `endDate`: `ZodNumber` ;
`ipfsPolicyHash`: `ZodString` ; `ipfsServicePolicyHash`: `ZodString` ; `paymentTxHash`: `ZodString` ; `readerAddress`:
`ZodString` = evmAddressSchema; `startDate`: `ZodNumber` }, { `dapiName`: `ZodString` }\>, `"strict"`, `ZodTypeAny`, {
`beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`: `string` = evmAddressSchema; `coverageAmount`:
`string` ; `dapiName`: `string` ; `endDate`: `number` ; `ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ;
`paymentTxHash`: `string` ; `readerAddress`: `string` = evmAddressSchema; `startDate`: `number` }, {
`beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`: `string` = evmAddressSchema; `coverageAmount`:
`string` ; `dapiName`: `string` ; `endDate`: `number` ; `ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ;
`paymentTxHash`: `string` ; `readerAddress`: `string` = evmAddressSchema; `startDate`: `number` }\>

Dapi Policy

Extends the Base Policy to add a Dapi Name

**`Param`**

The dapiName the policy covers

#### Defined in

[src/utils/validation.ts:459](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L459)

---

### dapisSchema

• `Const` **dapisSchema**: `ZodRecord`<`ZodString`, `ZodRecord`<`ZodString`, `ZodString`\>\>

#### Defined in

[src/utils/validation.ts:337](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L337)

---

### dataFeedPolicySchema

• `Const` **dataFeedPolicySchema**: `ZodObject`<`extendShape`<{ `beneficiaryAddress`: `ZodString` = evmAddressSchema;
`claimantAddress`: `ZodString` = evmAddressSchema; `coverageAmount`: `ZodString` ; `endDate`: `ZodNumber` ;
`ipfsPolicyHash`: `ZodString` ; `ipfsServicePolicyHash`: `ZodString` ; `paymentTxHash`: `ZodString` ; `readerAddress`:
`ZodString` = evmAddressSchema; `startDate`: `ZodNumber` }, { `dataFeedId`: `ZodString` = evmBeaconIdSchema }\>,
`"strict"`, `ZodTypeAny`, { `beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`: `string` =
evmAddressSchema; `coverageAmount`: `string` ; `dataFeedId`: `string` = evmBeaconIdSchema; `endDate`: `number` ;
`ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ; `paymentTxHash`: `string` ; `readerAddress`: `string` =
evmAddressSchema; `startDate`: `number` }, { `beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`:
`string` = evmAddressSchema; `coverageAmount`: `string` ; `dataFeedId`: `string` = evmBeaconIdSchema; `endDate`:
`number` ; `ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ; `paymentTxHash`: `string` ; `readerAddress`:
`string` = evmAddressSchema; `startDate`: `number` }\>

Data Feed Policy

Extends the Base Policy to add a Data Feed ID

**`Param`**

The dataFeedId covered by the policy

#### Defined in

[src/utils/validation.ts:472](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L472)

---

### deploymentSetSchema

• `Const` **deploymentSetSchema**: `ZodObject`<{ `airkeeper`: `ZodOptional`<`ZodObject`<{ `aws`:
`ZodOptional`<`ZodObject`<{ `airkeeper`: `ZodOptional`<`ZodAny`\> ; `aws`: `ZodOptional`<`ZodObject`<{ `content`:
`ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, {
`content`: `string` ; `filename`: `string` }\>\> ; `config`: `ZodOptional`<`ZodAny`\> ; `secrets`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, {
`airkeeper`: `any` ; `aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`:
`undefined` \| { filename: string; content: string; } }, { `airkeeper`: `any` ; `aws`: `undefined` \| { filename:
string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }\>\> },
`"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { config?: any; secrets?: { filename: string; content: string; } \|
undefined; aws?: { filename: string; content: string; } \| undefined; airkeeper?: any; } }, { `aws`: `undefined` \| {
config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string; content: string;
} \| undefined; airkeeper?: any; } }\>\> ; `airnode`: `ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `aws`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> ; `config`: `ZodAny` ; `secrets`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, {
`aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename:
string; content: string; } }, { `aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ;
`secrets`: `undefined` \| { filename: string; content: string; } }\>\> ; `gcp`: `ZodOptional`<`ZodObject`<{ `config`:
`ZodAny` ; `gcp`: `ZodOptional`<`ZodAny`\> ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`:
`ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ;
`filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, { `config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| {
filename: string; content: string; } }, { `config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| { filename: string;
content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { config?: any; secrets?: { filename:
string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; } ; `gcp`:
`undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?: any; } }, { `aws`:
`undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string;
content: string; } \| undefined; } ; `gcp`: `undefined` \| { config?: any; secrets?: { filename: string; content:
string; } \| undefined; gcp?: any; } }\> = airnodeDeploymentSchema }, `"strip"`, `ZodTypeAny`, { `airkeeper`:
`undefined` \| { aws?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename:
string; content: string; } \| undefined; airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any;
secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \|
undefined; } \| undefined; gcp?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?:
any; } \| undefined; } = airnodeDeploymentSchema }, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\>

Deployment Set Schema

Describes an Airnode and Airkeeper deployment. Deployment of Airkeeper is optional.

#### Defined in

[src/utils/validation.ts:169](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L169)

---

### deploymentsSchema

• `Const` **deploymentsSchema**: `ZodRecord`<`ZodString`, `ZodObject`<{ `airkeeper`: `ZodOptional`<`ZodObject`<{ `aws`:
`ZodOptional`<`ZodObject`<{ `airkeeper`: `ZodOptional`<`ZodAny`\> ; `aws`: `ZodOptional`<`ZodObject`<{ `content`:
`ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, {
`content`: `string` ; `filename`: `string` }\>\> ; `config`: `ZodOptional`<`ZodAny`\> ; `secrets`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, {
`airkeeper`: `any` ; `aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`:
`undefined` \| { filename: string; content: string; } }, { `airkeeper`: `any` ; `aws`: `undefined` \| { filename:
string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }\>\> },
`"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { config?: any; secrets?: { filename: string; content: string; } \|
undefined; aws?: { filename: string; content: string; } \| undefined; airkeeper?: any; } }, { `aws`: `undefined` \| {
config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string; content: string;
} \| undefined; airkeeper?: any; } }\>\> ; `airnode`: `ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `aws`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> ; `config`: `ZodAny` ; `secrets`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, {
`aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename:
string; content: string; } }, { `aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ;
`secrets`: `undefined` \| { filename: string; content: string; } }\>\> ; `gcp`: `ZodOptional`<`ZodObject`<{ `config`:
`ZodAny` ; `gcp`: `ZodOptional`<`ZodAny`\> ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`:
`ZodString` }, `"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ;
`filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, { `config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| {
filename: string; content: string; } }, { `config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| { filename: string;
content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { config?: any; secrets?: { filename:
string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; } ; `gcp`:
`undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?: any; } }, { `aws`:
`undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string;
content: string; } \| undefined; } ; `gcp`: `undefined` \| { config?: any; secrets?: { filename: string; content:
string; } \| undefined; gcp?: any; } }\> = airnodeDeploymentSchema }, `"strip"`, `ZodTypeAny`, { `airkeeper`:
`undefined` \| { aws?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename:
string; content: string; } \| undefined; airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any;
secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \|
undefined; } \| undefined; gcp?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?:
any; } \| undefined; } = airnodeDeploymentSchema }, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\>\>

Deployment Schema

Deployment sets are keyed by the date in the format 'YYYY-MM-DD'

#### Defined in

[src/utils/validation.ts:179](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L179)

---

### evmAddressSchema

• `Const` **evmAddressSchema**: `ZodString`

Common EVM Data Schema

#### Defined in

[src/utils/validation.ts:21](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L21)

---

### evmBeaconIdSchema

• `Const` **evmBeaconIdSchema**: `ZodString`

#### Defined in

[src/utils/validation.ts:22](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L22)

---

### evmEndpointIdSchema

• `Const` **evmEndpointIdSchema**: `ZodString`

#### Defined in

[src/utils/validation.ts:24](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L24)

---

### evmTemplateIdSchema

• `Const` **evmTemplateIdSchema**: `ZodString`

#### Defined in

[src/utils/validation.ts:23](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L23)

---

### evmXpubSchema

• `Const` **evmXpubSchema**: `ZodString`

#### Defined in

[src/utils/validation.ts:25](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L25)

---

### explorerSchema

• `Const` **explorerSchema**: `ZodObject`<{ `beaconMetadata`: `ZodRecord`<`ZodString`, `ZodObject`<{ `category`:
`ZodString` ; `decimalPlaces`: `ZodOptional`<`ZodNumber`\> ; `logos`: `ZodOptional`<`ZodArray`<`ZodString`, `"many"`\>\>
; `pricingCoverage`: `ZodRecord`<`ZodString`, `ZodString`\> }, `"strip"`, `ZodTypeAny`, { `category`: `string` ;
`decimalPlaces`: `undefined` \| `number` ; `logos`: `undefined` \| `string`[] ; `pricingCoverage`: `Record`<`string`,
`string`\> }, { `category`: `string` ; `decimalPlaces`: `undefined` \| `number` ; `logos`: `undefined` \| `string`[] ;
`pricingCoverage`: `Record`<`string`, `string`\> }\>\> = beaconMetadataSchema; `beaconSets`:
`ZodEffects`<`ZodRecord`<`ZodString`, `ZodArray`<`ZodString`, `"many"`\>\>, `Record`<`string`, `string`[]\>,
`Record`<`string`, `string`[]\>\> = beaconSetsSchema; `commonLogos`: `ZodRecord`<`ZodString`, `ZodString`\> =
commonLogosSchema; `dapiMetadata`: `ZodRecord`<`ZodString`, `ZodObject`<{ `pricingCoverage`: `ZodRecord`<`ZodString`,
`ZodString`\> }, `"strip"`, `ZodTypeAny`, { `pricingCoverage`: `Record`<`string`, `string`\> }, { `pricingCoverage`:
`Record`<`string`, `string`\> }\>\> = dapiMetadataSchema; `pricingCoverage`: `ZodRecord`<`ZodString`,
`ZodArray`<`ZodObject`<{ `coverage`: `ZodNumber` ; `subscriptionFee`: `ZodNumber` }, `"strip"`, `ZodTypeAny`, {
`coverage`: `number` ; `subscriptionFee`: `number` }, { `coverage`: `number` ; `subscriptionFee`: `number` }\>,
`"many"`\>\> = pricingCoverageSchema }, `"strict"`, `ZodTypeAny`, { `beaconMetadata`: `Record`<`string`, { `category`:
`string` ; `decimalPlaces`: `undefined` \| `number` ; `logos`: `undefined` \| `string`[] ; `pricingCoverage`:
`Record`<`string`, `string`\> }\> = beaconMetadataSchema; `beaconSets`: `Record`<`string`, `string`[]\> =
beaconSetsSchema; `commonLogos`: `Record`<`string`, `string`\> = commonLogosSchema; `dapiMetadata`: `Record`<`string`, {
`pricingCoverage`: `Record`<`string`, `string`\> }\> = dapiMetadataSchema; `pricingCoverage`: `Record`<`string`, {
`coverage`: `number` ; `subscriptionFee`: `number` }[]\> = pricingCoverageSchema }, { `beaconMetadata`:
`Record`<`string`, { `category`: `string` ; `decimalPlaces`: `undefined` \| `number` ; `logos`: `undefined` \|
`string`[] ; `pricingCoverage`: `Record`<`string`, `string`\> }\> = beaconMetadataSchema; `beaconSets`:
`Record`<`string`, `string`[]\> = beaconSetsSchema; `commonLogos`: `Record`<`string`, `string`\> = commonLogosSchema;
`dapiMetadata`: `Record`<`string`, { `pricingCoverage`: `Record`<`string`, `string`\> }\> = dapiMetadataSchema;
`pricingCoverage`: `Record`<`string`, { `coverage`: `number` ; `subscriptionFee`: `number` }[]\> = pricingCoverageSchema
}\>

Explorer Schema

The explorerSchema contains data needed to render beacons and services to a UI.

#### Defined in

[src/utils/validation.ts:398](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L398)

---

### extendedChainDescriptionSchema

• `Const` **extendedChainDescriptionSchema**: `ZodObject`<{ `active`: `ZodBoolean` ; `airseekerConfig`:
`ZodOptional`<`ZodObject`<{ `deviationThreshold`: `ZodNumber` ; `heartbeatInterval`: `ZodNumber` ; `updateInterval`:
`ZodNumber` }, `"strip"`, `ZodTypeAny`, { `deviationThreshold`: `number` ; `heartbeatInterval`: `number` ;
`updateInterval`: `number` }, { `deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`:
`number` }\>\> ; `displayDisabled`: `ZodOptional`<`ZodBoolean`\> ; `sponsor`: `ZodString` ; `topUpWallets`:
`ZodArray`<`ZodObject`<{ `address`: `ZodOptional`<`ZodString`\> ; `walletType`: `ZodEnum`<[``"Provider"``, ``"API3"``,
``"Provider-Sponsor"``, ``"API3-Sponsor"``]\> = walletTypeSchema }, `"strict"`, `ZodTypeAny`, { `address`: `undefined`
\| `string` ; `walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \| `"API3-Sponsor"` = walletTypeSchema }, {
`address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \| `"API3-Sponsor"`
= walletTypeSchema }\>, `"many"`\> ; `updateConditionPercentage`: `ZodOptional`<`ZodNumber`\> }, `"strict"`,
`ZodTypeAny`, { `active`: `boolean` ; `airseekerConfig`: `undefined` \| { `deviationThreshold`: `number` ;
`heartbeatInterval`: `number` ; `updateInterval`: `number` } ; `displayDisabled`: `undefined` \| `boolean` ; `sponsor`:
`string` ; `topUpWallets`: { address?: string \| undefined; walletType: "Provider" \| "API3" \| "Provider-Sponsor" \|
"API3-Sponsor"; }[] ; `updateConditionPercentage`: `undefined` \| `number` }, { `active`: `boolean` ; `airseekerConfig`:
`undefined` \| { `deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` } ;
`displayDisabled`: `undefined` \| `boolean` ; `sponsor`: `string` ; `topUpWallets`: { address?: string \| undefined;
walletType: "Provider" \| "API3" \| "Provider-Sponsor" \| "API3-Sponsor"; }[] ; `updateConditionPercentage`: `undefined`
\| `number` }\>

Extended Chain Description Schema

A description of a parent beacon's on-chain presence and associated resources.

**`Param`**

Whether the beacon is currently actively being updated

**`Param`**

The `sponsor` address (https://docs.api3.org/airnode/latest/concepts/sponsor.html#sponsoraddress)

**`Param`**

The API provider's Airkeeper update condition percentage

**`Param`**

Should the beacon be displayed in UI applications (TODO this should be moved to explorerMetadata)

**`Param`**

API3's Airkseeker update configuration, including:

**`Param`**

API3's Airseeker update threshold

**`Param`**

The interval at which a forced update will be made regardless of deviation

**`Param`**

How often API3's Airseeker checks the deviation

#### Defined in

[src/utils/validation.ts:66](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L66)

---

### oisesSchema

• `Const` **oisesSchema**: `ZodRecord`<`ZodString`, `ZodEffects`<`ZodEffects`<`ZodObject`<{ `apiSpecifications`:
`ZodEffects`<`ZodObject`<{ `components`: `ZodObject`<{ `securitySchemes`: `ZodRecord`<`ZodString`,
`ZodDiscriminatedUnion`<`"type"`, `Primitive`, `ZodObject`<{ `scheme`: `ZodUnion`<[`ZodLiteral`<``"bearer"``\>,
`ZodLiteral`<``"basic"``\>]\> ; `type`: `ZodLiteral`<`"http"`\> }, `"strict"`, `ZodTypeAny`, { `scheme`: `"bearer"` \|
`"basic"` ; `type`: `"http"` }, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` }\> \|
`ZodObject`<`extendShape`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>]\> ; `name`: `ZodString` }, { `type`: `ZodLiteral`<`"apiKey"`\> }\>, `"strict"`,
`ZodTypeAny`, { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` }, { `in`: `"query"`
\| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` }\> \| `ZodObject`<`extendShape`<{ `in`:
`ZodUnion`<[`ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>, `ZodLiteral`<``"cookie"``\>]\> ; `name`:
`ZodString` }, { `type`: `ZodLiteral`<`"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"`\> }\>, `"strict"`, `ZodTypeAny`, { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }, { `in`: `"query"` \| `"header"`
\| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\>\>\> }, `"strict"`, `ZodTypeAny`, { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> }, { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> }\> ; `paths`:
`ZodEffects`<`ZodEffects`<`ZodRecord`<`ZodString`, `ZodRecord`<`ZodUnion`<[`ZodLiteral`<``"get"``\>,
`ZodLiteral`<``"post"``\>]\>, `ZodObject`<{ `parameters`: `ZodArray`<`ZodObject`<{ `in`:
`ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\>,
`"many"`\> }, `"strict"`, `ZodTypeAny`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[]
}\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>\>, `Record`<`string`,
`Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[]
}\>\>\>\> ; `security`: `ZodRecord`<`ZodString`, `ZodTuple`<[], `null`\>\> ; `servers`: `ZodArray`<`ZodObject`<{ `url`:
`ZodString` }, `"strict"`, `ZodTypeAny`, { `url`: `string` }, { `url`: `string` }\>, `"many"`\> }, `"strict"`,
`ZodTypeAny`, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`:
`"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }\>, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }\> ; `endpoints`: `ZodArray`<`ZodObject`<{ `description`: `ZodOptional`<`ZodString`\> ;
`externalDocs`: `ZodOptional`<`ZodString`\> ; `fixedOperationParameters`: `ZodArray`<`ZodObject`<{ `operationParameter`:
`ZodObject`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\> ;
`value`: `ZodString` }, `"strict"`, `ZodTypeAny`, { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \|
`"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }, { `operationParameter`: { `in`: `"path"` \|
`"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }\>, `"many"`\> ;
`name`: `ZodString` ; `operation`: `ZodObject`<{ `method`: `ZodUnion`<[`ZodLiteral`<``"get"``\>,
`ZodLiteral`<``"post"``\>]\> ; `path`: `ZodString` }, `"strict"`, `ZodTypeAny`, { `method`: `"get"` \| `"post"` ;
`path`: `string` }, { `method`: `"get"` \| `"post"` ; `path`: `string` }\> ; `parameters`:
`ZodEffects`<`ZodArray`<`ZodObject`<{ `default`: `ZodOptional`<`ZodString`\> ; `description`:
`ZodOptional`<`ZodString`\> ; `example`: `ZodOptional`<`ZodString`\> ; `name`: `ZodString` ; `operationParameter`:
`ZodObject`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\> ;
`required`: `ZodOptional`<`ZodBoolean`\> }, `"strict"`, `ZodTypeAny`, { `default?`: `string` ; `description?`: `string`
; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \|
`"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }, { `default?`: `string` ; `description?`:
`string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }\>, `"many"`\>, { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[], { `default?`: `string`
; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \|
`"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[]\> ;
`postProcessingSpecifications`: `ZodOptional`<`ZodArray`<`ZodObject`<{ `environment`: `ZodUnion`<[`ZodLiteral`<``"Node
14"``\>, `ZodLiteral`<``"Node 14 async"``\>]\> ; `timeoutMs`: `ZodNumber` ; `value`: `ZodString` }, `"strict"`,
`ZodTypeAny`, { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }, {
`environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }\>, `"many"`\>\> ;
`preProcessingSpecifications`: `ZodOptional`<`ZodArray`<`ZodObject`<{ `environment`: `ZodUnion`<[`ZodLiteral`<``"Node
14"``\>, `ZodLiteral`<``"Node 14 async"``\>]\> ; `timeoutMs`: `ZodNumber` ; `value`: `ZodString` }, `"strict"`,
`ZodTypeAny`, { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }, {
`environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }\>, `"many"`\>\> ;
`reservedParameters`: `ZodArray`<`ZodEffects`<`ZodObject`<{ `default`: `ZodOptional`<`ZodString`\> ; `fixed`:
`ZodOptional`<`ZodString`\> ; `name`: `ZodUnion`<[`ZodLiteral`<``"_type"``\>, `ZodLiteral`<``"_path"``\>,
`ZodLiteral`<``"_times"``\>]\> }, `"strict"`, `ZodTypeAny`, { `default?`: `string` ; `fixed?`: `string` ; `name`:
`"_type"` \| `"_path"` \| `"_times"` }, { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \|
`"_times"` }\>, { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }, {
`default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }\>, `"many"`\> ; `summary`:
`ZodOptional`<`ZodString`\> }, `"strict"`, `ZodTypeAny`, { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }, {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }\>, `"many"`\> ; `oisFormat`: `ZodEffects`<`ZodString`, `string`,
`string`\> ; `title`: `ZodString` ; `version`: `ZodEffects`<`ZodString`, `string`, `string`\> }, `"strict"`,
`ZodTypeAny`, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \|
`"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"`
} \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"`
\| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"`
; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| {
`in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"`
; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| {
`in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>\>

OISes Schema

OISes are keyed by a composite of their `title` and `version`. For more information, visit: https://docs.api3.org/ois

#### Defined in

[src/utils/validation.ts:224](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L224)

---

### operationsRepositorySchema

• `Const` **operationsRepositorySchema**:
`ZodEffects`<`ZodEffects`<`ZodEffects`<`ZodEffects`<`ZodEffects`<`ZodEffects`<`ZodObject`<{ `api3`:
`ZodOptional`<`ZodObject`<{ `airseeker`: `ZodRecord`<`ZodString`, `ZodObject`<{ `airseeker`: `ZodAny` ; `secrets`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strict"`, `ZodTypeAny`, {
`airseeker`: `any` ; `secrets`: `undefined` \| { `content`: `string` ; `filename`: `string` } }, { `airseeker`: `any` ;
`secrets`: `undefined` \| { `content`: `string` ; `filename`: `string` } }\>\> = airseekerDeploymentsSchema },
`"strict"`, `ZodTypeAny`, { `airseeker`: `Record`<`string`, { secrets?: { filename: string; content: string; } \|
undefined; airseeker?: any; }\> = airseekerDeploymentsSchema }, { `airseeker`: `Record`<`string`, { secrets?: {
filename: string; content: string; } \| undefined; airseeker?: any; }\> = airseekerDeploymentsSchema }\>\> ; `apis`:
`ZodRecord`<`ZodString`, `ZodEffects`<`ZodEffects`<`ZodObject`<{ `apiMetadata`: `ZodObject`<{ `active`: `ZodBoolean` ;
`airnode`: `ZodString` = evmAddressSchema; `description`: `ZodString` ; `homepage`: `ZodString` ; `logoPath`:
`ZodString` ; `maxSubscriptionPeriod`: `ZodNumber` ; `name`: `ZodString` ; `orderLogoPath`: `ZodOptional`<`ZodString`\>
; `xpub`: `ZodString` = evmXpubSchema }, `"strict"`, `ZodTypeAny`, { `active`: `boolean` ; `airnode`: `string` =
evmAddressSchema; `description`: `string` ; `homepage`: `string` ; `logoPath`: `string` ; `maxSubscriptionPeriod`:
`number` ; `name`: `string` ; `orderLogoPath`: `undefined` \| `string` ; `xpub`: `string` = evmXpubSchema }, { `active`:
`boolean` ; `airnode`: `string` = evmAddressSchema; `description`: `string` ; `homepage`: `string` ; `logoPath`:
`string` ; `maxSubscriptionPeriod`: `number` ; `name`: `string` ; `orderLogoPath`: `undefined` \| `string` ; `xpub`:
`string` = evmXpubSchema }\> = apiMetadataSchema; `beacons`: `ZodRecord`<`ZodString`, `ZodObject`<{ `airnodeAddress`:
`ZodString` = evmAddressSchema; `beaconId`: `ZodString` = evmBeaconIdSchema; `chains`: `ZodRecord`<`ZodString`,
`ZodObject`<{ `active`: `ZodBoolean` ; `airseekerConfig`: `ZodOptional`<`ZodObject`<{ `deviationThreshold`: `ZodNumber`
; `heartbeatInterval`: `ZodNumber` ; `updateInterval`: `ZodNumber` }, `"strip"`, `ZodTypeAny`, { `deviationThreshold`:
`number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` }, { `deviationThreshold`: `number` ;
`heartbeatInterval`: `number` ; `updateInterval`: `number` }\>\> ; `displayDisabled`: `ZodOptional`<`ZodBoolean`\> ;
`sponsor`: `ZodString` ; `topUpWallets`: `ZodArray`<`ZodObject`<{ `address`: `ZodOptional`<`ZodString`\> ; `walletType`:
`ZodEnum`<[``"Provider"``, ``"API3"``, ``"Provider-Sponsor"``, ``"API3-Sponsor"``]\> = walletTypeSchema }, `"strict"`,
`ZodTypeAny`, { `address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \|
`"API3-Sponsor"` = walletTypeSchema }, { `address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \|
`"Provider-Sponsor"` \| `"API3-Sponsor"` = walletTypeSchema }\>, `"many"`\> ; `updateConditionPercentage`:
`ZodOptional`<`ZodNumber`\> }, `"strict"`, `ZodTypeAny`, { `active`: `boolean` ; `airseekerConfig`: `undefined` \| {
`deviationThreshold`: `number` ; `heartbeatInterval`: `number` ; `updateInterval`: `number` } ; `displayDisabled`:
`undefined` \| `boolean` ; `sponsor`: `string` ; `topUpWallets`: { address?: string \| undefined; walletType: "Provider"
\| "API3" \| "Provider-Sponsor" \| "API3-Sponsor"; }[] ; `updateConditionPercentage`: `undefined` \| `number` }, {
`active`: `boolean` ; `airseekerConfig`: `undefined` \| { `deviationThreshold`: `number` ; `heartbeatInterval`: `number`
; `updateInterval`: `number` } ; `displayDisabled`: `undefined` \| `boolean` ; `sponsor`: `string` ; `topUpWallets`: {
address?: string \| undefined; walletType: "Provider" \| "API3" \| "Provider-Sponsor" \| "API3-Sponsor"; }[] ;
`updateConditionPercentage`: `undefined` \| `number` }\>\> ; `description`: `ZodString` ; `name`: `ZodString` ;
`templateId`: `ZodString` = evmTemplateIdSchema }, `"strict"`, `ZodTypeAny`, { `airnodeAddress`: `string` =
evmAddressSchema; `beaconId`: `string` = evmBeaconIdSchema; `chains`: `Record`<`string`, { updateConditionPercentage?:
number \| undefined; displayDisabled?: boolean \| undefined; airseekerConfig?: { deviationThreshold: number;
heartbeatInterval: number; updateInterval: number; } \| undefined; active: boolean; sponsor: string; topUpWallets: {
...; }[]; }\> ; `description`: `string` ; `name`: `string` ; `templateId`: `string` = evmTemplateIdSchema }, {
`airnodeAddress`: `string` = evmAddressSchema; `beaconId`: `string` = evmBeaconIdSchema; `chains`: `Record`<`string`, {
updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined; airseekerConfig?: {
deviationThreshold: number; heartbeatInterval: number; updateInterval: number; } \| undefined; active: boolean; sponsor:
string; topUpWallets: { ...; }[]; }\> ; `description`: `string` ; `name`: `string` ; `templateId`: `string` =
evmTemplateIdSchema }\>\> = beaconsSchema; `deployments`: `ZodRecord`<`ZodString`, `ZodObject`<{ `airkeeper`:
`ZodOptional`<`ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `airkeeper`: `ZodOptional`<`ZodAny`\> ; `aws`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> ; `config`:
`ZodOptional`<`ZodAny`\> ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` },
`"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string`
}\>\> }, `"strip"`, `ZodTypeAny`, { `airkeeper`: `any` ; `aws`: `undefined` \| { filename: string; content: string; } ;
`config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, { `airkeeper`: `any` ; `aws`:
`undefined` \| { filename: string; content: string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string;
content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { config?: any; secrets?: { filename:
string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; airkeeper?: any; }
}, { `aws`: `undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: {
filename: string; content: string; } \| undefined; airkeeper?: any; } }\>\> ; `airnode`: `ZodObject`<{ `aws`:
`ZodOptional`<`ZodObject`<{ `aws`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` },
`"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string`
}\>\> ; `config`: `ZodAny` ; `secrets`: `ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` },
`"strip"`, `ZodTypeAny`, { `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string`
}\>\> }, `"strip"`, `ZodTypeAny`, { `aws`: `undefined` \| { filename: string; content: string; } ; `config`: `any` ;
`secrets`: `undefined` \| { filename: string; content: string; } }, { `aws`: `undefined` \| { filename: string; content:
string; } ; `config`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }\>\> ; `gcp`:
`ZodOptional`<`ZodObject`<{ `config`: `ZodAny` ; `gcp`: `ZodOptional`<`ZodAny`\> ; `secrets`:
`ZodOptional`<`ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `content`:
`string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>\> }, `"strip"`, `ZodTypeAny`, {
`config`: `any` ; `gcp`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }, { `config`: `any` ;
`gcp`: `any` ; `secrets`: `undefined` \| { filename: string; content: string; } }\>\> }, `"strip"`, `ZodTypeAny`, {
`aws`: `undefined` \| { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename:
string; content: string; } \| undefined; } ; `gcp`: `undefined` \| { config?: any; secrets?: { filename: string;
content: string; } \| undefined; gcp?: any; } }, { `aws`: `undefined` \| { config?: any; secrets?: { filename: string;
content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; } ; `gcp`: `undefined` \| {
config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?: any; } }\> = airnodeDeploymentSchema
}, `"strip"`, `ZodTypeAny`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: { filename: string; content:
string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; airkeeper?: any; } \| undefined; } ;
`airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename:
string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?: { filename: string; content:
string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }, { `airkeeper`: `undefined` \| { aws?:
{ config?: any; secrets?: { filename: string; content: string; } \| undefined; aws?: { filename: string; content:
string; } \| undefined; airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename:
string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined;
gcp?: { config?: any; secrets?: { filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } =
airnodeDeploymentSchema }\>\> = deploymentsSchema; `ois`: `ZodRecord`<`ZodString`,
`ZodEffects`<`ZodEffects`<`ZodObject`<{ `apiSpecifications`: `ZodEffects`<`ZodObject`<{ `components`: `ZodObject`<{
`securitySchemes`: `ZodRecord`<`ZodString`, `ZodDiscriminatedUnion`<`"type"`, `Primitive`, `ZodObject`<{ `scheme`:
`ZodUnion`<[`ZodLiteral`<``"bearer"``\>, `ZodLiteral`<``"basic"``\>]\> ; `type`: `ZodLiteral`<`"http"`\> }, `"strict"`,
`ZodTypeAny`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` }, { `scheme`: `"bearer"` \| `"basic"` ; `type`:
`"http"` }\> \| `ZodObject`<`extendShape`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>]\> ; `name`: `ZodString` }, { `type`: `ZodLiteral`<`"apiKey"`\> }\>, `"strict"`,
`ZodTypeAny`, { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` }, { `in`: `"query"`
\| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` }\> \| `ZodObject`<`extendShape`<{ `in`:
`ZodUnion`<[`ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>, `ZodLiteral`<``"cookie"``\>]\> ; `name`:
`ZodString` }, { `type`: `ZodLiteral`<`"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"`\> }\>, `"strict"`, `ZodTypeAny`, { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }, { `in`: `"query"` \| `"header"`
\| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\>\>\> }, `"strict"`, `ZodTypeAny`, { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> }, { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> }\> ; `paths`:
`ZodEffects`<`ZodEffects`<`ZodRecord`<`ZodString`, `ZodRecord`<`ZodUnion`<[`ZodLiteral`<``"get"``\>,
`ZodLiteral`<``"post"``\>]\>, `ZodObject`<{ `parameters`: `ZodArray`<`ZodObject`<{ `in`:
`ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\>,
`"many"`\> }, `"strict"`, `ZodTypeAny`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[]
}\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>\>, `Record`<`string`,
`Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` }[] }\>\>\>, `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[]
}\>\>\>\> ; `security`: `ZodRecord`<`ZodString`, `ZodTuple`<[], `null`\>\> ; `servers`: `ZodArray`<`ZodObject`<{ `url`:
`ZodString` }, `"strict"`, `ZodTypeAny`, { `url`: `string` }, { `url`: `string` }\>, `"many"`\> }, `"strict"`,
`ZodTypeAny`, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`:
`"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }\>, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }, { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ;
`type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`:
`"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] }\> ; `endpoints`: `ZodArray`<`ZodObject`<{ `description`: `ZodOptional`<`ZodString`\> ;
`externalDocs`: `ZodOptional`<`ZodString`\> ; `fixedOperationParameters`: `ZodArray`<`ZodObject`<{ `operationParameter`:
`ZodObject`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\> ;
`value`: `ZodString` }, `"strict"`, `ZodTypeAny`, { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \|
`"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }, { `operationParameter`: { `in`: `"path"` \|
`"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }\>, `"many"`\> ;
`name`: `ZodString` ; `operation`: `ZodObject`<{ `method`: `ZodUnion`<[`ZodLiteral`<``"get"``\>,
`ZodLiteral`<``"post"``\>]\> ; `path`: `ZodString` }, `"strict"`, `ZodTypeAny`, { `method`: `"get"` \| `"post"` ;
`path`: `string` }, { `method`: `"get"` \| `"post"` ; `path`: `string` }\> ; `parameters`:
`ZodEffects`<`ZodArray`<`ZodObject`<{ `default`: `ZodOptional`<`ZodString`\> ; `description`:
`ZodOptional`<`ZodString`\> ; `example`: `ZodOptional`<`ZodString`\> ; `name`: `ZodString` ; `operationParameter`:
`ZodObject`<{ `in`: `ZodUnion`<[`ZodLiteral`<``"path"``\>, `ZodLiteral`<``"query"``\>, `ZodLiteral`<``"header"``\>,
`ZodLiteral`<``"cookie"``\>, `ZodLiteral`<``"processing"``\>]\> ; `name`: `ZodEffects`<`ZodString`, `string`, `string`\>
}, `"strict"`, `ZodTypeAny`, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }, { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }\> ;
`required`: `ZodOptional`<`ZodBoolean`\> }, `"strict"`, `ZodTypeAny`, { `default?`: `string` ; `description?`: `string`
; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \|
`"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }, { `default?`: `string` ; `description?`:
`string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }\>, `"many"`\>, { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[], { `default?`: `string`
; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \|
`"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[]\> ;
`postProcessingSpecifications`: `ZodOptional`<`ZodArray`<`ZodObject`<{ `environment`: `ZodUnion`<[`ZodLiteral`<``"Node
14"``\>, `ZodLiteral`<``"Node 14 async"``\>]\> ; `timeoutMs`: `ZodNumber` ; `value`: `ZodString` }, `"strict"`,
`ZodTypeAny`, { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }, {
`environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }\>, `"many"`\>\> ;
`preProcessingSpecifications`: `ZodOptional`<`ZodArray`<`ZodObject`<{ `environment`: `ZodUnion`<[`ZodLiteral`<``"Node
14"``\>, `ZodLiteral`<``"Node 14 async"``\>]\> ; `timeoutMs`: `ZodNumber` ; `value`: `ZodString` }, `"strict"`,
`ZodTypeAny`, { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }, {
`environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }\>, `"many"`\>\> ;
`reservedParameters`: `ZodArray`<`ZodEffects`<`ZodObject`<{ `default`: `ZodOptional`<`ZodString`\> ; `fixed`:
`ZodOptional`<`ZodString`\> ; `name`: `ZodUnion`<[`ZodLiteral`<``"_type"``\>, `ZodLiteral`<``"_path"``\>,
`ZodLiteral`<``"_times"``\>]\> }, `"strict"`, `ZodTypeAny`, { `default?`: `string` ; `fixed?`: `string` ; `name`:
`"_type"` \| `"_path"` \| `"_times"` }, { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \|
`"_times"` }\>, { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }, {
`default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }\>, `"many"`\> ; `summary`:
`ZodOptional`<`ZodString`\> }, `"strict"`, `ZodTypeAny`, { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }, {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }\>, `"many"`\> ; `oisFormat`: `ZodEffects`<`ZodString`, `string`,
`string`\> ; `title`: `ZodString` ; `version`: `ZodEffects`<`ZodString`, `string`, `string`\> }, `"strict"`,
`ZodTypeAny`, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \|
`"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"`
} \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"`
\| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"`
; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| {
`in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>, { `apiSpecifications`: { `components`: { `securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"`
; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| {
`in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \|
`"relayRequesterAddress"` \| `"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`:
`Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"`
\| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: {
`url`: `string` }[] } ; `endpoints`: { `description?`: `string` ; `externalDocs?`: `string` ;
`fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \|
`"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ; `operation`: { `method`: `"get"` \|
`"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ; `description?`: `string` ; `example?`: `string` ;
`name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ;
`name`: `string` } ; `required?`: `boolean` }[] ; `postProcessingSpecifications?`: { `environment`: `"Node 14"` \|
`"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `preProcessingSpecifications?`: { `environment`:
`"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`: `string` }[] ; `reservedParameters`: { `default?`:
`string` ; `fixed?`: `string` ; `name`: `"_type"` \| `"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ;
`oisFormat`: `string` ; `title`: `string` ; `version`: `string` }, { `apiSpecifications`: { `components`: {
`securitySchemes`: `Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \|
`"header"` \| `"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ;
`name`: `string` ; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \|
`"relaySponsorAddress"` \| `"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"`
\| `"post"`, { `parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`:
`string` }[] }\>\>\> ; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: {
`description?`: `string` ; `externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`:
`"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ;
`name`: `string` ; `operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`:
`string` ; `description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"`
\| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\>\> = oisesSchema; `templates`: `ZodRecord`<`ZodString`, `ZodObject`<{ `decodedParameters`: `ZodArray`<`ZodObject`<{
`name`: `ZodString` ; `type`: `ZodString` ; `value`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `name`: `string` ;
`type`: `string` ; `value`: `string` }, { `name`: `string` ; `type`: `string` ; `value`: `string` }\>, `"many"`\> ;
`endpointId`: `ZodString` = evmEndpointIdSchema; `name`: `ZodString` ; `parameters`: `ZodString` ; `templateId`:
`ZodString` = evmTemplateIdSchema }, `"strict"`, `ZodTypeAny`, { `decodedParameters`: { `name`: `string` ; `type`:
`string` ; `value`: `string` }[] ; `endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`:
`string` ; `templateId`: `string` = evmTemplateIdSchema }, { `decodedParameters`: { `name`: `string` ; `type`: `string`
; `value`: `string` }[] ; `endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`: `string` ;
`templateId`: `string` = evmTemplateIdSchema }\>\> = templatesSchema }, `"strict"`, `ZodTypeAny`, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }\>, { `apiMetadata`:
{ orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }\>, { `apiMetadata`:
{ orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }, { `apiMetadata`: {
orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage:
string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; } = apiMetadataSchema; `beacons`:
`Record`<`string`, { name: string; description: string; beaconId: string; airnodeAddress: string; templateId: string;
chains: Record<string, { updateConditionPercentage?: number \| undefined; displayDisabled?: boolean \| undefined;
airseekerConfig?: { ...; } \| undefined; active: boolean; sponsor: string; topUpWallets: { ...; }[]; }\>; }\> =
beaconsSchema; `deployments`: `Record`<`string`, { `airkeeper`: `undefined` \| { aws?: { config?: any; secrets?: {
filename: string; content: string; } \| undefined; aws?: { filename: string; content: string; } \| undefined;
airkeeper?: any; } \| undefined; } ; `airnode`: { aws?: { config?: any; secrets?: { filename: string; content: string; }
\| undefined; aws?: { filename: string; content: string; } \| undefined; } \| undefined; gcp?: { config?: any; secrets?:
{ filename: string; content: string; } \| undefined; gcp?: any; } \| undefined; } = airnodeDeploymentSchema }\> =
deploymentsSchema; `ois`: `Record`<`string`, { `apiSpecifications`: { `components`: { `securitySchemes`:
`Record`<`string`, { `scheme`: `"bearer"` \| `"basic"` ; `type`: `"http"` } \| { `in`: `"query"` \| `"header"` \|
`"cookie"` ; `name`: `string` ; `type`: `"apiKey"` } \| { `in`: `"query"` \| `"header"` \| `"cookie"` ; `name`: `string`
; `type`: `"relayChainId"` \| `"relayChainType"` \| `"relayRequesterAddress"` \| `"relaySponsorAddress"` \|
`"relaySponsorWalletAddress"` }\> } ; `paths`: `Record`<`string`, `Partial`<`Record`<`"get"` \| `"post"`, {
`parameters`: { `in`: `"path"` \| `"query"` \| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` }[] }\>\>\>
; `security`: `Record`<`string`, []\> ; `servers`: { `url`: `string` }[] } ; `endpoints`: { `description?`: `string` ;
`externalDocs?`: `string` ; `fixedOperationParameters`: { `operationParameter`: { `in`: `"path"` \| `"query"` \|
`"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `value`: `string` }[] ; `name`: `string` ;
`operation`: { `method`: `"get"` \| `"post"` ; `path`: `string` } ; `parameters`: { `default?`: `string` ;
`description?`: `string` ; `example?`: `string` ; `name`: `string` ; `operationParameter`: { `in`: `"path"` \| `"query"`
\| `"header"` \| `"cookie"` \| `"processing"` ; `name`: `string` } ; `required?`: `boolean` }[] ;
`postProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number` ; `value`:
`string` }[] ; `preProcessingSpecifications?`: { `environment`: `"Node 14"` \| `"Node 14 async"` ; `timeoutMs`: `number`
; `value`: `string` }[] ; `reservedParameters`: { `default?`: `string` ; `fixed?`: `string` ; `name`: `"_type"` \|
`"_path"` \| `"_times"` }[] ; `summary?`: `string` }[] ; `oisFormat`: `string` ; `title`: `string` ; `version`: `string`
}\> = oisesSchema; `templates`: `Record`<`string`, { name: string; templateId: string; endpointId: string; parameters:
string; decodedParameters: { name: string; value: string; type: string; }[]; }\> = templatesSchema }\>\> = apisSchema;
`chains`: `ZodRecord`<`ZodString`, `ZodObject`<{ `blockTime`: `ZodOptional`<`ZodNumber`\> ; `contracts`: `ZodObject`<{
`AirnodeRrp`: `ZodOptional`<`ZodString`\> ; `DapiServer`: `ZodString` ; `RrpBeaconServer`: `ZodOptional`<`ZodString`\>
}, `"strip"`, `ZodTypeAny`, { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ; `RrpBeaconServer`:
`undefined` \| `string` }, { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ; `RrpBeaconServer`:
`undefined` \| `string` }\> = chainsMetadataContractsSchema; `decimalPlaces`: `ZodNumber` ; `explorerUrl`:
`ZodOptional`<`ZodString`\> ; `fullName`: `ZodString` ; `id`: `ZodString` ; `logoPath`: `ZodOptional`<`ZodString`\> ;
`name`: `ZodString` ; `nativeToken`: `ZodOptional`<`ZodString`\> ; `orderLogoPath`: `ZodOptional`<`ZodString`\> ;
`testnet`: `ZodOptional`<`ZodBoolean`\> }, `"strict"`, `ZodTypeAny`, { `blockTime`: `undefined` \| `number` ;
`contracts`: { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ; `RrpBeaconServer`: `undefined` \|
`string` } = chainsMetadataContractsSchema; `decimalPlaces`: `number` ; `explorerUrl`: `undefined` \| `string` ;
`fullName`: `string` ; `id`: `string` ; `logoPath`: `undefined` \| `string` ; `name`: `string` ; `nativeToken`:
`undefined` \| `string` ; `orderLogoPath`: `undefined` \| `string` ; `testnet`: `undefined` \| `boolean` }, {
`blockTime`: `undefined` \| `number` ; `contracts`: { `AirnodeRrp`: `undefined` \| `string` ; `DapiServer`: `string` ;
`RrpBeaconServer`: `undefined` \| `string` } = chainsMetadataContractsSchema; `decimalPlaces`: `number` ; `explorerUrl`:
`undefined` \| `string` ; `fullName`: `string` ; `id`: `string` ; `logoPath`: `undefined` \| `string` ; `name`: `string`
; `nativeToken`: `undefined` \| `string` ; `orderLogoPath`: `undefined` \| `string` ; `testnet`: `undefined` \|
`boolean` }\>\> = chainsSchema; `dapis`: `ZodRecord`<`ZodString`, `ZodRecord`<`ZodString`, `ZodString`\>\> =
dapisSchema; `explorer`: `ZodObject`<{ `beaconMetadata`: `ZodRecord`<`ZodString`, `ZodObject`<{ `category`: `ZodString`
; `decimalPlaces`: `ZodOptional`<`ZodNumber`\> ; `logos`: `ZodOptional`<`ZodArray`<`ZodString`, `"many"`\>\> ;
`pricingCoverage`: `ZodRecord`<`ZodString`, `ZodString`\> }, `"strip"`, `ZodTypeAny`, { `category`: `string` ;
`decimalPlaces`: `undefined` \| `number` ; `logos`: `undefined` \| `string`[] ; `pricingCoverage`: `Record`<`string`,
`string`\> }, { `category`: `string` ; `decimalPlaces`: `undefined` \| `number` ; `logos`: `undefined` \| `string`[] ;
`pricingCoverage`: `Record`<`string`, `string`\> }\>\> = beaconMetadataSchema; `beaconSets`:
`ZodEffects`<`ZodRecord`<`ZodString`, `ZodArray`<`ZodString`, `"many"`\>\>, `Record`<`string`, `string`[]\>,
`Record`<`string`, `string`[]\>\> = beaconSetsSchema; `commonLogos`: `ZodRecord`<`ZodString`, `ZodString`\> =
commonLogosSchema; `dapiMetadata`: `ZodRecord`<`ZodString`, `ZodObject`<{ `pricingCoverage`: `ZodRecord`<`ZodString`,
`ZodString`\> }, `"strip"`, `ZodTypeAny`, { `pricingCoverage`: `Record`<`string`, `string`\> }, { `pricingCoverage`:
`Record`<`string`, `string`\> }\>\> = dapiMetadataSchema; `pricingCoverage`: `ZodRecord`<`ZodString`,
`ZodArray`<`ZodObject`<{ `coverage`: `ZodNumber` ; `subscriptionFee`: `ZodNumber` }, `"strip"`, `ZodTypeAny`, {
`coverage`: `number` ; `subscriptionFee`: `number` }, { `coverage`: `number` ; `subscriptionFee`: `number` }\>,
`"many"`\>\> = pricingCoverageSchema }, `"strict"`, `ZodTypeAny`, { `beaconMetadata`: `Record`<`string`, { `category`:
`string` ; `decimalPlaces`: `undefined` \| `number` ; `logos`: `undefined` \| `string`[] ; `pricingCoverage`:
`Record`<`string`, `string`\> }\> = beaconMetadataSchema; `beaconSets`: `Record`<`string`, `string`[]\> =
beaconSetsSchema; `commonLogos`: `Record`<`string`, `string`\> = commonLogosSchema; `dapiMetadata`: `Record`<`string`, {
`pricingCoverage`: `Record`<`string`, `string`\> }\> = dapiMetadataSchema; `pricingCoverage`: `Record`<`string`, {
`coverage`: `number` ; `subscriptionFee`: `number` }[]\> = pricingCoverageSchema }, { `beaconMetadata`:
`Record`<`string`, { `category`: `string` ; `decimalPlaces`: `undefined` \| `number` ; `logos`: `undefined` \|
`string`[] ; `pricingCoverage`: `Record`<`string`, `string`\> }\> = beaconMetadataSchema; `beaconSets`:
`Record`<`string`, `string`[]\> = beaconSetsSchema; `commonLogos`: `Record`<`string`, `string`\> = commonLogosSchema;
`dapiMetadata`: `Record`<`string`, { `pricingCoverage`: `Record`<`string`, `string`\> }\> = dapiMetadataSchema;
`pricingCoverage`: `Record`<`string`, { `coverage`: `number` ; `subscriptionFee`: `number` }[]\> = pricingCoverageSchema
}\> = explorerSchema; `policies`: `ZodOptional`<`ZodRecord`<`ZodString`, `ZodObject`<{ `dapis`:
`ZodOptional`<`ZodRecord`<`ZodString`, `ZodObject`<`extendShape`<{ `beneficiaryAddress`: `ZodString` = evmAddressSchema;
`claimantAddress`: `ZodString` = evmAddressSchema; `coverageAmount`: `ZodString` ; `endDate`: `ZodNumber` ;
`ipfsPolicyHash`: `ZodString` ; `ipfsServicePolicyHash`: `ZodString` ; `paymentTxHash`: `ZodString` ; `readerAddress`:
`ZodString` = evmAddressSchema; `startDate`: `ZodNumber` }, { `dapiName`: `ZodString` }\>, `"strict"`, `ZodTypeAny`, {
`beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`: `string` = evmAddressSchema; `coverageAmount`:
`string` ; `dapiName`: `string` ; `endDate`: `number` ; `ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ;
`paymentTxHash`: `string` ; `readerAddress`: `string` = evmAddressSchema; `startDate`: `number` }, {
`beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`: `string` = evmAddressSchema; `coverageAmount`:
`string` ; `dapiName`: `string` ; `endDate`: `number` ; `ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ;
`paymentTxHash`: `string` ; `readerAddress`: `string` = evmAddressSchema; `startDate`: `number` }\>\>\> ; `dataFeeds`:
`ZodOptional`<`ZodRecord`<`ZodString`, `ZodObject`<`extendShape`<{ `beneficiaryAddress`: `ZodString` = evmAddressSchema;
`claimantAddress`: `ZodString` = evmAddressSchema; `coverageAmount`: `ZodString` ; `endDate`: `ZodNumber` ;
`ipfsPolicyHash`: `ZodString` ; `ipfsServicePolicyHash`: `ZodString` ; `paymentTxHash`: `ZodString` ; `readerAddress`:
`ZodString` = evmAddressSchema; `startDate`: `ZodNumber` }, { `dataFeedId`: `ZodString` = evmBeaconIdSchema }\>,
`"strict"`, `ZodTypeAny`, { `beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`: `string` =
evmAddressSchema; `coverageAmount`: `string` ; `dataFeedId`: `string` = evmBeaconIdSchema; `endDate`: `number` ;
`ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ; `paymentTxHash`: `string` ; `readerAddress`: `string` =
evmAddressSchema; `startDate`: `number` }, { `beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`:
`string` = evmAddressSchema; `coverageAmount`: `string` ; `dataFeedId`: `string` = evmBeaconIdSchema; `endDate`:
`number` ; `ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ; `paymentTxHash`: `string` ; `readerAddress`:
`string` = evmAddressSchema; `startDate`: `number` }\>\>\> }, `"strict"`, `ZodTypeAny`, { `dapis`: `undefined` \|
`Record`<`string`, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string;
coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string;
dapiName: string; }\> ; `dataFeeds`: `undefined` \| `Record`<`string`, { paymentTxHash: string; claimantAddress: string;
beneficiaryAddress: string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number;
ipfsPolicyHash: string; ipfsServicePolicyHash: string; dataFeedId: string; }\> }, { `dapis`: `undefined` \|
`Record`<`string`, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string;
coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string;
dapiName: string; }\> ; `dataFeeds`: `undefined` \| `Record`<`string`, { paymentTxHash: string; claimantAddress: string;
beneficiaryAddress: string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number;
ipfsPolicyHash: string; ipfsServicePolicyHash: string; dataFeedId: string; }\> }\>\>\> }, `"strict"`, `ZodTypeAny`, {
`api3`: `undefined` \| { airseeker: Record<string, { secrets?: { filename: string; content: string; } \| undefined;
airseeker?: any; }\>; } ; `apis`: `Record`<`string`, { apiMetadata: { orderLogoPath?: string \| undefined; name: string;
description: string; active: boolean; airnode: string; homepage: string; xpub: string; logoPath: string;
maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates: Record<...\>; deployments: Record<...\>; ois:
Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?: string \| undefined; orderLogoPath?: string \|
undefined; nativeToken?: string \| undefined; blockTime?: number \| undefined; testnet?: boolean \| undefined;
explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> = chainsSchema; `dapis`: `Record`<`string`,
`Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage: Record<string, { subscriptionFee: number;
coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?: number \| undefined; logos?: string[] \|
undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata: Record<...\>; beaconSets: Record<...\>;
commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \| `Record`<`string`, { dapis?: Record<string, {
paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount:
string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\>
\| undefined; dataFeeds?: Record<...\> \| undefined; }\> }, { `api3`: `undefined` \| { airseeker: Record<string, {
secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; } ; `apis`: `Record`<`string`, {
apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string;
homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates:
Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?:
string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string \| undefined; blockTime?: number \|
undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> =
chainsSchema; `dapis`: `Record`<`string`, `Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage:
Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?:
number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata:
Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \|
`Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress:
string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \| undefined; }\> }\>, {
`api3`: `undefined` \| { airseeker: Record<string, { secrets?: { filename: string; content: string; } \| undefined;
airseeker?: any; }\>; } ; `apis`: `Record`<`string`, { apiMetadata: { orderLogoPath?: string \| undefined; name: string;
description: string; active: boolean; airnode: string; homepage: string; xpub: string; logoPath: string;
maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates: Record<...\>; deployments: Record<...\>; ois:
Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?: string \| undefined; orderLogoPath?: string \|
undefined; nativeToken?: string \| undefined; blockTime?: number \| undefined; testnet?: boolean \| undefined;
explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> = chainsSchema; `dapis`: `Record`<`string`,
`Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage: Record<string, { subscriptionFee: number;
coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?: number \| undefined; logos?: string[] \|
undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata: Record<...\>; beaconSets: Record<...\>;
commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \| `Record`<`string`, { dapis?: Record<string, {
paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount:
string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\>
\| undefined; dataFeeds?: Record<...\> \| undefined; }\> }, { `api3`: `undefined` \| { airseeker: Record<string, {
secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; } ; `apis`: `Record`<`string`, {
apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string;
homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates:
Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?:
string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string \| undefined; blockTime?: number \|
undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> =
chainsSchema; `dapis`: `Record`<`string`, `Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage:
Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?:
number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata:
Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \|
`Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress:
string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \| undefined; }\> }\>, {
`api3`: `undefined` \| { airseeker: Record<string, { secrets?: { filename: string; content: string; } \| undefined;
airseeker?: any; }\>; } ; `apis`: `Record`<`string`, { apiMetadata: { orderLogoPath?: string \| undefined; name: string;
description: string; active: boolean; airnode: string; homepage: string; xpub: string; logoPath: string;
maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates: Record<...\>; deployments: Record<...\>; ois:
Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?: string \| undefined; orderLogoPath?: string \|
undefined; nativeToken?: string \| undefined; blockTime?: number \| undefined; testnet?: boolean \| undefined;
explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> = chainsSchema; `dapis`: `Record`<`string`,
`Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage: Record<string, { subscriptionFee: number;
coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?: number \| undefined; logos?: string[] \|
undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata: Record<...\>; beaconSets: Record<...\>;
commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \| `Record`<`string`, { dapis?: Record<string, {
paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount:
string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\>
\| undefined; dataFeeds?: Record<...\> \| undefined; }\> }, { `api3`: `undefined` \| { airseeker: Record<string, {
secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; } ; `apis`: `Record`<`string`, {
apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string;
homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates:
Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?:
string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string \| undefined; blockTime?: number \|
undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> =
chainsSchema; `dapis`: `Record`<`string`, `Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage:
Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?:
number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata:
Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \|
`Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress:
string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \| undefined; }\> }\>, {
`api3`: `undefined` \| { airseeker: Record<string, { secrets?: { filename: string; content: string; } \| undefined;
airseeker?: any; }\>; } ; `apis`: `Record`<`string`, { apiMetadata: { orderLogoPath?: string \| undefined; name: string;
description: string; active: boolean; airnode: string; homepage: string; xpub: string; logoPath: string;
maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates: Record<...\>; deployments: Record<...\>; ois:
Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?: string \| undefined; orderLogoPath?: string \|
undefined; nativeToken?: string \| undefined; blockTime?: number \| undefined; testnet?: boolean \| undefined;
explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> = chainsSchema; `dapis`: `Record`<`string`,
`Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage: Record<string, { subscriptionFee: number;
coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?: number \| undefined; logos?: string[] \|
undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata: Record<...\>; beaconSets: Record<...\>;
commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \| `Record`<`string`, { dapis?: Record<string, {
paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount:
string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\>
\| undefined; dataFeeds?: Record<...\> \| undefined; }\> }, { `api3`: `undefined` \| { airseeker: Record<string, {
secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; } ; `apis`: `Record`<`string`, {
apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string;
homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates:
Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?:
string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string \| undefined; blockTime?: number \|
undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> =
chainsSchema; `dapis`: `Record`<`string`, `Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage:
Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?:
number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata:
Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \|
`Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress:
string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \| undefined; }\> }\>, {
`api3`: `undefined` \| { airseeker: Record<string, { secrets?: { filename: string; content: string; } \| undefined;
airseeker?: any; }\>; } ; `apis`: `Record`<`string`, { apiMetadata: { orderLogoPath?: string \| undefined; name: string;
description: string; active: boolean; airnode: string; homepage: string; xpub: string; logoPath: string;
maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates: Record<...\>; deployments: Record<...\>; ois:
Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?: string \| undefined; orderLogoPath?: string \|
undefined; nativeToken?: string \| undefined; blockTime?: number \| undefined; testnet?: boolean \| undefined;
explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> = chainsSchema; `dapis`: `Record`<`string`,
`Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage: Record<string, { subscriptionFee: number;
coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?: number \| undefined; logos?: string[] \|
undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata: Record<...\>; beaconSets: Record<...\>;
commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \| `Record`<`string`, { dapis?: Record<string, {
paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount:
string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\>
\| undefined; dataFeeds?: Record<...\> \| undefined; }\> }, { `api3`: `undefined` \| { airseeker: Record<string, {
secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; } ; `apis`: `Record`<`string`, {
apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string;
homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates:
Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?:
string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string \| undefined; blockTime?: number \|
undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> =
chainsSchema; `dapis`: `Record`<`string`, `Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage:
Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?:
number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata:
Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \|
`Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress:
string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \| undefined; }\> }\>, {
`api3`: `undefined` \| { airseeker: Record<string, { secrets?: { filename: string; content: string; } \| undefined;
airseeker?: any; }\>; } ; `apis`: `Record`<`string`, { apiMetadata: { orderLogoPath?: string \| undefined; name: string;
description: string; active: boolean; airnode: string; homepage: string; xpub: string; logoPath: string;
maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates: Record<...\>; deployments: Record<...\>; ois:
Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?: string \| undefined; orderLogoPath?: string \|
undefined; nativeToken?: string \| undefined; blockTime?: number \| undefined; testnet?: boolean \| undefined;
explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> = chainsSchema; `dapis`: `Record`<`string`,
`Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage: Record<string, { subscriptionFee: number;
coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?: number \| undefined; logos?: string[] \|
undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata: Record<...\>; beaconSets: Record<...\>;
commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \| `Record`<`string`, { dapis?: Record<string, {
paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount:
string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\>
\| undefined; dataFeeds?: Record<...\> \| undefined; }\> }, { `api3`: `undefined` \| { airseeker: Record<string, {
secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; } ; `apis`: `Record`<`string`, {
apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string;
homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates:
Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?:
string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string \| undefined; blockTime?: number \|
undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> =
chainsSchema; `dapis`: `Record`<`string`, `Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage:
Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?:
number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata:
Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \|
`Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress:
string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \| undefined; }\> }\>, {
`api3`: `undefined` \| { airseeker: Record<string, { secrets?: { filename: string; content: string; } \| undefined;
airseeker?: any; }\>; } ; `apis`: `Record`<`string`, { apiMetadata: { orderLogoPath?: string \| undefined; name: string;
description: string; active: boolean; airnode: string; homepage: string; xpub: string; logoPath: string;
maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates: Record<...\>; deployments: Record<...\>; ois:
Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?: string \| undefined; orderLogoPath?: string \|
undefined; nativeToken?: string \| undefined; blockTime?: number \| undefined; testnet?: boolean \| undefined;
explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> = chainsSchema; `dapis`: `Record`<`string`,
`Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage: Record<string, { subscriptionFee: number;
coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?: number \| undefined; logos?: string[] \|
undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata: Record<...\>; beaconSets: Record<...\>;
commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \| `Record`<`string`, { dapis?: Record<string, {
paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount:
string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\>
\| undefined; dataFeeds?: Record<...\> \| undefined; }\> }, { `api3`: `undefined` \| { airseeker: Record<string, {
secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; } ; `apis`: `Record`<`string`, {
apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string;
homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates:
Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?:
string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string \| undefined; blockTime?: number \|
undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> =
chainsSchema; `dapis`: `Record`<`string`, `Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage:
Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?:
number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata:
Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \|
`Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress:
string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \| undefined; }\> }\>

Operations Repository

**`Param`**

Contains API providers, keyed by their filesystem-safe name

**`Param`**

Contains chains, keyed by their filesystem-safe name

**`Param`**

Contains metadata related to API3

**`Param`**

Contains dapi mappings, keyed by chain name

**`Param`**

Contains metadata used by the API3 Explorer for rendering feeds in a UI context

**`Param`**

Contains metadata around policies committed on-chain

#### Defined in

[src/utils/validation.ts:500](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L500)

---

### policiesSchema

• `Const` **policiesSchema**: `ZodObject`<{ `dapis`: `ZodOptional`<`ZodRecord`<`ZodString`, `ZodObject`<`extendShape`<{
`beneficiaryAddress`: `ZodString` = evmAddressSchema; `claimantAddress`: `ZodString` = evmAddressSchema;
`coverageAmount`: `ZodString` ; `endDate`: `ZodNumber` ; `ipfsPolicyHash`: `ZodString` ; `ipfsServicePolicyHash`:
`ZodString` ; `paymentTxHash`: `ZodString` ; `readerAddress`: `ZodString` = evmAddressSchema; `startDate`: `ZodNumber`
}, { `dapiName`: `ZodString` }\>, `"strict"`, `ZodTypeAny`, { `beneficiaryAddress`: `string` = evmAddressSchema;
`claimantAddress`: `string` = evmAddressSchema; `coverageAmount`: `string` ; `dapiName`: `string` ; `endDate`: `number`
; `ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ; `paymentTxHash`: `string` ; `readerAddress`: `string`
= evmAddressSchema; `startDate`: `number` }, { `beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`:
`string` = evmAddressSchema; `coverageAmount`: `string` ; `dapiName`: `string` ; `endDate`: `number` ; `ipfsPolicyHash`:
`string` ; `ipfsServicePolicyHash`: `string` ; `paymentTxHash`: `string` ; `readerAddress`: `string` = evmAddressSchema;
`startDate`: `number` }\>\>\> ; `dataFeeds`: `ZodOptional`<`ZodRecord`<`ZodString`, `ZodObject`<`extendShape`<{
`beneficiaryAddress`: `ZodString` = evmAddressSchema; `claimantAddress`: `ZodString` = evmAddressSchema;
`coverageAmount`: `ZodString` ; `endDate`: `ZodNumber` ; `ipfsPolicyHash`: `ZodString` ; `ipfsServicePolicyHash`:
`ZodString` ; `paymentTxHash`: `ZodString` ; `readerAddress`: `ZodString` = evmAddressSchema; `startDate`: `ZodNumber`
}, { `dataFeedId`: `ZodString` = evmBeaconIdSchema }\>, `"strict"`, `ZodTypeAny`, { `beneficiaryAddress`: `string` =
evmAddressSchema; `claimantAddress`: `string` = evmAddressSchema; `coverageAmount`: `string` ; `dataFeedId`: `string` =
evmBeaconIdSchema; `endDate`: `number` ; `ipfsPolicyHash`: `string` ; `ipfsServicePolicyHash`: `string` ;
`paymentTxHash`: `string` ; `readerAddress`: `string` = evmAddressSchema; `startDate`: `number` }, {
`beneficiaryAddress`: `string` = evmAddressSchema; `claimantAddress`: `string` = evmAddressSchema; `coverageAmount`:
`string` ; `dataFeedId`: `string` = evmBeaconIdSchema; `endDate`: `number` ; `ipfsPolicyHash`: `string` ;
`ipfsServicePolicyHash`: `string` ; `paymentTxHash`: `string` ; `readerAddress`: `string` = evmAddressSchema;
`startDate`: `number` }\>\>\> }, `"strict"`, `ZodTypeAny`, { `dapis`: `undefined` \| `Record`<`string`, { paymentTxHash:
string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount: string; startDate:
number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\> ; `dataFeeds`:
`undefined` \| `Record`<`string`, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string;
readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dataFeedId: string; }\> }, { `dapis`: `undefined` \| `Record`<`string`, { paymentTxHash:
string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount: string; startDate:
number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\> ; `dataFeeds`:
`undefined` \| `Record`<`string`, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string;
readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dataFeedId: string; }\> }\>

Policies

Policies are keyed by the names of chain on which they are deployed.

#### Defined in

[src/utils/validation.ts:483](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L483)

---

### pricingCoverageSchema

• `Const` **pricingCoverageSchema**: `ZodRecord`<`ZodString`, `ZodArray`<`ZodObject`<{ `coverage`: `ZodNumber` ;
`subscriptionFee`: `ZodNumber` }, `"strip"`, `ZodTypeAny`, { `coverage`: `number` ; `subscriptionFee`: `number` }, {
`coverage`: `number` ; `subscriptionFee`: `number` }\>, `"many"`\>\>

Pricing and Coverage

Values are in USD equivalent.

**`Param`**

API3-specific subscription fee per data feed for UI display

**`Param`**

The amount of coverage a data feed consumer will receive

#### Defined in

[src/utils/validation.ts:384](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L384)

---

### secretsSchema

• `Const` **secretsSchema**: `ZodObject`<{ `content`: `ZodString` ; `filename`: `ZodString` }, `"strip"`, `ZodTypeAny`,
{ `content`: `string` ; `filename`: `string` }, { `content`: `string` ; `filename`: `string` }\>

Secrets Schema

Secrets are expected to not be stored in the operations repository, only templates lacking actual sensitive content.
Secrets files are handled as an object containing a filename and their string content - essentially pass-through.

#### Defined in

[src/utils/validation.ts:108](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L108)

---

### templateDecodedParametersSchema

• `Const` **templateDecodedParametersSchema**: `ZodObject`<{ `name`: `ZodString` ; `type`: `ZodString` ; `value`:
`ZodString` }, `"strip"`, `ZodTypeAny`, { `name`: `string` ; `type`: `string` ; `value`: `string` }, { `name`: `string`
; `type`: `string` ; `value`: `string` }\>

An Airnode Template

Please see documentation here:
https://docs.api3.org/airnode/latest/grp-developers/using-templates.html#part-1-build-a-template

#### Defined in

[src/utils/validation.ts:186](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L186)

---

### templateSchema

• `Const` **templateSchema**: `ZodObject`<{ `decodedParameters`: `ZodArray`<`ZodObject`<{ `name`: `ZodString` ; `type`:
`ZodString` ; `value`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `name`: `string` ; `type`: `string` ; `value`: `string`
}, { `name`: `string` ; `type`: `string` ; `value`: `string` }\>, `"many"`\> ; `endpointId`: `ZodString` =
evmEndpointIdSchema; `name`: `ZodString` ; `parameters`: `ZodString` ; `templateId`: `ZodString` = evmTemplateIdSchema
}, `"strict"`, `ZodTypeAny`, { `decodedParameters`: { `name`: `string` ; `type`: `string` ; `value`: `string` }[] ;
`endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`: `string` ; `templateId`: `string` =
evmTemplateIdSchema }, { `decodedParameters`: { `name`: `string` ; `type`: `string` ; `value`: `string` }[] ;
`endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`: `string` ; `templateId`: `string` =
evmTemplateIdSchema }\>

Template Schema

**`Param`**

A UI-suitable formatted name

**`Param`**

Referenced by beacons and used to generate configuration files for Airnode, Airkeeper and Airseeker

**`Param`**

References an OIS-based endpoint: https//docs.api3.org/airnode/latest/concepts/endpoint.html#endpointid

**`Param`**

Encoded parameters - derived from `decodedParameters` and used in consuming applications

**`Param`**

Used as an input into the generation of `parameters`. See
https://docs.api3.org/airnode/latest/reference/deployment-files/config-json.html#triggers

#### Defined in

[src/utils/validation.ts:201](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L201)

---

### templatesSchema

• `Const` **templatesSchema**: `ZodRecord`<`ZodString`, `ZodObject`<{ `decodedParameters`: `ZodArray`<`ZodObject`<{
`name`: `ZodString` ; `type`: `ZodString` ; `value`: `ZodString` }, `"strip"`, `ZodTypeAny`, { `name`: `string` ;
`type`: `string` ; `value`: `string` }, { `name`: `string` ; `type`: `string` ; `value`: `string` }\>, `"many"`\> ;
`endpointId`: `ZodString` = evmEndpointIdSchema; `name`: `ZodString` ; `parameters`: `ZodString` ; `templateId`:
`ZodString` = evmTemplateIdSchema }, `"strict"`, `ZodTypeAny`, { `decodedParameters`: { `name`: `string` ; `type`:
`string` ; `value`: `string` }[] ; `endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`:
`string` ; `templateId`: `string` = evmTemplateIdSchema }, { `decodedParameters`: { `name`: `string` ; `type`: `string`
; `value`: `string` }[] ; `endpointId`: `string` = evmEndpointIdSchema; `name`: `string` ; `parameters`: `string` ;
`templateId`: `string` = evmTemplateIdSchema }\>\>

Templates Schema

Templates are keyed by their `templateId`

#### Defined in

[src/utils/validation.ts:216](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L216)

---

### topUpWalletSchema

• `Const` **topUpWalletSchema**: `ZodObject`<{ `address`: `ZodOptional`<`ZodString`\> ; `walletType`:
`ZodEnum`<[``"Provider"``, ``"API3"``, ``"Provider-Sponsor"``, ``"API3-Sponsor"``]\> = walletTypeSchema }, `"strict"`,
`ZodTypeAny`, { `address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \| `"Provider-Sponsor"` \|
`"API3-Sponsor"` = walletTypeSchema }, { `address`: `undefined` \| `string` ; `walletType`: `"Provider"` \| `"API3"` \|
`"Provider-Sponsor"` \| `"API3-Sponsor"` = walletTypeSchema }\>

Wallet Top-up Schema

A wallet to be monitored for topping up. These wallets are used by Airkeeper and potentially Airseeker to fulfil
on-chain value update requests against a DapiServer contract instance.

#### Defined in

[src/utils/validation.ts:45](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L45)

---

### walletTypeSchema

• `Const` **walletTypeSchema**: `ZodEnum`<[``"Provider"``, ``"API3"``, ``"Provider-Sponsor"``, ``"API3-Sponsor"``]\>

Wallet types

The type of wallet specified.

If a wallet type contains "Sponsor" it means the target wallet must be derived using the Airnode Sponsor-wallet
algorithm: https://docs.api3.org/airnode/latest/concepts/sponsor.html#derive-a-sponsor-wallet

If a wallet type does not contain "Sponsor" it is the derived target wallet.

#### Defined in

[src/utils/validation.ts:37](https://github.com/api3dao/operations/blob/0d61e4d/src/utils/validation.ts#L37)

## Functions

### replaceInterpolatedVariables

▸ **replaceInterpolatedVariables**(`object`): `any`

#### Parameters

| Name     | Type  |
| :------- | :---- |
| `object` | `any` |

#### Returns

`any`

---

### validate

▸ **validate**(`payload`): `Promise`<[`ValidationResult`](types.md#validationresult)<{ `api3`: `undefined` \| {
airseeker: Record<string, { secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; } ;
`apis`: `Record`<`string`, { apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string;
active: boolean; airnode: string; homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; };
beacons: Record<...\>; templates: Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\> = apisSchema;
`chains`: `Record`<`string`, { logoPath?: string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string
\| undefined; blockTime?: number \| undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4
more ...; id: string; }\> = chainsSchema; `dapis`: `Record`<`string`, `Record`<`string`, `string`\>\> = dapisSchema;
`explorer`: { pricingCoverage: Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata:
Record<string, { decimalPlaces?: number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage:
Record<...\>; }\>; dapiMetadata: Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; } = explorerSchema;
`policies`: `undefined` \| `Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string;
beneficiaryAddress: string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number;
ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \|
undefined; }\> }\>\>

#### Parameters

| Name               | Type                                                                                                                                                                                                                                                                                                                                                              | Default value    |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------- |
| `payload`          | `Object`                                                                                                                                                                                                                                                                                                                                                          | `undefined`      |
| `payload.api3`     | `undefined` \| { airseeker: Record<string, { secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; }                                                                                                                                                                                                                               | `undefined`      |
| `payload.apis`     | `Record`<`string`, { apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string; homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates: Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\>                               | `apisSchema`     |
| `payload.chains`   | `Record`<`string`, { logoPath?: string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string \| undefined; blockTime?: number \| undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\>                                                                                                  | `chainsSchema`   |
| `payload.dapis`    | `Record`<`string`, `Record`<`string`, `string`\>\>                                                                                                                                                                                                                                                                                                                | `dapisSchema`    |
| `payload.explorer` | { pricingCoverage: Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?: number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata: Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; }                               | `explorerSchema` |
| `payload.policies` | `undefined` \| `Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress: string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string; ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \| undefined; }\> | `undefined`      |

#### Returns

`Promise`<[`ValidationResult`](types.md#validationresult)<{ `api3`: `undefined` \| { airseeker: Record<string, {
secrets?: { filename: string; content: string; } \| undefined; airseeker?: any; }\>; } ; `apis`: `Record`<`string`, {
apiMetadata: { orderLogoPath?: string \| undefined; name: string; description: string; active: boolean; airnode: string;
homepage: string; xpub: string; logoPath: string; maxSubscriptionPeriod: number; }; beacons: Record<...\>; templates:
Record<...\>; deployments: Record<...\>; ois: Record<...\>; }\> = apisSchema; `chains`: `Record`<`string`, { logoPath?:
string \| undefined; orderLogoPath?: string \| undefined; nativeToken?: string \| undefined; blockTime?: number \|
undefined; testnet?: boolean \| undefined; explorerUrl?: string \| undefined; ... 4 more ...; id: string; }\> =
chainsSchema; `dapis`: `Record`<`string`, `Record`<`string`, `string`\>\> = dapisSchema; `explorer`: { pricingCoverage:
Record<string, { subscriptionFee: number; coverage: number; }[]\>; beaconMetadata: Record<string, { decimalPlaces?:
number \| undefined; logos?: string[] \| undefined; category: string; pricingCoverage: Record<...\>; }\>; dapiMetadata:
Record<...\>; beaconSets: Record<...\>; commonLogos: Record<...\>; } = explorerSchema; `policies`: `undefined` \|
`Record`<`string`, { dapis?: Record<string, { paymentTxHash: string; claimantAddress: string; beneficiaryAddress:
string; readerAddress: string; coverageAmount: string; startDate: number; endDate: number; ipfsPolicyHash: string;
ipfsServicePolicyHash: string; dapiName: string; }\> \| undefined; dataFeeds?: Record<...\> \| undefined; }\> }\>\>
