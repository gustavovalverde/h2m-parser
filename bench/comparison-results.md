# h2m-parser Benchmark Results

Generated: 2025-09-27T22:54:33.734Z

## Test Configuration

- Iterations: 100
- Dataset: /Users/gustavovalverde/dev/personal/hgtm/tests/fixtures
- Readability tested: Yes

## Results by File

### tiny

- Size: 18 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.012 | 0.018 | 0.020 |
| h2m-parser with readability | 0.194 | 0.253 | 0.254 |
| turndown | 0.020 | 0.029 | 0.030 |
| node html markdown | 0.009 | 0.012 | 0.014 |

### small

- Size: 84 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.013 | 0.019 | 0.020 |
| h2m-parser with readability | 0.170 | 0.238 | 0.264 |
| turndown | 0.036 | 0.046 | 0.048 |
| node html markdown | 0.020 | 0.026 | 0.028 |

### medium

- Size: 369 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.015 | 0.017 | 0.019 |
| h2m-parser with readability | 0.228 | 0.278 | 0.283 |
| turndown | 0.046 | 0.056 | 0.057 |
| node html markdown | 0.017 | 0.018 | 0.019 |

### file_1

- Size: 89721 bytes
- File: 039c4b966d1f2a0c589ac0aad211fe65500ad...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.457 | 1.618 | 1.691 |
| h2m-parser with readability | 6.470 | 9.788 | 12.848 |
| turndown | 5.879 | 7.599 | 7.732 |
| node html markdown | 3.029 | 3.382 | 3.462 |

### file_2

- Size: 70337 bytes
- File: 06ed0a833361190536a4f61888354e07dccaa...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.241 | 1.401 | 1.436 |
| h2m-parser with readability | 5.050 | 5.353 | 5.433 |
| turndown | 4.245 | 4.748 | 5.737 |
| node html markdown | 2.055 | 2.309 | 2.336 |

### file_3

- Size: 160839 bytes
- File: 078cdb456d1beb698aeed86e0f2161e442e94...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 3.096 | 3.301 | 3.332 |
| h2m-parser with readability | 12.509 | 17.324 | 17.577 |
| turndown | 9.067 | 11.245 | 11.363 |
| node html markdown | 4.077 | 4.269 | 4.301 |

### file_4

- Size: 99724 bytes
- File: 0a8c510c3691d8e68ccc749559680257a382f...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.123 | 1.249 | 1.260 |
| h2m-parser with readability | 6.165 | 6.571 | 6.813 |
| turndown | 4.296 | 4.599 | 5.525 |
| node html markdown | 2.344 | 2.640 | 2.651 |

### file_5

- Size: 105057 bytes
- File: 0e55dcdbeb54c88ee87942b9fef7ea5398fa9...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.637 | 1.799 | 1.824 |
| h2m-parser with readability | 7.320 | 7.752 | 12.948 |
| turndown | 6.282 | 7.800 | 7.894 |
| node html markdown | 3.380 | 3.664 | 3.739 |

### file_6

- Size: 94725 bytes
- File: 17ca85324662023ba21666b3ca5d5d37a92b2...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.737 | 1.859 | 1.879 |
| h2m-parser with readability | 7.361 | 7.726 | 14.711 |
| turndown | 8.115 | 9.519 | 9.660 |
| node html markdown | 4.490 | 4.789 | 4.810 |

### file_7

- Size: 62759 bytes
- File: 19fe8f574b7420277862728929d83dd74d7aa...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.953 | 1.025 | 1.042 |
| h2m-parser with readability | 5.015 | 5.344 | 5.570 |
| turndown | 4.180 | 4.541 | 5.515 |
| node html markdown | 2.109 | 2.371 | 2.395 |

### file_8

- Size: 41355 bytes
- File: 1a2c2f9fe410c836bb94e85c85625dbe8174f...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.515 | 0.595 | 0.615 |
| h2m-parser with readability | 3.247 | 3.600 | 3.762 |
| turndown | 2.105 | 2.255 | 2.336 |
| node html markdown | 0.581 | 0.623 | 0.646 |

### file_9

- Size: 61437 bytes
- File: 1bbc7f62e80e44afd533e896c0168c3b18f1e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.903 | 0.965 | 1.005 |
| h2m-parser with readability | 4.744 | 4.967 | 5.270 |
| turndown | 3.257 | 3.546 | 3.678 |
| node html markdown | 1.891 | 2.108 | 2.180 |

### file_10

- Size: 177823 bytes
- File: 1d43b4816bdba5825165dc21558d9eafb9f65...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.978 | 3.140 | 3.189 |
| h2m-parser with readability | 6.577 | 6.868 | 7.876 |
| turndown | 7.522 | 10.135 | 10.157 |
| node html markdown | 2.692 | 2.941 | 3.009 |

### file_11

- Size: 139469 bytes
- File: 1de0efed4d661163ff8414e8ca69f45a49efd...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.540 | 2.710 | 2.760 |
| h2m-parser with readability | 21.194 | 27.397 | 27.523 |
| turndown | 9.197 | 10.895 | 11.003 |
| node html markdown | 6.362 | 6.657 | 6.700 |

### file_12

- Size: 48447 bytes
- File: 1e62a223bca12adda6410b1789072a2ad7555...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.746 | 0.828 | 0.849 |
| h2m-parser with readability | 3.131 | 3.392 | 3.480 |
| turndown | 2.473 | 2.733 | 2.773 |
| node html markdown | 1.033 | 1.138 | 1.336 |

### file_13

- Size: 94912 bytes
- File: 20f1955819dc2b50d2d10788f73adc72bceb4...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.457 | 1.556 | 1.579 |
| h2m-parser with readability | 5.176 | 5.596 | 5.813 |
| turndown | 4.816 | 5.928 | 5.988 |
| node html markdown | 3.357 | 3.616 | 3.626 |

### file_14

- Size: 67227 bytes
- File: 22c0f41ae560968de5e6b0ef9ecffffeae3f4...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.790 | 0.868 | 0.881 |
| h2m-parser with readability | 4.263 | 4.542 | 4.660 |
| turndown | 3.466 | 3.702 | 4.313 |
| node html markdown | 2.225 | 2.503 | 2.545 |

### file_15

- Size: 69850 bytes
- File: 22c3886e7116464c04c2332c20a013a583799...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.117 | 1.228 | 1.249 |
| h2m-parser with readability | 4.497 | 4.917 | 5.022 |
| turndown | 3.825 | 4.219 | 5.119 |
| node html markdown | 2.303 | 2.644 | 2.655 |

### file_16

- Size: 95103 bytes
- File: 22c4be85802e9602a344fc2cc704093362b91...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.444 | 1.891 | 2.192 |
| h2m-parser with readability | 6.517 | 6.950 | 9.953 |
| turndown | 6.101 | 7.467 | 7.519 |
| node html markdown | 3.094 | 3.415 | 3.451 |

### file_17

- Size: 91296 bytes
- File: 26c3b98f33bb6902f32535235fd7d32792df8...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.320 | 1.445 | 1.457 |
| h2m-parser with readability | 6.304 | 6.740 | 7.090 |
| turndown | 5.324 | 5.879 | 6.883 |
| node html markdown | 2.895 | 3.182 | 3.209 |

### file_18

- Size: 74095 bytes
- File: 2dbf7cd4444617cc60f0e2d2c95b20a535979...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.254 | 1.335 | 1.348 |
| h2m-parser with readability | 4.072 | 4.441 | 4.675 |
| turndown | 3.669 | 4.060 | 4.882 |
| node html markdown | 1.967 | 2.265 | 2.290 |

### file_19

- Size: 141461 bytes
- File: 2fd71e2969106342bab6862bb212ae16ba592...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.139 | 2.259 | 2.282 |
| h2m-parser with readability | 10.874 | 17.713 | 18.424 |
| turndown | 7.945 | 9.614 | 9.791 |
| node html markdown | 6.468 | 6.918 | 6.956 |

### file_20

- Size: 78203 bytes
- File: 35f536ef8c8eba0616f2dc78e6653e1d7d68e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.308 | 1.418 | 1.420 |
| h2m-parser with readability | 7.850 | 8.276 | 14.306 |
| turndown | 5.311 | 6.663 | 6.734 |
| node html markdown | 4.691 | 4.872 | 4.914 |

### file_21

- Size: 78530 bytes
- File: 3b27831099c75b36d5978864ec89575c675c9...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.143 | 1.222 | 1.235 |
| h2m-parser with readability | 5.571 | 5.915 | 6.054 |
| turndown | 5.292 | 6.923 | 7.025 |
| node html markdown | 3.692 | 3.932 | 3.976 |

### file_22

- Size: 50858 bytes
- File: 3f6413c32bffc73b64cb1a2adb237cd19ffc7...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.732 | 0.812 | 0.818 |
| h2m-parser with readability | 4.141 | 4.429 | 4.549 |
| turndown | 3.456 | 3.891 | 4.290 |
| node html markdown | 1.577 | 1.902 | 1.946 |

### file_23

- Size: 160633 bytes
- File: 40d4e50472a8f0d30d68613051be510ed0980...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.460 | 3.802 | 4.117 |
| h2m-parser with readability | 9.711 | 13.182 | 15.722 |
| turndown | 6.910 | 9.129 | 9.242 |
| node html markdown | 3.878 | 4.793 | 4.954 |

### file_24

- Size: 184834 bytes
- File: 42b43887c6dd91353249924745e030eac3a6d...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.286 | 2.426 | 2.465 |
| h2m-parser with readability | 8.459 | 8.725 | 16.406 |
| turndown | 7.092 | 8.430 | 8.525 |
| node html markdown | 6.017 | 6.417 | 6.437 |

### file_25

- Size: 98648 bytes
- File: 44b21071ae6feede3c36d2ab032cd422eb0c6...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.084 | 1.184 | 1.199 |
| h2m-parser with readability | 6.899 | 7.130 | 11.027 |
| turndown | 4.865 | 5.237 | 6.469 |
| node html markdown | 2.438 | 2.740 | 2.777 |

### file_26

- Size: 85583 bytes
- File: 44f750fab67bb9f54f5b5cc90bc34d55cff06...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.348 | 1.437 | 1.467 |
| h2m-parser with readability | 6.110 | 6.522 | 6.711 |
| turndown | 5.507 | 6.969 | 7.054 |
| node html markdown | 5.892 | 6.086 | 6.116 |

### file_27

- Size: 65639 bytes
- File: 45b6063ac2016db7b2fb1f995f0b54ee054fb...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.170 | 1.267 | 1.288 |
| h2m-parser with readability | 4.917 | 5.242 | 5.487 |
| turndown | 4.300 | 4.550 | 6.000 |
| node html markdown | 4.509 | 4.838 | 4.897 |

### file_28

- Size: 53725 bytes
- File: 45efaba666da241d9d069b550890530b65f2a...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.760 | 0.843 | 0.867 |
| h2m-parser with readability | 3.699 | 3.971 | 4.027 |
| turndown | 3.076 | 3.347 | 3.447 |
| node html markdown | 1.568 | 1.822 | 1.864 |

### file_29

- Size: 88224 bytes
- File: 46ab324348ca339dba58238e193f794c3309e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.394 | 1.491 | 1.527 |
| h2m-parser with readability | 11.337 | 15.529 | 15.770 |
| turndown | 4.751 | 5.812 | 6.030 |
| node html markdown | 2.926 | 3.227 | 3.266 |

### file_30

- Size: 52935 bytes
- File: 46ed10778ec7c1292e624e1a72a2a0899f8ab...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.828 | 0.910 | 0.929 |
| h2m-parser with readability | 3.582 | 3.836 | 3.893 |
| turndown | 2.825 | 3.042 | 3.105 |
| node html markdown | 2.025 | 2.290 | 2.341 |

### file_31

- Size: 166944 bytes
- File: 4b8debc51d3d9598ad4552cc7a591d200a6c7...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.313 | 2.413 | 2.456 |
| h2m-parser with readability | 8.724 | 12.443 | 15.522 |
| turndown | 7.107 | 9.383 | 9.440 |
| node html markdown | 3.351 | 3.649 | 3.659 |

### file_32

- Size: 97808 bytes
- File: 4bf8e536214f987f4a0bf6ca7d233619d30bd...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.426 | 1.515 | 1.539 |
| h2m-parser with readability | 6.987 | 7.437 | 10.826 |
| turndown | 6.287 | 7.579 | 7.740 |
| node html markdown | 3.378 | 3.640 | 3.700 |

### file_33

- Size: 90241 bytes
- File: 4e0e399d24fe145def4817facccb0ff79e305...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.320 | 1.448 | 1.467 |
| h2m-parser with readability | 6.029 | 6.450 | 6.505 |
| turndown | 5.808 | 7.105 | 7.110 |
| node html markdown | 3.008 | 3.277 | 3.303 |

### file_34

- Size: 166420 bytes
- File: 4f454cb97e9b77d94c10ed8a6a35cd2eff167...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.969 | 2.070 | 2.104 |
| h2m-parser with readability | 7.760 | 8.105 | 14.165 |
| turndown | 6.677 | 8.084 | 8.244 |
| node html markdown | 5.747 | 6.140 | 6.184 |

### file_35

- Size: 68778 bytes
- File: 4f83531b9fc91fd1e0062e43200669cd82cc3...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.143 | 1.235 | 1.247 |
| h2m-parser with readability | 3.330 | 3.618 | 3.673 |
| turndown | 3.376 | 3.686 | 4.613 |
| node html markdown | 1.508 | 1.878 | 1.925 |

### file_36

- Size: 167544 bytes
- File: 4fe5472ba89db38e20daef6025108310c5212...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.858 | 3.007 | 3.115 |
| h2m-parser with readability | 16.082 | 22.394 | 22.522 |
| turndown | 10.245 | 11.977 | 12.061 |
| node html markdown | 9.403 | 9.677 | 9.702 |

### file_37

- Size: 84444 bytes
- File: 5a012f66c2bf0c70a0744c7483478aaa0c1a2...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.479 | 1.569 | 1.608 |
| h2m-parser with readability | 6.711 | 7.295 | 8.146 |
| turndown | 5.989 | 7.264 | 7.351 |
| node html markdown | 6.424 | 6.651 | 6.712 |

### file_38

- Size: 69828 bytes
- File: 5bc9df3a36efb57a22edf862cec6a28eb112e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.192 | 2.070 | 2.379 |
| h2m-parser with readability | 7.936 | 8.725 | 13.017 |
| turndown | 4.833 | 5.604 | 6.169 |
| node html markdown | 2.419 | 2.716 | 2.764 |

### file_39

- Size: 66504 bytes
- File: 5c83c2d71f97e2b5a979f197fbae6773dee68...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.138 | 1.263 | 1.286 |
| h2m-parser with readability | 5.078 | 5.431 | 5.592 |
| turndown | 4.308 | 5.630 | 5.755 |
| node html markdown | 2.904 | 3.173 | 3.209 |

### file_40

- Size: 76713 bytes
- File: 5de3db78f95172797a51b3b3b2cdc4caeb63a...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.115 | 1.225 | 1.264 |
| h2m-parser with readability | 9.284 | 13.618 | 13.946 |
| turndown | 3.929 | 4.346 | 5.217 |
| node html markdown | 1.998 | 2.265 | 2.286 |

### file_41

- Size: 157066 bytes
- File: 5f081a0a9d1a1ce3b0e53603ecd8bde789478...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.254 | 2.399 | 2.443 |
| h2m-parser with readability | 9.188 | 15.227 | 15.967 |
| turndown | 7.816 | 9.532 | 9.573 |
| node html markdown | 5.403 | 5.758 | 5.780 |

### file_42

- Size: 21734 bytes
- File: 5f8b89390d3fc01c6a80728ba2aee597fea1d...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.308 | 0.362 | 0.372 |
| h2m-parser with readability | 1.809 | 1.941 | 1.970 |
| turndown | 1.393 | 1.523 | 1.574 |
| node html markdown | 0.395 | 0.413 | 0.422 |

### file_43

- Size: 91883 bytes
- File: 5f8c9f60be2250f694094ee1ca5deb9df1047...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.374 | 1.501 | 1.540 |
| h2m-parser with readability | 7.309 | 9.897 | 11.456 |
| turndown | 5.540 | 7.063 | 7.308 |
| node html markdown | 3.842 | 4.066 | 4.107 |

### file_44

- Size: 124858 bytes
- File: 5fbfe3905c71925b1b3a875a3111073e5d099...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.573 | 1.686 | 1.709 |
| h2m-parser with readability | 6.613 | 7.065 | 12.175 |
| turndown | 5.085 | 6.358 | 6.567 |
| node html markdown | 4.182 | 4.387 | 4.406 |

### file_45

- Size: 185748 bytes
- File: 60b8aff17382f2fd02584645ef66e517b41f7...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.181 | 2.318 | 2.374 |
| h2m-parser with readability | 10.854 | 18.266 | 18.635 |
| turndown | 8.566 | 10.465 | 10.622 |
| node html markdown | 5.976 | 6.383 | 6.456 |

### file_46

- Size: 172926 bytes
- File: 60bccec4069d54a6889bfcda785c0f3066a70...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.879 | 3.110 | 3.158 |
| h2m-parser with readability | 19.317 | 39.392 | 44.294 |
| turndown | 14.148 | 15.268 | 15.436 |
| node html markdown | 7.607 | 8.062 | 8.121 |

### file_47

- Size: 42840 bytes
- File: 60cc80fb25f0b2ebdb2e6835ab7bfd3d26362...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.048 | 1.496 | 1.626 |
| h2m-parser with readability | 8.584 | 9.987 | 10.060 |
| turndown | 4.195 | 6.958 | 7.185 |
| node html markdown | 0.658 | 0.743 | 0.751 |

### file_48

- Size: 137969 bytes
- File: 61adb9c208d9c67253b4413ef7ec2d010edae...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.033 | 2.179 | 2.229 |
| h2m-parser with readability | 9.934 | 17.048 | 17.583 |
| turndown | 5.795 | 7.413 | 7.622 |
| node html markdown | 3.286 | 3.582 | 3.611 |

### file_49

- Size: 120011 bytes
- File: 61d8052b19ed9885651ed1110ddcccc001f9e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.436 | 1.520 | 1.541 |
| h2m-parser with readability | 7.224 | 7.816 | 11.204 |
| turndown | 4.707 | 5.911 | 6.154 |
| node html markdown | 3.842 | 4.041 | 4.075 |

### file_50

- Size: 66809 bytes
- File: 63c6d5256b8ce1098b5688eb5fafa747e9467...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.044 | 1.203 | 1.231 |
| h2m-parser with readability | 4.537 | 4.829 | 4.917 |
| turndown | 3.865 | 4.379 | 5.116 |
| node html markdown | 1.677 | 2.063 | 2.066 |

### file_51

- Size: 82725 bytes
- File: 64bf40da8348d808ef103cc5529fd268fec46...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.291 | 1.417 | 1.452 |
| h2m-parser with readability | 4.484 | 4.810 | 4.867 |
| turndown | 4.757 | 5.366 | 6.173 |
| node html markdown | 2.376 | 2.646 | 2.668 |

### file_52

- Size: 46587 bytes
- File: 6a59bd96489c98226c72f0245bac98a4b09aa...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.651 | 0.742 | 0.773 |
| h2m-parser with readability | 3.759 | 4.033 | 4.139 |
| turndown | 2.583 | 2.832 | 2.892 |
| node html markdown | 1.709 | 1.940 | 1.987 |

### file_53

- Size: 59176 bytes
- File: 6b095375a53dfc7994a032e2efac70f43a4fa...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.927 | 0.977 | 0.995 |
| h2m-parser with readability | 4.338 | 4.709 | 4.794 |
| turndown | 2.718 | 2.981 | 3.768 |
| node html markdown | 1.212 | 1.425 | 1.477 |

### file_54

- Size: 227057 bytes
- File: 6b817bedb8d6402bab160ed6d2b99256163bd...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.979 | 3.121 | 3.143 |
| h2m-parser with readability | 9.487 | 14.308 | 16.296 |
| turndown | 8.152 | 11.611 | 11.776 |
| node html markdown | 3.383 | 3.721 | 3.752 |

### file_55

- Size: 75425 bytes
- File: 6d30abed88489774017024b17cdb1928d9a2b...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.235 | 1.313 | 1.328 |
| h2m-parser with readability | 2.622 | 2.907 | 3.023 |
| turndown | 3.662 | 4.751 | 4.942 |
| node html markdown | 3.440 | 3.681 | 3.718 |

### file_56

- Size: 123582 bytes
- File: 71bf3c23c5d3fff9cec67606fde6547c8866a...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.739 | 1.837 | 1.858 |
| h2m-parser with readability | 8.657 | 12.015 | 14.500 |
| turndown | 6.498 | 7.867 | 7.955 |
| node html markdown | 5.320 | 5.729 | 5.748 |

### file_57

- Size: 90590 bytes
- File: 71cb773c42c94b75d41c059a27dd10b763443...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.317 | 1.454 | 1.478 |
| h2m-parser with readability | 5.694 | 6.083 | 6.346 |
| turndown | 4.064 | 5.140 | 5.256 |
| node html markdown | 2.150 | 2.462 | 2.482 |

### file_58

- Size: 139105 bytes
- File: 72e78dee157bdf3e8a9a9f07e54a98a3714ea...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.225 | 2.351 | 2.362 |
| h2m-parser with readability | 9.755 | 16.898 | 17.421 |
| turndown | 6.182 | 8.201 | 8.344 |
| node html markdown | 10.931 | 11.368 | 11.408 |

### file_59

- Size: 99162 bytes
- File: 72ecfb3f60f4e8a6103916f2041ce9a55c4ef...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.558 | 1.669 | 1.687 |
| h2m-parser with readability | 14.378 | 20.022 | 20.144 |
| turndown | 8.062 | 8.978 | 9.069 |
| node html markdown | 6.712 | 6.984 | 7.005 |

### file_60

- Size: 100264 bytes
- File: 73c175cdf9d5e065351ecf2220510088904ad...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.158 | 1.235 | 1.259 |
| h2m-parser with readability | 12.907 | 16.481 | 16.606 |
| turndown | 4.206 | 4.869 | 5.778 |
| node html markdown | 2.512 | 2.877 | 2.975 |

### file_61

- Size: 388826 bytes
- File: 74e8bc94abea7c60f022d8d3f672f80e59e3e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 4.837 | 5.028 | 5.086 |
| h2m-parser with readability | 25.437 | 33.207 | 33.437 |
| turndown | 30.384 | 31.542 | 31.779 |
| node html markdown | 15.871 | 16.490 | 16.534 |

### file_62

- Size: 41388 bytes
- File: 7a426de207434e419a65eead0f4b46c8a4794...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.629 | 0.675 | 0.699 |
| h2m-parser with readability | 4.137 | 4.433 | 4.468 |
| turndown | 2.747 | 2.957 | 3.079 |
| node html markdown | 0.832 | 0.974 | 1.060 |

### file_63

- Size: 180017 bytes
- File: 7b7ffca82db8f721d6e5a8e4e65e60885af5e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 3.117 | 3.321 | 3.383 |
| h2m-parser with readability | 10.952 | 20.137 | 20.285 |
| turndown | 10.999 | 13.070 | 13.144 |
| node html markdown | 11.262 | 11.696 | 11.829 |

### file_64

- Size: 89817 bytes
- File: 7e26f2e426fef3c1a370382e7827ef2e530a2...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.213 | 1.341 | 1.359 |
| h2m-parser with readability | 5.864 | 6.245 | 6.569 |
| turndown | 5.745 | 7.145 | 7.198 |
| node html markdown | 2.804 | 3.198 | 3.223 |

### file_65

- Size: 103236 bytes
- File: 7e2d19ccbb3b4029dddf26557555278babdac...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.613 | 1.696 | 1.727 |
| h2m-parser with readability | 14.973 | 21.159 | 21.424 |
| turndown | 8.229 | 9.171 | 9.223 |
| node html markdown | 6.927 | 7.194 | 7.230 |

### file_66

- Size: 78718 bytes
- File: 7e54e701ac39a9046d6eeb0ae75d2138733b6...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.212 | 1.296 | 1.327 |
| h2m-parser with readability | 9.429 | 14.779 | 15.437 |
| turndown | 4.130 | 4.562 | 5.479 |
| node html markdown | 2.343 | 2.678 | 2.722 |

### file_67

- Size: 65198 bytes
- File: 7e91eb56692c91312a3dc3e7b769a2916029e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.962 | 1.034 | 1.071 |
| h2m-parser with readability | 4.653 | 5.005 | 5.084 |
| turndown | 3.327 | 3.532 | 3.791 |
| node html markdown | 2.179 | 2.400 | 2.433 |

### file_68

- Size: 83251 bytes
- File: 7fc58a2d32d5b8d5fa9b918453a284acc7170...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.183 | 1.283 | 1.307 |
| h2m-parser with readability | 5.136 | 5.433 | 5.508 |
| turndown | 7.480 | 8.980 | 9.060 |
| node html markdown | 3.597 | 3.891 | 3.914 |

### file_69

- Size: 66855 bytes
- File: 81d304541f62a6aaf29494766718ab8e58e95...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.999 | 1.093 | 1.111 |
| h2m-parser with readability | 5.320 | 5.769 | 5.961 |
| turndown | 3.797 | 4.138 | 5.036 |
| node html markdown | 2.495 | 2.794 | 2.835 |

### file_70

- Size: 42437 bytes
- File: 83c362b1373f55d45fdad0edee4d2885cafd0...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.549 | 0.611 | 0.632 |
| h2m-parser with readability | 3.090 | 3.377 | 3.454 |
| turndown | 2.059 | 2.199 | 2.273 |
| node html markdown | 0.636 | 0.739 | 0.802 |

### file_71

- Size: 126437 bytes
- File: 84a7e7d5f61c90050a326bb74ac3a57899fdb...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.474 | 1.544 | 1.554 |
| h2m-parser with readability | 14.805 | 19.703 | 19.873 |
| turndown | 6.485 | 8.054 | 8.211 |
| node html markdown | 3.357 | 3.684 | 3.744 |

### file_72

- Size: 95344 bytes
- File: 8a1eb64f950f2f43097577c244fb38a35660f...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.370 | 1.467 | 1.493 |
| h2m-parser with readability | 6.914 | 7.580 | 15.238 |
| turndown | 6.195 | 7.635 | 7.694 |
| node html markdown | 3.361 | 3.607 | 3.620 |

### file_73

- Size: 79924 bytes
- File: 8a701b6ec1c56e2c37357030da0b4b10af418...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.803 | 0.862 | 0.889 |
| h2m-parser with readability | 7.512 | 7.768 | 12.192 |
| turndown | 3.094 | 3.368 | 3.491 |
| node html markdown | 1.368 | 1.470 | 1.511 |

### file_74

- Size: 167983 bytes
- File: 8a82ce22fec5e3656dad3d55e585727c88c94...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.879 | 3.097 | 3.152 |
| h2m-parser with readability | 12.763 | 20.418 | 20.656 |
| turndown | 9.879 | 11.978 | 12.062 |
| node html markdown | 10.228 | 10.564 | 10.597 |

### file_75

- Size: 101361 bytes
- File: 8a9d17a1e5b1866abc7b9263fabbc428e5299...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.034 | 1.120 | 1.154 |
| h2m-parser with readability | 3.330 | 3.602 | 3.643 |
| turndown | 3.109 | 3.441 | 3.505 |
| node html markdown | 1.808 | 2.163 | 2.197 |

### file_76

- Size: 32087 bytes
- File: 8bd6d9bcba689408767f770d69f12b59c3f09...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.326 | 0.353 | 0.359 |
| h2m-parser with readability | 2.283 | 2.493 | 2.580 |
| turndown | 1.561 | 1.662 | 1.694 |
| node html markdown | 0.400 | 0.432 | 0.435 |

### file_77

- Size: 80418 bytes
- File: 8c0dd0456453aeff3f66d053710f18adc1a2f...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.205 | 1.314 | 1.324 |
| h2m-parser with readability | 7.351 | 7.708 | 10.685 |
| turndown | 4.185 | 4.761 | 5.473 |
| node html markdown | 2.342 | 2.722 | 2.758 |

### file_78

- Size: 171100 bytes
- File: 8c1a780dec8c1a5ea0344514524f53b2b580c...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.939 | 3.136 | 3.162 |
| h2m-parser with readability | 9.649 | 15.007 | 19.302 |
| turndown | 10.274 | 12.158 | 12.318 |
| node html markdown | 10.529 | 10.844 | 10.899 |

### file_79

- Size: 152242 bytes
- File: 8cbf3b144736ffc4adda5fe7105e7fd1413dc...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.115 | 2.233 | 2.266 |
| h2m-parser with readability | 7.148 | 7.461 | 14.774 |
| turndown | 6.108 | 7.170 | 7.287 |
| node html markdown | 5.024 | 5.265 | 5.356 |

### file_80

- Size: 69248 bytes
- File: 8cfa9d30e2b66b991461423012906121661cd...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.154 | 1.283 | 1.316 |
| h2m-parser with readability | 3.427 | 3.666 | 3.671 |
| turndown | 3.384 | 3.718 | 4.590 |
| node html markdown | 1.527 | 1.856 | 1.903 |

### file_81

- Size: 100091 bytes
- File: 8d612a03fa42a2fb014b59534c46c9590da90...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.559 | 1.664 | 1.673 |
| h2m-parser with readability | 14.424 | 20.727 | 20.800 |
| turndown | 8.033 | 9.029 | 9.076 |
| node html markdown | 6.618 | 6.933 | 7.023 |

### file_82

- Size: 158892 bytes
- File: 8faa3156452fa9d0667617c406eb9b6458b48...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.144 | 2.284 | 2.298 |
| h2m-parser with readability | 7.407 | 7.597 | 15.348 |
| turndown | 6.757 | 7.926 | 7.956 |
| node html markdown | 5.112 | 5.364 | 5.416 |

### file_83

- Size: 37644 bytes
- File: 9c947bc9fbcb4e2eb0296d858fe193f580e86...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.608 | 0.662 | 0.672 |
| h2m-parser with readability | 3.284 | 3.569 | 3.640 |
| turndown | 2.148 | 2.343 | 2.367 |
| node html markdown | 1.887 | 2.149 | 2.159 |

### file_84

- Size: 81258 bytes
- File: 9e04cb267a9b128369a11c7f6e5486d436449...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.247 | 1.327 | 1.351 |
| h2m-parser with readability | 9.956 | 15.615 | 15.762 |
| turndown | 4.165 | 4.458 | 5.553 |
| node html markdown | 2.462 | 2.775 | 2.796 |

### file_85

- Size: 82762 bytes
- File: 9e3c6d40690c1302613f203db178b23f9f184...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.342 | 1.470 | 1.488 |
| h2m-parser with readability | 6.760 | 7.082 | 10.495 |
| turndown | 4.262 | 5.414 | 5.473 |
| node html markdown | 2.526 | 2.798 | 2.834 |

### file_86

- Size: 141136 bytes
- File: 9f2031ee45a11919452ca2efbc3498672324c...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.661 | 1.774 | 1.801 |
| h2m-parser with readability | 6.144 | 6.474 | 13.992 |
| turndown | 5.674 | 7.058 | 7.200 |
| node html markdown | 3.983 | 4.236 | 4.266 |

### file_87

- Size: 80201 bytes
- File: 9fba51a14308353194c537f494ded0ccb27d9...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.187 | 1.271 | 1.280 |
| h2m-parser with readability | 7.687 | 11.078 | 13.589 |
| turndown | 4.175 | 4.514 | 5.544 |
| node html markdown | 2.309 | 2.697 | 2.736 |

### file_88

- Size: 587 bytes
- File: simple.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.016 | 0.016 | 0.017 |
| h2m-parser with readability | 0.596 | 0.695 | 0.729 |
| turndown | 0.072 | 0.080 | 0.081 |
| node html markdown | 0.034 | 0.038 | 0.041 |

