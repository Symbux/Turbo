# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.6.15](https://github.com/Symbux/Turbo/compare/v0.6.14...v0.6.15) - 2023-04-12

### Commits

- Updated dependencies [`48416b6`](https://github.com/Symbux/Turbo/commit/48416b649fc37d72dc08d6e6d510d8736b333940)
- Updated changelog. [`f71f590`](https://github.com/Symbux/Turbo/commit/f71f590072e3ba1e45f42922b04c434b1065bbbb)

## [v0.6.14](https://github.com/Symbux/Turbo/compare/v0.6.13...v0.6.14) - 2022-09-15

### Commits

- Updated dev dependencies to latest. [`08c5ccc`](https://github.com/Symbux/Turbo/commit/08c5cccd6a986133b66924b92141d2166772450a)
- Updated changelog. [`3e7d4cd`](https://github.com/Symbux/Turbo/commit/3e7d4cd67e721caa7cef5ad33067c7a9918554b9)

## [v0.6.13](https://github.com/Symbux/Turbo/compare/v0.6.12...v0.6.13) - 2022-09-04

### Commits

- Updated all dependencies and fupdated the http plugin to support an updated option for the fileupload. [`a456d08`](https://github.com/Symbux/Turbo/commit/a456d0869a42ebc875e07224c052c12dad1a5e23)
- Updated changelog. [`9c8a03f`](https://github.com/Symbux/Turbo/commit/9c8a03f742b13434d3b1ab862d624c17fe35e1af)
- Update README.md [`580bf03`](https://github.com/Symbux/Turbo/commit/580bf03a44da17a4973442a3006ebdd4f6a8721e)

## [v0.6.12](https://github.com/Symbux/Turbo/compare/v0.6.11...v0.6.12) - 2022-07-23

### Commits

- Updated all packages [`9f658f3`](https://github.com/Symbux/Turbo/commit/9f658f3f74d161284c710abc9f824779b336238b)
- Updated changelog. [`07e9ba0`](https://github.com/Symbux/Turbo/commit/07e9ba00ce7cd58b936d3f0a1d42b72bb7543859)

## [v0.6.11](https://github.com/Symbux/Turbo/compare/v0.6.10...v0.6.11) - 2022-06-28

### Commits

- Fixed route generation to use on-the-fly route generation for multi-path routes. [`ee58865`](https://github.com/Symbux/Turbo/commit/ee588658d0d93eb08b7d13d333c11a8fda9eb2f0)
- Updated the packages to the latest version, including upgrade prisma to v4. [`da228a5`](https://github.com/Symbux/Turbo/commit/da228a50f64366518290b619fff5a3f4e506edcb)
- Added support for allowing multiple paths being defined in a single decorator method. [`354e950`](https://github.com/Symbux/Turbo/commit/354e950a311b70b017382536f13e12210260e25c)
- Added an example of a listener that injects a dynamic route controller, alongside additional changes. [`87c313d`](https://github.com/Symbux/Turbo/commit/87c313dfe9105759fe2194a7c3bfda9c7cbb3384)
- Updated changelog. [`a0396c4`](https://github.com/Symbux/Turbo/commit/a0396c4ab112ba4316c372f22e1ad37abba2fd0d)
- Lower cased the wording for the turbo version and server header for the http plugin. [`f14188c`](https://github.com/Symbux/Turbo/commit/f14188c48148b0cbb92a7438cb630447b38b7ac6)
- Fixed route generation to use on-the-fly route generation for multi-path routes. [`a758d16`](https://github.com/Symbux/Turbo/commit/a758d169603e30e3f742fb920e0a797c945129f3)

## [v0.6.10](https://github.com/Symbux/Turbo/compare/v0.6.9...v0.6.10) - 2022-06-27

### Fixed

- Installed and setup the compression library for gzip compression within the HTTP plugin, fixes #21 [`#21`](https://github.com/Symbux/Turbo/issues/21)

### Commits

- Added missing catch around the route, to return a 500 on any error if no catch provided. [`058d317`](https://github.com/Symbux/Turbo/commit/058d317149a5871a31e6d9b2beabb1af4f87b763)
- Added new @Http.Catch decorator, that takes a function that accepts an error and will expect a http.response. [`3aed806`](https://github.com/Symbux/Turbo/commit/3aed8060a80be099a6c6fe5582096de9a57f8ad8)
- Added support for calling tasks and executing them directly from the controller. [`25969c2`](https://github.com/Symbux/Turbo/commit/25969c293fd3ad4bcc00a42d023be5a28c841d84)
- Allowed TS ignore comments provided a message is given, used only for designing. [`e073a98`](https://github.com/Symbux/Turbo/commit/e073a980ab04008145402788cd188280848782e6)
- Written changelog. [`57b4b4a`](https://github.com/Symbux/Turbo/commit/57b4b4a1bf11c2fdbc9372f964d3b32c55ff5595)
- Updated package version. [`7f045ea`](https://github.com/Symbux/Turbo/commit/7f045ea16071b509fcc1051d26ed7969b7020f54)
- Updated the license to read correctly. [`70d6cae`](https://github.com/Symbux/Turbo/commit/70d6cae1dc165850a3f64ac485abe24a83ff43b0)

## [v0.6.9](https://github.com/Symbux/Turbo/compare/v0.6.8...v0.6.9) - 2022-06-21

### Commits

- Updated all dependencies. [`ded2b0d`](https://github.com/Symbux/Turbo/commit/ded2b0d69de1c51d716a581d7bbe6590649d4b2e)
- Updated changelog. [`7321cb5`](https://github.com/Symbux/Turbo/commit/7321cb55c83f315363f3e146923ed79d02ed1374)

## [v0.6.8](https://github.com/Symbux/Turbo/compare/v0.6.7...v0.6.8) - 2022-05-17

### Commits

- Fixed an issue where returning false in middlewares were not throwing unauthorised errors, but rather were simply leaving the connection hanging. [`1177798`](https://github.com/Symbux/Turbo/commit/1177798581e4d384818e0bce58595fa1537b3aae)
- Updated changelog. [`9db3086`](https://github.com/Symbux/Turbo/commit/9db308601c7e3aa2853819439b9048687a34f421)
- Bumped package version. [`3933f4b`](https://github.com/Symbux/Turbo/commit/3933f4bba35c88fa93d2c526f62ebef1a30a1e91)

## [v0.6.7](https://github.com/Symbux/Turbo/compare/v0.6.6...v0.6.7) - 2022-05-17

### Commits

- Updated all dependencies. [`37a1f60`](https://github.com/Symbux/Turbo/commit/37a1f60e366a3be8a6af115e440ead253f275838)
- Updated changelog. [`632f790`](https://github.com/Symbux/Turbo/commit/632f790c4753821585723e3a43a9e2bee382d06e)

## [v0.6.6](https://github.com/Symbux/Turbo/compare/v0.6.5...v0.6.6) - 2022-04-26

### Commits

- Removed jest and ts-jest. [`f4abaab`](https://github.com/Symbux/Turbo/commit/f4abaabe38c2103f4626175c13eb490d40a4b66e)
- Updated changelog. [`99ce9aa`](https://github.com/Symbux/Turbo/commit/99ce9aa5a8e460df0103438e832cb1315a2d72ee)

## [v0.6.5](https://github.com/Symbux/Turbo/compare/v0.6.4...v0.6.5) - 2022-04-26

### Commits

- Added latest packages. [`f67a3a2`](https://github.com/Symbux/Turbo/commit/f67a3a2875d38d57a84c012b3bc825f8dd5ce32c)
- Updated changelog. [`2af624d`](https://github.com/Symbux/Turbo/commit/2af624dfd92f8e8aca4fea06b9d58ca5473b8466)

## [v0.6.4](https://github.com/Symbux/Turbo/compare/v0.6.3...v0.6.4) - 2022-04-22

### Commits

- Moved all packages to using node: prefix. [`dce64c3`](https://github.com/Symbux/Turbo/commit/dce64c34591df7880b48c16ab92ad3bddaaada17)
- Downgraded to chalk 4.1.2 because the owner doesn't support CJS anymore. [`198f092`](https://github.com/Symbux/Turbo/commit/198f0923fa4c24db649ca01302bbd0f8c1ee8ca0)
- Updated changelog. [`e5de9f2`](https://github.com/Symbux/Turbo/commit/e5de9f24a400da99eec490a00ba1ca016deb934c)

## [v0.6.3](https://github.com/Symbux/Turbo/compare/v0.6.2...v0.6.3) - 2022-04-22

### Commits

- Updated all dependencies. [`db9fe0f`](https://github.com/Symbux/Turbo/commit/db9fe0f71f0c8955505f0602372f4ed66bbbcbd8)
- Updated changelog [`3a60aba`](https://github.com/Symbux/Turbo/commit/3a60abaac2dad6b5e05364f9c6c191f662622c9c)
- Bumped package version. [`caffce8`](https://github.com/Symbux/Turbo/commit/caffce89e54e420e07e35783bf435304fb956d3c)

## [v0.6.2](https://github.com/Symbux/Turbo/compare/v0.6.1...v0.6.2) - 2022-02-25

### Commits

- Updated changelog [`6a8b7b8`](https://github.com/Symbux/Turbo/commit/6a8b7b830fed7c1005af2581973588ab5e53fd12)
- Removed code, due to getInstance already existing. [`9772e26`](https://github.com/Symbux/Turbo/commit/9772e2636b5fdb82eb863aa1c355aba750b3a3ab)

## [v0.6.1](https://github.com/Symbux/Turbo/compare/v0.6.0...v0.6.1) - 2022-02-25

### Commits

- Added getServer access for when injecting, this allows plugins (like turbo-ui) to access the core server, as Vite needs to apply middlewares. [`d009c32`](https://github.com/Symbux/Turbo/commit/d009c326eee210311f9fa595e335a90b8f480be3)
- Bumped package version. [`af066b4`](https://github.com/Symbux/Turbo/commit/af066b4462eebde381f3cec20478c016760eec47)

## [v0.6.0](https://github.com/Symbux/Turbo/compare/v0.5.0...v0.6.0) - 2022-02-24

### Fixed

- Added support for custom loggers, closes #12 [`#12`](https://github.com/Symbux/Turbo/issues/12)
- Added support for file uploading closes #14 [`#14`](https://github.com/Symbux/Turbo/issues/14)

### Commits

- Updated package version and updated all dependencies. [`989b46f`](https://github.com/Symbux/Turbo/commit/989b46f62ea7e098c48e805d9aa44e982575b480)
- Recreated yarn lock file. [`5ebb2bc`](https://github.com/Symbux/Turbo/commit/5ebb2bcc6b70eaa8f07ce335650cbab7f97f8d72)
- Added exception handler for handling any kind errors from the platform, this is to allow graceful shutdowns and alongside that avoid shutdowns entirely, but be careful this could cause issues if an application constantly starts erroring, make sure to validate the error before allowing yourself to continue. [`fc56bf3`](https://github.com/Symbux/Turbo/commit/fc56bf34fc6d29d2db4f30b67757dac4303c6c97)
- Updated changelog. [`804d9ee`](https://github.com/Symbux/Turbo/commit/804d9ee142357af6516c5c7061ec8627f72b80e1)

## [v0.5.0](https://github.com/Symbux/Turbo/compare/v0.4.1...v0.5.0) - 2022-02-22

### Fixed

- Added new cache functionality for the HTTP, this is a dynamic structure that allows you to offer any kind of cache system you want, for an item to be cacheable when creating your http response you must pass true as the 4th parameter (isCacheable), closes #10 [`#10`](https://github.com/Symbux/Turbo/issues/10)

### Commits

- Updated changelog. [`3f65ee3`](https://github.com/Symbux/Turbo/commit/3f65ee34b57a3f996347f9abce8976a1d8c21aa8)
- Updated the package version. [`95f0b06`](https://github.com/Symbux/Turbo/commit/95f0b062c50c196aad6c62c60e40e550912464c8)

## [v0.4.1](https://github.com/Symbux/Turbo/compare/v0.4.0...v0.4.1) - 2022-02-22

### Commits

- Updated version number. [`b213b16`](https://github.com/Symbux/Turbo/commit/b213b16ce6371eb2c1670fa1039394abf4947370)
- Updated changelog. [`a56a205`](https://github.com/Symbux/Turbo/commit/a56a205f4fdc26fdf3c7adf0d9f0a9604d3a102f)

## [v0.4.0](https://github.com/Symbux/Turbo/compare/v0.3.7...v0.4.0) - 2022-02-22

### Commits

- Added event listener support from #7 suggestion, added awaitable option to wait before shutting down. [`d0d916d`](https://github.com/Symbux/Turbo/commit/d0d916d48f23f7da7c790d764a787209b8d54bc2)
- Exported the event manager. [`9b5c939`](https://github.com/Symbux/Turbo/commit/9b5c939c784c54c93c70ed07d1696a70e1801d26)
- Updated changelog. [`650ac27`](https://github.com/Symbux/Turbo/commit/650ac274f2622f242467043b296ae581a662070e)

## [v0.3.7](https://github.com/Symbux/Turbo/compare/v0.3.6...v0.3.7) - 2022-02-02

### Commits

- Updated prisma ORM [`d018acf`](https://github.com/Symbux/Turbo/commit/d018acf440651e6fc2f9b9041a8f64970cf14775)
- Updated in array to allow for array of params. [`e9b3f16`](https://github.com/Symbux/Turbo/commit/e9b3f16a7fea2f9d1fd14d1db356fbbebf9ab86e)
- Updated changelog. [`75b2dbe`](https://github.com/Symbux/Turbo/commit/75b2dbe982d00e4f6cbd6046c3eaf20570f647c0)
- Updated package version. [`d1ad9e1`](https://github.com/Symbux/Turbo/commit/d1ad9e181eb348c79e4876a55f0119b0640d6dfa)

## [v0.3.6](https://github.com/Symbux/Turbo/compare/v0.3.5...v0.3.6) - 2022-02-01

### Commits

- Fixed the runner's time telling, was using seconds not milliseconds. [`e7b1905`](https://github.com/Symbux/Turbo/commit/e7b190520e97a6958158534ba608943d837b5a08)
- Updated changelog. [`65a8c5b`](https://github.com/Symbux/Turbo/commit/65a8c5b2b49a994885fc37955e96f72a9857980e)

## [v0.3.5](https://github.com/Symbux/Turbo/compare/v0.3.4...v0.3.5) - 2022-01-28

### Commits

- Updated yarn packages. [`861a4a6`](https://github.com/Symbux/Turbo/commit/861a4a62b748f730f9a7a7621ee6f4b170e0b281)
- Updated changelog. [`46f00b5`](https://github.com/Symbux/Turbo/commit/46f00b543dac58eb69287b108a9b514cefd00352)

## [v0.3.4](https://github.com/Symbux/Turbo/compare/v0.3.3...v0.3.4) - 2022-01-28

### Commits

- Added new quit mode to support quitting gracefully, alongside that adding a new ENV: DISABLE_READLINE to disable this functionality. [`dd5c4de`](https://github.com/Symbux/Turbo/commit/dd5c4de06e1effd3caa10170f2dc55dda6337ef7)
- Updated changelog. [`e4853ff`](https://github.com/Symbux/Turbo/commit/e4853ffd17859849606e620a7dc02896f32ba11e)
- Updated package versions. [`e7dc821`](https://github.com/Symbux/Turbo/commit/e7dc8217a1a344a4c21b69dea25e4386921105fe)

## [v0.3.3](https://github.com/Symbux/Turbo/compare/v0.3.2...v0.3.3) - 2022-01-26

### Commits

- Updated yarn lock file. [`17d1103`](https://github.com/Symbux/Turbo/commit/17d11030d13661a610de351fefb27d8dfd61174a)
- Updated changelog. [`d70ed84`](https://github.com/Symbux/Turbo/commit/d70ed849ebdb1b5267059ae2961897411cdb342c)

## [v0.3.2](https://github.com/Symbux/Turbo/compare/v0.3.1...v0.3.2) - 2022-01-26

### Commits

- Updated yarn lock file. [`709c67a`](https://github.com/Symbux/Turbo/commit/709c67a9b2fe29e19e2ac6cd7bba49e315dd2161)
- Updated changelog. [`4efb0e7`](https://github.com/Symbux/Turbo/commit/4efb0e72eb555ade769bf900bc07684bc71a407e)

## [v0.3.1](https://github.com/Symbux/Turbo/compare/v0.3.0...v0.3.1) - 2022-01-26

### Commits

- Updated yarn lock file. [`4229424`](https://github.com/Symbux/Turbo/commit/42294243b85a34147366a9404a765524a86ce279)
- Updated changelog. [`4500a90`](https://github.com/Symbux/Turbo/commit/4500a907550fadf5a2f2fe26d442f79a999a0d30)

## [v0.3.0](https://github.com/Symbux/Turbo/compare/v0.2.22...v0.3.0) - 2022-01-26

### Commits

- Reverted all changes. [`21223a8`](https://github.com/Symbux/Turbo/commit/21223a8512df13c05745d1704ef1c4e7668003d1)

## [v0.2.22](https://github.com/Symbux/Turbo/compare/v0.2.21...v0.2.22) - 2022-01-26

### Commits

- Updated DI package. [`dfb52bb`](https://github.com/Symbux/Turbo/commit/dfb52bb5e2bf4f4de4e7233b700ae41c1a0e70a2)
- Updated changelog. [`3c6c000`](https://github.com/Symbux/Turbo/commit/3c6c00052405c4c85a77b0bbbaeca79af8af2d9b)

## [v0.2.21](https://github.com/Symbux/Turbo/compare/v0.2.20...v0.2.21) - 2022-01-26

### Commits

- Bumped broken package. [`91c44dc`](https://github.com/Symbux/Turbo/commit/91c44dcfa55f8405e6b658ad1ac245e0e4a52840)
- Updated changelog. [`472cf8b`](https://github.com/Symbux/Turbo/commit/472cf8bcb9ae0c018e864a5a226b6cd13bf635bc)

## [v0.2.20](https://github.com/Symbux/Turbo/compare/v0.2.19...v0.2.20) - 2022-01-26

### Commits

- Updated changelog. [`c4d9b88`](https://github.com/Symbux/Turbo/commit/c4d9b882fed5baa42cf9b132ecf7e81c46cc0af8)
- Updated injector package. [`0a45fd2`](https://github.com/Symbux/Turbo/commit/0a45fd248657a6bddf7bca52605776ab9ece1f63)

## [v0.2.19](https://github.com/Symbux/Turbo/compare/v0.2.18...v0.2.19) - 2022-01-26

### Commits

- Updated all package versions. [`0052f88`](https://github.com/Symbux/Turbo/commit/0052f8841ee9d4afd124e3b91893a930ee420325)
- Updated changelog. [`987508b`](https://github.com/Symbux/Turbo/commit/987508b2ab81f0094355f8b5b5541e99112662b8)
- Fixed broken inject from demo. [`014c0b9`](https://github.com/Symbux/Turbo/commit/014c0b9ccfa494a9d3654f25be86494a0b29f1d6)

## [v0.2.18](https://github.com/Symbux/Turbo/compare/v0.2.11...v0.2.18) - 2022-01-26

### Commits

- Reverted changelog. [`660467e`](https://github.com/Symbux/Turbo/commit/660467e04f7b533c701ee1d0ee1f7bb77d8998d5)
- Update README.md [`83c3503`](https://github.com/Symbux/Turbo/commit/83c35039936e88d748b314706db9b71013f9b7ad)
- Updated changelog. [`f7eb332`](https://github.com/Symbux/Turbo/commit/f7eb3327800f1a4577a0cf4963fb3e107ae66479)
- Reverted 5 broken commits entirely back to the last working state. [`3eed62c`](https://github.com/Symbux/Turbo/commit/3eed62ce38ec3e75c4200582e1b7363dec2a2e1b)

## [v0.2.11](https://github.com/Symbux/Turbo/compare/v0.2.10...v0.2.11) - 2021-12-23

### Commits

- Updated packages. [`d3a3be0`](https://github.com/Symbux/Turbo/commit/d3a3be0ce54830aa7e23641eceda86eacd7cf108)
- Changed all the injection names to 'turbo.*' for internal and 'tp.*' for plugins. [`6591a47`](https://github.com/Symbux/Turbo/commit/6591a47c55c93acb064de2c127eb0864907640a2)
- Changelog [`b422fd3`](https://github.com/Symbux/Turbo/commit/b422fd37dfd62bfeb0112940f07b2680a5ed97dd)
- Added fix to allow http controller method calls to not return a class with an execute function, this allows for things like redirecting. [`136e968`](https://github.com/Symbux/Turbo/commit/136e9687d1de7abcdba9dc9f822c102e88548872)

## [v0.2.10](https://github.com/Symbux/Turbo/compare/v0.2.9...v0.2.10) - 2021-12-13

### Commits

- Made sure to export everything from the framework. [`1f07076`](https://github.com/Symbux/Turbo/commit/1f07076f737d5cfe9c5b6daab29e8f62eaa12d3c)
- Updated the changelog. [`216d4ac`](https://github.com/Symbux/Turbo/commit/216d4ac07079c9501e6a97c3b73be72dfc924e85)
- Updated the version. [`6d87336`](https://github.com/Symbux/Turbo/commit/6d87336650e47cc11ac7ee0f3efaa81dcc3d402a)
- Update README.md [`cb30b26`](https://github.com/Symbux/Turbo/commit/cb30b2680a9b2fa78f9a4aad3fa869384f139c3a)
- Update README.md [`4e379cf`](https://github.com/Symbux/Turbo/commit/4e379cfe235f461c1decac5f919eb3ba2e0c6697)
- Update README.md [`4273e43`](https://github.com/Symbux/Turbo/commit/4273e434f1b212df169eb443a4d9e95ce59d1b82)
- Update README.md [`4d6b4ea`](https://github.com/Symbux/Turbo/commit/4d6b4ea3105ad2f31316893197a952d89002ec6e)

## [v0.2.9](https://github.com/Symbux/Turbo/compare/v0.2.8...v0.2.9) - 2021-12-07

### Commits

- Updated changelog. [`785b78c`](https://github.com/Symbux/Turbo/commit/785b78c9fc8b1bdedf15cbe815ff8aeed747c6c6)
- Added update to attempt to support injecting the prisma client. [`178e08b`](https://github.com/Symbux/Turbo/commit/178e08be4c3646dfd93f929efe03403ea4c08e6c)

## [v0.2.8](https://github.com/Symbux/Turbo/compare/v0.2.7...v0.2.8) - 2021-12-07

### Fixed

- Added fix, and fixes #13 [`#13`](https://github.com/Symbux/Turbo/issues/13)

### Commits

- Added translation module with support for .json files as translation lookups, alongside adding the translator added as a built-in controller module, and added a shortcut as this._t(phrase, lang). [`ada8fe2`](https://github.com/Symbux/Turbo/commit/ada8fe24b7981baa915590857ecaba7ad1a16723)
- Added support for prisma. [`8545e2f`](https://github.com/Symbux/Turbo/commit/8545e2fff957491a203bc94f4ef8ff253b1bf5ab)
- Added translation module, alongside auto translation service for the HTTP and WS plugin's where by defining certain data they can auto translate messages, fixes: #13 [`1df1332`](https://github.com/Symbux/Turbo/commit/1df13328f35866b8654c417d7b90c3beceede741)
- Fixed support for global, and service defined middlewares. [`a424367`](https://github.com/Symbux/Turbo/commit/a42436748e91e04c9c01d8a4fae977776ba87441)
- Changed the settings for the translator so you only need 'translations' which is the replacement for translations.folder instead, as there is no need for a default due to the HTTP/WS services getting it from the Accept-Language header. [`b07ae8b`](https://github.com/Symbux/Turbo/commit/b07ae8b60e9b40f0460e07d318e92feee78a5128)
- Updated changelog. [`4cf5b05`](https://github.com/Symbux/Turbo/commit/4cf5b057f9c909308490d1e9a71fef7354805198)
- Increased version number. [`eb817ee`](https://github.com/Symbux/Turbo/commit/eb817ee82688ee547bdd08b41b78a925a1787fe4)
- Removed database option. [`a799dfa`](https://github.com/Symbux/Turbo/commit/a799dfa1bcea8b3bdb05b26bc84d5204d4549260)
- Fixed merge [`56a7b0d`](https://github.com/Symbux/Turbo/commit/56a7b0d502ed96b413df02a415b07d5e8ee3815c)
- Update index.ts [`6a68a40`](https://github.com/Symbux/Turbo/commit/6a68a409f55e8e2fcf536db3cefecb98002cb3f7)
- Removed annoying log item that spams the logs, not required unless something actually happens while the fibre manager is doing something. [`9365820`](https://github.com/Symbux/Turbo/commit/936582081a81702b77eac3fb21cda00655dbff28)

## [v0.2.7](https://github.com/Symbux/Turbo/compare/v0.2.6...v0.2.7) - 2021-11-24

### Fixed

- Fixed an issue where the glob pattern in production mode was not finding .js files, related to bad pattern, fixes #18 [`#18`](https://github.com/Symbux/Turbo/issues/18)

### Commits

- Updated changelog. [`44493a6`](https://github.com/Symbux/Turbo/commit/44493a6bda6b2951f243ce9574f7364074408846)

## [v0.2.6](https://github.com/Symbux/Turbo/compare/v0.2.5...v0.2.6) - 2021-11-24

### Fixed

- Added a fix to only check for .js files in production mode, fixes #17 [`#17`](https://github.com/Symbux/Turbo/issues/17)

### Commits

- Recompiled changelog. [`c7286d6`](https://github.com/Symbux/Turbo/commit/c7286d64097286b5331e836dc2fe80d189cc88ba)

## [v0.2.5](https://github.com/Symbux/Turbo/compare/v0.2.4...v0.2.5) - 2021-11-24

### Fixed

- Added a fix to support a problem where the engine.mode was based on it's own compiled vs source files instead, when being used as a library then the package will be in development, but for users of the library the package is compiled and therefore assumes production, changed to base it on environment variable 'ENV', fixes #17 [`#17`](https://github.com/Symbux/Turbo/issues/17)

### Commits

- Committed updated changelog. [`1ba838e`](https://github.com/Symbux/Turbo/commit/1ba838e56e508d36f33e4173e6bda855db1f4b07)

## [v0.2.4](https://github.com/Symbux/Turbo/compare/v0.2.3...v0.2.4) - 2021-11-24

### Merged

- Create CODE_OF_CONDUCT.md [`#4`](https://github.com/Symbux/Turbo/pull/4)

### Fixed

- Changed the basepath definition to support a source and compiled property as compiled apps use a different path like ./dist or ./src, fixes #17 [`#17`](https://github.com/Symbux/Turbo/issues/17)
- Completed new autowire scanFoldersOnly, fixes #6 [`#6`](https://github.com/Symbux/Turbo/issues/6)
- Added a fix to prevent non-turbo related modules being initialised and then throwing an error, fixes #5 [`#5`](https://github.com/Symbux/Turbo/issues/5)

### Commits

- Added dynamic changelog. [`9663f46`](https://github.com/Symbux/Turbo/commit/9663f466b3ef2e98f474ae3815ddc8f4dc7d4fd3)
- Create codeql-analysis.yml [`30220ff`](https://github.com/Symbux/Turbo/commit/30220ff0e68d6dac5ccb6702c1085355a671c631)
- Update issue templates [`730be78`](https://github.com/Symbux/Turbo/commit/730be782f9891efd8f179d39033194bece5f5c8f)
- Create CONTRIBUTING.md [`7a2a025`](https://github.com/Symbux/Turbo/commit/7a2a025011fc8942f2ffa4081707184b0b80288d)
- Create SECURITY.md [`ea3173a`](https://github.com/Symbux/Turbo/commit/ea3173a10f0448c4db295c33ecad4778d802e352)
- Added new feature to allow the whole source folder (or basepath) to be scanned, feature #6 [`15495aa`](https://github.com/Symbux/Turbo/commit/15495aa7bb330783acb29b39425701b1e021ba6f)
- Increment version. [`6d9b9a6`](https://github.com/Symbux/Turbo/commit/6d9b9a6383189cb887af13934b6704656594c0eb)

## [v0.2.3](https://github.com/Symbux/Turbo/compare/v0.2.2...v0.2.3) - 2021-11-03

### Commits

- Updated the new patch version. [`d247b7a`](https://github.com/Symbux/Turbo/commit/d247b7a298908bc0aed7342a3268b35e1cf78648)

## [v0.2.2](https://github.com/Symbux/Turbo/compare/v0.2.1...v0.2.2) - 2021-11-03

### Commits

- Added a fix to the logger system, and added a new options items to define the log levels. [`9334e32`](https://github.com/Symbux/Turbo/commit/9334e32be781a34cc09b6b03c181484e8e640284)

## [v0.2.1](https://github.com/Symbux/Turbo/compare/v0.2.0...v0.2.1) - 2021-11-03

### Commits

- Removed debug code, and fixed an issue where, when using static it would overwrite existing routes from controllers, and fixed another bug where providers were being initialised twice. [`6a8aa3e`](https://github.com/Symbux/Turbo/commit/6a8aa3e27a594be724653a3cfc5cb5328af4993a)

## [v0.2.0](https://github.com/Symbux/Turbo/compare/v0.1.1...v0.2.0) - 2021-11-03

### Commits

- Pulled in fix from @symbux/injector [`e292b1f`](https://github.com/Symbux/Turbo/commit/e292b1f382c32dffc4952629b16656a0b66ac2de)
- Removed the old docs files from the repo. [`6375fcb`](https://github.com/Symbux/Turbo/commit/6375fcbaac1096d23d82051e25edb677a45e09fd)
- Added support for static file registration, support for trust proxy, helmet and additional security updates. [`566dd1d`](https://github.com/Symbux/Turbo/commit/566dd1d0e8da25378c962658de0f6bf08057ce1d)
- Fixed readme issues. [`23df5c1`](https://github.com/Symbux/Turbo/commit/23df5c1951ba0e42fce560cbe40c191a2a8f6aa6)
- Bumped version. [`cef0ea5`](https://github.com/Symbux/Turbo/commit/cef0ea562a08ca9368eea43c8c5943dbb69f23a8)
- Bumped version. [`ba7f0d4`](https://github.com/Symbux/Turbo/commit/ba7f0d4d2b2b4fa4b53c4393a08624554c17f8f9)
- Fixed readme issues. [`8ea442c`](https://github.com/Symbux/Turbo/commit/8ea442ce42de1bbd8f471a77e136d4b23ba1e2d0)
- Bumped package version. [`797ee4a`](https://github.com/Symbux/Turbo/commit/797ee4a5869a1b2f12ca08d7b8a3ba5bcc87b32c)
- Removed unused import in demo [`1a07787`](https://github.com/Symbux/Turbo/commit/1a07787aaaf9c07fb69c7f90abac2998de0a34d1)

## [v0.1.1](https://github.com/Symbux/Turbo/compare/v0.1.0...v0.1.1) - 2021-11-02

### Commits

- Bumped package version. [`01ab3bb`](https://github.com/Symbux/Turbo/commit/01ab3bbc16a7b12a9fc9830ae15912e696b9e4de)

## v0.1.0 - 2021-11-02

### Commits

- Initial [`7f08214`](https://github.com/Symbux/Turbo/commit/7f082144c3b19115645d00b0362e2bbac956c426)
- Finished the alpha version of the http plugin, and lots of fixes alongside support for the task runner. [`e5cd90e`](https://github.com/Symbux/Turbo/commit/e5cd90ebac9bfcf5d4a473ab6e040babd0ecd093)
- Added full comments, and TSDoc definitions. [`c6c5fd5`](https://github.com/Symbux/Turbo/commit/c6c5fd56640d0bdeae1304915bbe2652d586b4ae)
- Added websocket service. [`f14ac71`](https://github.com/Symbux/Turbo/commit/f14ac718883241833aec7887f0d2830fcf95ea76)
- Updated all dependencies. [`521e5b9`](https://github.com/Symbux/Turbo/commit/521e5b9d0c34541b5b8becd2abdc1617d361c93e)
- Added the start of the actions module, and adding additional functionality for session management and subscriptions within WebSockets. [`7d3918d`](https://github.com/Symbux/Turbo/commit/7d3918d5937b273aa0f5bdd2d45ee9f161cafd37)
- Removed the old actions idea code, and started implementation of fibres functionality, this is nearly finished, just need to link up to the FibresManager instead. [`d4b411c`](https://github.com/Symbux/Turbo/commit/d4b411cfe201756de96295d9789ce5aec1f06f94)
- Started working on WebSocket service support. [`5ef2b0f`](https://github.com/Symbux/Turbo/commit/5ef2b0fda221865da456350790a5e361779a77f7)
- Updated the fibre manager to be in charge of running and managing fibres with various utility commands, and logging. [`0360b04`](https://github.com/Symbux/Turbo/commit/0360b04bcc97aba697d23b7e59ee7efb10f0766c)
- Reinstalled deps [`04a55f9`](https://github.com/Symbux/Turbo/commit/04a55f97e06721ebf28fe63b04299963d4a3563b)
- Implemented middleware and the authentication checks. [`303a6ff`](https://github.com/Symbux/Turbo/commit/303a6ff3713b8231fa9ed8a43c05dedab0ec89bd)
- Started adding documentation for the core features of the framework. [`486f12f`](https://github.com/Symbux/Turbo/commit/486f12fdea10255b62a1e9ecfe8a13ab153c3eb2)
- Added apache 2.0 license. [`127e467`](https://github.com/Symbux/Turbo/commit/127e4676034f792f10ce4950d4b397943dc06d1e)
- Cleaning up lots of interfaces making sure they are easier to find and a bit more functional. [`649c5bf`](https://github.com/Symbux/Turbo/commit/649c5bf36a94d9979a47354843ef8a4beb098c09)
- Allowed middleware to respond with a do not continue. [`c03e8ab`](https://github.com/Symbux/Turbo/commit/c03e8ab1f17b303ec2d398b8461c35e6fdbf6509)
- Various updates including changing the format of the Authentication module. [`f3793fb`](https://github.com/Symbux/Turbo/commit/f3793fbce0045294fec5514e2fb5952fa321a2cb)
- Removing old code. [`b34a53e`](https://github.com/Symbux/Turbo/commit/b34a53ee59849da6d34cc43b7226ab6b21389487)
- Cleanup and small changes to make sure everything works as expected. [`2d8bddb`](https://github.com/Symbux/Turbo/commit/2d8bddb777f8dcf03a3b1c8c4691b5858cb90f13)
- Added fixes to the services to make sure they implement the IService interface, and made sure the middleware demo implements the Http.IMiddleware item, alongside that, I removed the old action code from the registry. [`8eef0a0`](https://github.com/Symbux/Turbo/commit/8eef0a04ed97e8f7f49d2bed570ad0e3f040aaad)
- Fixed the typings for the WsPlugin for the connections list, alongside changes to the abstract controller/service to auto inject the required base libs (like logger). [`afdca4e`](https://github.com/Symbux/Turbo/commit/afdca4ef22e528e82ad907f21ed76a76738bb262)
- Made some changes to work with the tasks, allowing them to call on the WebSocket service to broadcast stuff, alongside fixing the demo to work. [`909c037`](https://github.com/Symbux/Turbo/commit/909c037ab47f179b8b86bd1621cf06ac294d809c)
- Make sure everything is exported correctly and updated/cleaned up the readme.md [`69b0da1`](https://github.com/Symbux/Turbo/commit/69b0da16131f6d93e5482fb620913b4fdc2d8f4e)
- Removed 'pool' mode as it's not feasible in this context, I shall look at a custom pool setup. [`d8c1548`](https://github.com/Symbux/Turbo/commit/d8c1548c7bc3a3c6e9c99d4a415e3d5d6f583a26)
- Made sure all services follow the same structure. [`1f88853`](https://github.com/Symbux/Turbo/commit/1f8885322d17a99fc2be5a7df59a6af73b995576)
- Added support for shutdown of fibres, services and components. [`90aa511`](https://github.com/Symbux/Turbo/commit/90aa511d591e6f002d07c285fbc12426794e3f8e)
- Added docker configuration example for building the app, the defined is a simple setup to build the project. [`90f5060`](https://github.com/Symbux/Turbo/commit/90f5060a05ea261b9a85e5842ae51cb317e20f70)
- Added the http cors middleware to the registration and edited a bit, including a way of injecting functions. [`1c713a3`](https://github.com/Symbux/Turbo/commit/1c713a3dda03d4b2b20a115623a8c055437d6df0)
- Added fixes. [`10a2c04`](https://github.com/Symbux/Turbo/commit/10a2c047fbbfb572ceffb4f36e75b9d27c0bba1c)
- Various cleanup, logo colour change. [`a794d99`](https://github.com/Symbux/Turbo/commit/a794d99a67be123393c26f2cf94fee2f7ab0586d)
- Finished the new options decorator, and made sure it's configured with autowire. [`72b6f53`](https://github.com/Symbux/Turbo/commit/72b6f53d00ea2a2414c9cc17a30f8d9ae1c31c6b)
- Added some partial fixes. [`7d07222`](https://github.com/Symbux/Turbo/commit/7d07222bfaa61815a952207ef1395f6c6fc337b5)
- Added fixes and removed the packageJson requirement. [`138b537`](https://github.com/Symbux/Turbo/commit/138b537ee065bdc55cfacc2a80c43a883decef0c)
- Added editor config, alongside logo. [`4c4f3d6`](https://github.com/Symbux/Turbo/commit/4c4f3d6873e0a4dbb08a02a4d1c0d67e53d3e96a)
- Started working on new options decorator. [`2e0a63b`](https://github.com/Symbux/Turbo/commit/2e0a63b882bbfea73cd1bd4bf4293bd4a26ab29a)
- Readme update. [`0db1b1a`](https://github.com/Symbux/Turbo/commit/0db1b1abf1599a69817b0e9d4dfc0642f2ee2a9f)
- Added change to fix services which are not returning 401's when an auth check fails. [`523c14a`](https://github.com/Symbux/Turbo/commit/523c14a77194574162aabadf70f9b2f2ce24a975)
- Working on dockerfile, added reference to keep testing. [`aadf53b`](https://github.com/Symbux/Turbo/commit/aadf53b8c8c53ebecb9a03d77c1be31771dbe09b)
- Update README.md [`99ea1b5`](https://github.com/Symbux/Turbo/commit/99ea1b5186c7c772c3c4c0c51d8bb5da1242fe8c)
- Added discord link [`66611db`](https://github.com/Symbux/Turbo/commit/66611db8ef0aebe91477dd9ba0bd82a0485ab490)
- Removed thread pool references. [`9c5a11d`](https://github.com/Symbux/Turbo/commit/9c5a11dcd0eb09c6f00fdae6354cc92134d70e90)
- Added support for the @Options decorator when registering a module, either via engine.register or engine.registerSingle. [`d797d3f`](https://github.com/Symbux/Turbo/commit/d797d3f190c9acc39c5063ac42a926dd095cae7f)
- Started working on some docker tests, to check integration. [`b901771`](https://github.com/Symbux/Turbo/commit/b9017716de1218ec4f7942392b5c1e68db7b9c4f)
- Removed old option for actions (now fibres). [`abd02bd`](https://github.com/Symbux/Turbo/commit/abd02bd45aba61e29b93751d9d6a6e71720cb6cd)
- Readme update. [`242494f`](https://github.com/Symbux/Turbo/commit/242494f7ed11cf02eebaa122e893f53d70ea99b8)
- Readme update. [`1efefaf`](https://github.com/Symbux/Turbo/commit/1efefaf538bc0bd7e630d0ef5767ba33ca428a53)
- Readme update. [`ffb4349`](https://github.com/Symbux/Turbo/commit/ffb4349b9a476e0dfdd8c223cec71368eac4e2d7)
- Update README.md [`a8cdee3`](https://github.com/Symbux/Turbo/commit/a8cdee3f161e4c2b7d99eea364ac38305054eb35)
- Wording change. [`52066ba`](https://github.com/Symbux/Turbo/commit/52066ba3e516bf206f0d4c78d641248b9c9bcefb)
