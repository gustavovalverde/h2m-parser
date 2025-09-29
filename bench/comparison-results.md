# h2m-parser Benchmark Results

Generated: 2025-09-29T08:21:28.540Z

## Test Configuration

- Iterations: 100
- Dataset: tests/fixtures
- Readability tested: Yes

## Results by File

### tiny

- Size: 18 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.011 | 0.016 | 0.016 |
| h2m-parser with readability | 0.209 | 0.260 | 0.286 |
| turndown | 0.022 | 0.035 | 0.040 |
| node html markdown | 0.011 | 0.014 | 0.015 |
| mdream | 0.004 | 0.006 | 0.006 |

### small

- Size: 84 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.013 | 0.020 | 0.021 |
| h2m-parser with readability | 0.173 | 0.213 | 0.232 |
| turndown | 0.038 | 0.051 | 0.055 |
| node html markdown | 0.021 | 0.029 | 0.030 |
| mdream | 0.013 | 0.016 | 0.018 |

### medium

- Size: 369 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.013 | 0.015 | 0.015 |
| h2m-parser with readability | 0.212 | 0.249 | 0.268 |
| turndown | 0.044 | 0.052 | 0.052 |
| node html markdown | 0.019 | 0.024 | 0.026 |
| mdream | 0.019 | 0.038 | 0.038 |

### file_1

- Size: 89721 bytes
- File: 039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.145 | 1.287 | 1.309 |
| h2m-parser with readability | 6.828 | 9.751 | 14.756 |
| turndown | 6.081 | 7.703 | 7.992 |
| node html markdown | 3.254 | 3.583 | 3.678 |
| mdream | 1.729 | 1.887 | 1.910 |

### file_2

- Size: 70337 bytes
- File: 06ed0a833361190536a4f61888354e07dccaa501bd9a1c0f1c545533bde1650b.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.801 | 0.877 | 0.918 |
| h2m-parser with readability | 5.268 | 5.580 | 5.664 |
| turndown | 4.451 | 4.768 | 5.817 |
| node html markdown | 2.209 | 2.602 | 2.628 |
| mdream | 0.171 | 0.409 | 0.412 |

### file_3

- Size: 160839 bytes
- File: 078cdb456d1beb698aeed86e0f2161e442e9431c4580295f1ba4ece22741068c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.576 | 1.706 | 1.735 |
| h2m-parser with readability | 13.644 | 19.045 | 19.856 |
| turndown | 10.115 | 12.665 | 12.813 |
| node html markdown | 4.755 | 5.771 | 6.765 |
| mdream | 0.271 | 0.296 | 0.311 |

### file_4

- Size: 99724 bytes
- File: 0a8c510c3691d8e68ccc749559680257a382fe792a3d4d8531fb285cd74c3492.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.996 | 1.118 | 1.162 |
| h2m-parser with readability | 6.468 | 6.952 | 7.237 |
| turndown | 4.680 | 4.989 | 6.168 |
| node html markdown | 2.608 | 2.909 | 2.946 |
| mdream | 1.073 | 1.163 | 1.177 |

### file_5

- Size: 105057 bytes
- File: 0e55dcdbeb54c88ee87942b9fef7ea5398fa9a1e83493d55844b479506a80fd8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.413 | 1.566 | 1.584 |
| h2m-parser with readability | 7.968 | 8.625 | 15.312 |
| turndown | 6.741 | 8.143 | 8.331 |
| node html markdown | 3.677 | 4.024 | 4.068 |
| mdream | 0.538 | 0.609 | 0.635 |

### file_6

- Size: 94725 bytes
- File: 17ca85324662023ba21666b3ca5d5d37a92b2806bf7a88b906c28b90a635f82a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.416 | 1.564 | 1.596 |
| h2m-parser with readability | 7.749 | 8.384 | 15.762 |
| turndown | 9.023 | 10.630 | 10.768 |
| node html markdown | 5.027 | 5.431 | 5.516 |
| mdream | 1.203 | 1.263 | 1.273 |

### file_7

- Size: 62759 bytes
- File: 19fe8f574b7420277862728929d83dd74d7aa9c742688ca4c386b75693547bd3.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.931 | 1.078 | 1.093 |
| h2m-parser with readability | 5.469 | 5.918 | 6.104 |
| turndown | 4.410 | 4.828 | 5.067 |
| node html markdown | 2.275 | 2.615 | 2.638 |
| mdream | 0.534 | 0.629 | 0.648 |

### file_8

- Size: 41355 bytes
- File: 1a2c2f9fe410c836bb94e85c85625dbe8174f6e57f0b0316644cefd30979f096.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.519 | 0.578 | 0.632 |
| h2m-parser with readability | 3.420 | 3.649 | 3.690 |
| turndown | 2.205 | 2.416 | 2.446 |
| node html markdown | 0.613 | 0.718 | 0.775 |
| mdream | 0.624 | 0.711 | 0.722 |

### file_9

- Size: 61437 bytes
- File: 1bbc7f62e80e44afd533e896c0168c3b18f1e934530d05cb1f579ad3347d135c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.754 | 0.842 | 0.858 |
| h2m-parser with readability | 5.210 | 5.712 | 5.833 |
| turndown | 3.523 | 3.826 | 3.953 |
| node html markdown | 2.060 | 2.378 | 2.439 |
| mdream | 1.084 | 1.202 | 1.210 |

### file_10

- Size: 177823 bytes
- File: 1d43b4816bdba5825165dc21558d9eafb9f650c67ba048411b04dc77a745dc39.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.061 | 1.183 | 1.199 |
| h2m-parser with readability | 7.953 | 11.931 | 16.980 |
| turndown | 8.581 | 11.316 | 11.354 |
| node html markdown | 2.883 | 3.209 | 3.236 |
| mdream | 0.018 | 0.019 | 0.022 |

### file_11

- Size: 139469 bytes
- File: 1de0efed4d661163ff8414e8ca69f45a49efd7edca19dc896ca0983a4bf41485.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.715 | 1.839 | 1.864 |
| h2m-parser with readability | 23.235 | 30.950 | 31.403 |
| turndown | 10.370 | 12.471 | 12.826 |
| node html markdown | 7.216 | 7.590 | 7.685 |
| mdream | 0.141 | 0.166 | 0.168 |

### file_12

- Size: 48447 bytes
- File: 1e62a223bca12adda6410b1789072a2ad755566bd4a6bc17d10dc95a51d74d65.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.554 | 0.632 | 0.651 |
| h2m-parser with readability | 3.371 | 3.755 | 3.803 |
| turndown | 2.614 | 2.896 | 3.055 |
| node html markdown | 1.079 | 1.200 | 1.279 |
| mdream | 0.736 | 0.806 | 0.836 |

### file_13

- Size: 94912 bytes
- File: 20f1955819dc2b50d2d10788f73adc72bceb491a03ed608debb72a90bce65c50.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.200 | 1.324 | 1.334 |
| h2m-parser with readability | 5.595 | 6.044 | 6.165 |
| turndown | 5.286 | 6.333 | 6.529 |
| node html markdown | 3.741 | 4.364 | 4.490 |
| mdream | 1.680 | 1.887 | 1.922 |

### file_14

- Size: 67227 bytes
- File: 22c0f41ae560968de5e6b0ef9ecffffeae3f409aa73d9b82853f65535116f68f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.750 | 0.848 | 0.865 |
| h2m-parser with readability | 4.675 | 5.123 | 5.306 |
| turndown | 3.825 | 4.286 | 4.426 |
| node html markdown | 2.506 | 2.930 | 2.966 |
| mdream | 0.714 | 0.804 | 0.818 |

### file_15

- Size: 69850 bytes
- File: 22c3886e7116464c04c2332c20a013a5837992e7bcdb1f6cacd7d475f9784273.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.904 | 1.063 | 1.086 |
| h2m-parser with readability | 5.093 | 5.609 | 5.749 |
| turndown | 4.118 | 4.726 | 5.389 |
| node html markdown | 2.489 | 2.808 | 2.888 |
| mdream | 1.013 | 1.099 | 1.115 |

### file_16

- Size: 95103 bytes
- File: 22c4be85802e9602a344fc2cc704093362b9193523c6e35cfb7dc086c8ef8648.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.115 | 1.227 | 1.248 |
| h2m-parser with readability | 7.256 | 7.947 | 10.864 |
| turndown | 6.516 | 7.881 | 8.064 |
| node html markdown | 3.335 | 3.707 | 3.745 |
| mdream | 2.098 | 2.253 | 2.280 |

### file_17

- Size: 91296 bytes
- File: 26c3b98f33bb6902f32535235fd7d32792df87779bdf1f86c3b21e15fbf3161d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.203 | 1.367 | 1.380 |
| h2m-parser with readability | 7.086 | 9.094 | 11.404 |
| turndown | 5.742 | 6.091 | 7.709 |
| node html markdown | 3.370 | 3.819 | 3.864 |
| mdream | 0.538 | 0.606 | 0.635 |

### file_18

- Size: 74095 bytes
- File: 2dbf7cd4444617cc60f0e2d2c95b20a535979a32972f5005e2af577b37980e48.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.209 | 2.204 | 2.828 |
| h2m-parser with readability | 4.350 | 4.722 | 4.817 |
| turndown | 3.873 | 4.431 | 5.037 |
| node html markdown | 2.140 | 2.489 | 2.547 |
| mdream | 1.465 | 1.539 | 1.545 |

### file_19

- Size: 141461 bytes
- File: 2fd71e2969106342bab6862bb212ae16ba592b426dd4141da8a383b183aa3a37.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.837 | 2.048 | 2.074 |
| h2m-parser with readability | 11.862 | 19.615 | 20.677 |
| turndown | 8.589 | 10.358 | 10.580 |
| node html markdown | 6.792 | 7.265 | 7.328 |
| mdream | 1.486 | 1.604 | 1.631 |

### file_20

- Size: 78203 bytes
- File: 35f536ef8c8eba0616f2dc78e6653e1d7d68e3af927b09efad3dae7ce2080567.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.291 | 1.448 | 1.469 |
| h2m-parser with readability | 8.330 | 8.763 | 15.342 |
| turndown | 5.729 | 7.017 | 7.255 |
| node html markdown | 5.068 | 5.295 | 5.334 |
| mdream | 1.447 | 1.537 | 1.545 |

### file_21

- Size: 78530 bytes
- File: 3b27831099c75b36d5978864ec89575c675c963e949cda52147a044bbfa77559.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.989 | 1.117 | 1.142 |
| h2m-parser with readability | 5.870 | 6.219 | 6.302 |
| turndown | 5.560 | 7.205 | 7.422 |
| node html markdown | 3.812 | 4.026 | 4.053 |
| mdream | 1.146 | 1.220 | 1.227 |

### file_22

- Size: 50858 bytes
- File: 3f6413c32bffc73b64cb1a2adb237cd19ffc75494c9172755f1a961ba32e75dd.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.591 | 0.649 | 0.654 |
| h2m-parser with readability | 4.451 | 4.753 | 4.929 |
| turndown | 3.632 | 3.941 | 4.063 |
| node html markdown | 1.714 | 2.087 | 2.135 |
| mdream | 0.919 | 1.004 | 1.020 |

### file_23

- Size: 160633 bytes
- File: 40d4e50472a8f0d30d68613051be510ed098087679df7e0e564d6dd32152d679.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.369 | 1.585 | 1.592 |
| h2m-parser with readability | 10.914 | 17.280 | 18.114 |
| turndown | 7.351 | 9.625 | 9.702 |
| node html markdown | 3.710 | 4.006 | 4.038 |
| mdream | 0.717 | 0.766 | 0.771 |

### file_24

- Size: 184834 bytes
- File: 42b43887c6dd91353249924745e030eac3a6d818966d91c67b406431ff9bdf05.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.887 | 2.038 | 2.054 |
| h2m-parser with readability | 8.941 | 9.238 | 17.811 |
| turndown | 7.610 | 9.037 | 9.177 |
| node html markdown | 6.872 | 7.466 | 7.597 |
| mdream | 0.201 | 0.226 | 0.237 |

### file_25

- Size: 98648 bytes
- File: 44b21071ae6feede3c36d2ab032cd422eb0c6a0fdfe4da79531931ad93dd4940.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.045 | 1.134 | 1.160 |
| h2m-parser with readability | 7.717 | 8.335 | 14.404 |
| turndown | 5.298 | 6.525 | 6.838 |
| node html markdown | 2.590 | 2.929 | 2.950 |
| mdream | 1.042 | 1.112 | 1.135 |

### file_26

- Size: 85583 bytes
- File: 44f750fab67bb9f54f5b5cc90bc34d55cff06260a3e63245856a6e57fcda5906.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.215 | 1.319 | 1.328 |
| h2m-parser with readability | 6.504 | 6.879 | 7.071 |
| turndown | 5.957 | 7.486 | 7.665 |
| node html markdown | 6.419 | 6.732 | 6.743 |
| mdream | 1.823 | 1.946 | 1.983 |

### file_27

- Size: 65639 bytes
- File: 45b6063ac2016db7b2fb1f995f0b54ee054fb561022e169c8fdbe321dcf672db.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.052 | 1.164 | 1.187 |
| h2m-parser with readability | 5.202 | 5.600 | 5.629 |
| turndown | 4.578 | 5.031 | 6.279 |
| node html markdown | 5.019 | 5.407 | 5.473 |
| mdream | 1.482 | 1.619 | 1.643 |

### file_28

- Size: 53725 bytes
- File: 45efaba666da241d9d069b550890530b65f2a6b61a5e529e1d3664630d4897ee.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.690 | 0.778 | 0.789 |
| h2m-parser with readability | 3.949 | 4.235 | 4.251 |
| turndown | 3.252 | 3.458 | 3.579 |
| node html markdown | 1.719 | 2.025 | 2.080 |
| mdream | 1.053 | 1.154 | 1.164 |

### file_29

- Size: 88224 bytes
- File: 46ab324348ca339dba58238e193f794c3309e52c018a8156ef9aedfedf0572e7.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.040 | 1.177 | 1.183 |
| h2m-parser with readability | 12.051 | 16.695 | 17.144 |
| turndown | 5.283 | 6.802 | 6.908 |
| node html markdown | 3.279 | 3.614 | 3.664 |
| mdream | 0.344 | 0.381 | 0.385 |

### file_30

- Size: 52935 bytes
- File: 46ed10778ec7c1292e624e1a72a2a0899f8ab6d8d4db1aa57fa4418b8b7e0a5d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.684 | 0.794 | 0.803 |
| h2m-parser with readability | 3.813 | 4.116 | 4.246 |
| turndown | 3.053 | 3.330 | 3.486 |
| node html markdown | 2.090 | 2.416 | 2.434 |
| mdream | 0.878 | 0.946 | 0.954 |

### file_31

- Size: 166944 bytes
- File: 4b8debc51d3d9598ad4552cc7a591d200a6c7d545fed2454916bedbb0f666086.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.313 | 1.421 | 1.430 |
| h2m-parser with readability | 9.280 | 13.976 | 16.729 |
| turndown | 7.750 | 9.966 | 10.039 |
| node html markdown | 3.622 | 3.992 | 4.011 |
| mdream | 0.704 | 0.800 | 0.806 |

### file_32

- Size: 97808 bytes
- File: 4bf8e536214f987f4a0bf6ca7d233619d30bde1e80a816c78d00358eb61e353c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.212 | 1.360 | 1.382 |
| h2m-parser with readability | 8.048 | 8.816 | 16.292 |
| turndown | 6.870 | 8.221 | 8.445 |
| node html markdown | 3.710 | 4.032 | 4.149 |
| mdream | 2.126 | 2.209 | 2.231 |

### file_33

- Size: 90241 bytes
- File: 4e0e399d24fe145def4817facccb0ff79e305dedb9ece5f8ec66396ea378f723.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.026 | 1.132 | 1.149 |
| h2m-parser with readability | 6.440 | 6.825 | 14.069 |
| turndown | 6.195 | 7.589 | 7.712 |
| node html markdown | 3.372 | 3.762 | 3.801 |
| mdream | 2.019 | 2.175 | 2.188 |

### file_34

- Size: 166420 bytes
- File: 4f454cb97e9b77d94c10ed8a6a35cd2eff1671de9d3d27852a38abd76a95be83.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.852 | 1.987 | 2.011 |
| h2m-parser with readability | 8.590 | 8.941 | 17.311 |
| turndown | 7.163 | 8.527 | 8.686 |
| node html markdown | 6.148 | 6.549 | 6.607 |
| mdream | 0.191 | 0.211 | 0.212 |

### file_35

- Size: 68778 bytes
- File: 4f83531b9fc91fd1e0062e43200669cd82cc36a518caa7f66fc6ba5be4ac545b.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.644 | 0.732 | 0.783 |
| h2m-parser with readability | 3.585 | 3.878 | 3.909 |
| turndown | 3.586 | 3.926 | 4.763 |
| node html markdown | 1.575 | 1.945 | 2.003 |
| mdream | 0.951 | 1.004 | 1.020 |

### file_36

- Size: 167544 bytes
- File: 4fe5472ba89db38e20daef6025108310c52121fd382c06314d5b33d7f47c1e94.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.260 | 2.415 | 2.429 |
| h2m-parser with readability | 16.955 | 24.071 | 24.263 |
| turndown | 10.935 | 12.829 | 12.869 |
| node html markdown | 10.231 | 10.531 | 10.589 |
| mdream | 0.402 | 0.436 | 0.450 |

### file_37

- Size: 84444 bytes
- File: 5a012f66c2bf0c70a0744c7483478aaa0c1a2b5b5920a72223f3a090e39df8be.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.342 | 1.491 | 1.507 |
| h2m-parser with readability | 7.165 | 7.552 | 7.893 |
| turndown | 6.485 | 7.893 | 7.942 |
| node html markdown | 6.867 | 7.220 | 7.253 |
| mdream | 1.751 | 1.885 | 1.914 |

### file_38

- Size: 69828 bytes
- File: 5bc9df3a36efb57a22edf862cec6a28eb112e535559c194d7976fb664c922c13.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.871 | 0.986 | 0.992 |
| h2m-parser with readability | 8.466 | 13.266 | 13.659 |
| turndown | 5.245 | 6.555 | 6.890 |
| node html markdown | 2.606 | 2.923 | 2.956 |
| mdream | 1.353 | 1.434 | 1.446 |

### file_39

- Size: 66504 bytes
- File: 5c83c2d71f97e2b5a979f197fbae6773dee6844e28889ae66ccb8d7458a9c5bb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.990 | 1.107 | 1.111 |
| h2m-parser with readability | 5.615 | 5.923 | 6.025 |
| turndown | 4.543 | 4.861 | 6.005 |
| node html markdown | 3.158 | 3.460 | 3.516 |
| mdream | 1.352 | 1.432 | 1.444 |

### file_40

- Size: 76713 bytes
- File: 5de3db78f95172797a51b3b3b2cdc4caeb63a4d7b709e4441510d2c1967e0e6f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.745 | 0.831 | 0.861 |
| h2m-parser with readability | 9.931 | 15.092 | 15.514 |
| turndown | 4.690 | 6.883 | 7.194 |
| node html markdown | 2.223 | 2.622 | 2.638 |
| mdream | 0.352 | 0.382 | 0.392 |

### file_41

- Size: 157066 bytes
- File: 5f081a0a9d1a1ce3b0e53603ecd8bde78947841c8fd1ff3c36efa95ee84681f6.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.654 | 1.805 | 1.837 |
| h2m-parser with readability | 9.800 | 10.506 | 17.732 |
| turndown | 8.259 | 10.095 | 10.256 |
| node html markdown | 6.011 | 6.457 | 6.477 |
| mdream | 1.104 | 1.206 | 1.219 |

### file_42

- Size: 21734 bytes
- File: 5f8b89390d3fc01c6a80728ba2aee597fea1dbfc8399d61015956db71e5336c7.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.256 | 0.285 | 0.306 |
| h2m-parser with readability | 1.910 | 2.151 | 2.170 |
| turndown | 1.518 | 1.741 | 1.761 |
| node html markdown | 0.426 | 0.501 | 0.518 |
| mdream | 0.355 | 0.394 | 0.408 |

### file_43

- Size: 91883 bytes
- File: 5f8c9f60be2250f694094ee1ca5deb9df10479e29fc92ff07c77c4cb9d2c3f21.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.205 | 1.344 | 1.351 |
| h2m-parser with readability | 7.671 | 8.257 | 14.921 |
| turndown | 5.887 | 7.437 | 7.829 |
| node html markdown | 4.176 | 4.527 | 4.570 |
| mdream | 1.280 | 1.339 | 1.344 |

### file_44

- Size: 124858 bytes
- File: 5fbfe3905c71925b1b3a875a3111073e5d0996d3f250a697398477d3642db321.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.204 | 1.336 | 1.359 |
| h2m-parser with readability | 7.129 | 7.657 | 11.551 |
| turndown | 5.338 | 6.482 | 6.653 |
| node html markdown | 4.461 | 4.683 | 4.699 |
| mdream | 0.534 | 0.602 | 0.608 |

### file_45

- Size: 185748 bytes
- File: 60b8aff17382f2fd02584645ef66e517b41f764d5b4ca404c1ceff3fe22bdda8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.749 | 1.882 | 1.904 |
| h2m-parser with readability | 11.588 | 19.099 | 19.837 |
| turndown | 9.465 | 11.402 | 11.505 |
| node html markdown | 6.570 | 7.079 | 7.129 |
| mdream | 0.392 | 0.432 | 0.436 |

### file_46

- Size: 172926 bytes
- File: 60bccec4069d54a6889bfcda785c0f3066a70cb5fadeea81f28d371681a2dee8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.473 | 2.612 | 2.635 |
| h2m-parser with readability | 14.032 | 21.002 | 21.081 |
| turndown | 14.684 | 15.959 | 16.094 |
| node html markdown | 7.943 | 8.261 | 8.317 |
| mdream | 3.175 | 3.289 | 3.308 |

### file_47

- Size: 42840 bytes
- File: 60cc80fb25f0b2ebdb2e6835ab7bfd3d26362971e39fe8838e7ac548ba323cf0.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.492 | 0.563 | 0.589 |
| h2m-parser with readability | 3.409 | 3.686 | 3.702 |
| turndown | 2.325 | 2.558 | 2.628 |
| node html markdown | 0.662 | 0.755 | 0.807 |
| mdream | 0.654 | 0.710 | 0.726 |

### file_48

- Size: 137969 bytes
- File: 61adb9c208d9c67253b4413ef7ec2d010edae448b8c832bff2254125e4b51d5f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.035 | 1.136 | 1.155 |
| h2m-parser with readability | 10.763 | 19.812 | 20.584 |
| turndown | 6.251 | 8.141 | 8.235 |
| node html markdown | 3.517 | 3.804 | 3.813 |
| mdream | 1.531 | 1.647 | 1.652 |

### file_49

- Size: 120011 bytes
- File: 61d8052b19ed9885651ed1110ddcccc001f9ec2e3b7a77926d350762bcd02400.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.115 | 1.210 | 1.216 |
| h2m-parser with readability | 7.680 | 8.000 | 12.187 |
| turndown | 5.070 | 6.382 | 6.517 |
| node html markdown | 4.086 | 4.297 | 4.324 |
| mdream | 0.518 | 0.576 | 0.600 |

### file_50

- Size: 66809 bytes
- File: 63c6d5256b8ce1098b5688eb5fafa747e9467692d099a3e9e42246e7af29748f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.773 | 0.873 | 0.892 |
| h2m-parser with readability | 4.827 | 5.097 | 5.157 |
| turndown | 4.176 | 4.514 | 5.624 |
| node html markdown | 1.904 | 2.399 | 2.423 |
| mdream | 0.712 | 0.823 | 0.891 |

### file_51

- Size: 82725 bytes
- File: 64bf40da8348d808ef103cc5529fd268fec46fbefa40b486d288d2a07871a527.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.892 | 1.022 | 1.042 |
| h2m-parser with readability | 4.913 | 5.440 | 5.585 |
| turndown | 5.007 | 5.534 | 6.562 |
| node html markdown | 2.532 | 2.875 | 2.904 |
| mdream | 0.781 | 0.838 | 0.853 |

### file_52

- Size: 46587 bytes
- File: 6a59bd96489c98226c72f0245bac98a4b09aa0516ebfe4982233a6c33d129691.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.585 | 0.677 | 0.691 |
| h2m-parser with readability | 4.023 | 4.274 | 4.295 |
| turndown | 2.865 | 3.083 | 3.221 |
| node html markdown | 1.829 | 2.185 | 2.231 |
| mdream | 0.826 | 0.924 | 0.932 |

### file_53

- Size: 59176 bytes
- File: 6b095375a53dfc7994a032e2efac70f43a4fac9303d549256d88b8f7cecadd50.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.611 | 0.669 | 0.683 |
| h2m-parser with readability | 4.776 | 5.070 | 5.162 |
| turndown | 2.943 | 3.264 | 4.016 |
| node html markdown | 1.291 | 1.520 | 1.597 |
| mdream | 0.261 | 0.308 | 0.320 |

### file_54

- Size: 227057 bytes
- File: 6b817bedb8d6402bab160ed6d2b99256163bd3aef20deae3015f74e5bb253e55.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.341 | 1.444 | 1.484 |
| h2m-parser with readability | 11.327 | 20.058 | 20.633 |
| turndown | 9.386 | 13.246 | 13.487 |
| node html markdown | 3.804 | 4.309 | 4.388 |
| mdream | 0.723 | 0.813 | 0.820 |

### file_55

- Size: 75425 bytes
- File: 6d30abed88489774017024b17cdb1928d9a2b45bb79767515383b8444e9601b2.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.885 | 1.006 | 1.026 |
| h2m-parser with readability | 2.758 | 3.064 | 3.133 |
| turndown | 3.789 | 4.056 | 5.036 |
| node html markdown | 3.700 | 3.982 | 4.018 |
| mdream | 1.462 | 1.539 | 1.555 |

### file_56

- Size: 123582 bytes
- File: 71bf3c23c5d3fff9cec67606fde6547c8866ae8aa95f5991651d94c68df4ad1d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.556 | 1.724 | 1.737 |
| h2m-parser with readability | 9.208 | 16.579 | 16.823 |
| turndown | 7.027 | 8.560 | 8.673 |
| node html markdown | 6.010 | 6.414 | 6.467 |
| mdream | 1.270 | 1.383 | 1.388 |

### file_57

- Size: 90590 bytes
- File: 71cb773c42c94b75d41c059a27dd10b763443a71dbb6dd202402843de8a5e331.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.841 | 0.974 | 0.987 |
| h2m-parser with readability | 6.076 | 6.560 | 6.730 |
| turndown | 4.367 | 5.431 | 5.646 |
| node html markdown | 2.286 | 2.538 | 2.566 |
| mdream | 1.097 | 1.170 | 1.183 |

### file_58

- Size: 139105 bytes
- File: 72e78dee157bdf3e8a9a9f07e54a98a3714ea2998e2c2e2a94c46dbe92176feb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.153 | 2.340 | 2.369 |
| h2m-parser with readability | 10.653 | 19.846 | 20.285 |
| turndown | 6.979 | 9.086 | 9.375 |
| node html markdown | 12.520 | 13.159 | 13.321 |
| mdream | 1.339 | 1.438 | 1.451 |

### file_59

- Size: 99162 bytes
- File: 72ecfb3f60f4e8a6103916f2041ce9a55c4ef1e31477f9a8ffb7f4d3bba8c559.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.458 | 1.569 | 1.605 |
| h2m-parser with readability | 15.587 | 22.595 | 22.874 |
| turndown | 8.855 | 10.141 | 10.275 |
| node html markdown | 7.350 | 7.673 | 7.687 |
| mdream | 0.200 | 0.216 | 0.220 |

### file_60

- Size: 100264 bytes
- File: 73c175cdf9d5e065351ecf2220510088904adb77b49211cdd99e43e5870e06c2.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.120 | 1.288 | 1.317 |
| h2m-parser with readability | 13.548 | 17.219 | 17.357 |
| turndown | 4.428 | 4.901 | 5.887 |
| node html markdown | 2.735 | 3.149 | 3.179 |
| mdream | 1.454 | 1.558 | 1.570 |

### file_61

- Size: 388826 bytes
- File: 74e8bc94abea7c60f022d8d3f672f80e59e3e126735fae0b5ee5914ff2fce48e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 5.007 | 5.384 | 5.579 |
| h2m-parser with readability | 26.601 | 34.962 | 35.072 |
| turndown | 31.408 | 32.902 | 33.427 |
| node html markdown | 17.595 | 19.014 | 19.271 |
| mdream | 6.857 | 7.095 | 7.172 |

### file_62

- Size: 41388 bytes
- File: 7a426de207434e419a65eead0f4b46c8a479429d8429c36dc03b033d7e4891df.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.457 | 0.484 | 0.493 |
| h2m-parser with readability | 4.186 | 4.541 | 4.578 |
| turndown | 3.634 | 6.970 | 7.587 |
| node html markdown | 0.861 | 1.045 | 1.231 |
| mdream | 0.064 | 0.066 | 0.067 |

### file_63

- Size: 180017 bytes
- File: 7b7ffca82db8f721d6e5a8e4e65e60885af5eee4b9f28beb6b8363bb70c820f9.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.343 | 2.455 | 2.495 |
| h2m-parser with readability | 10.951 | 19.954 | 20.297 |
| turndown | 11.509 | 13.214 | 13.256 |
| node html markdown | 11.269 | 11.755 | 11.866 |
| mdream | 0.047 | 0.047 | 0.048 |

### file_64

- Size: 89817 bytes
- File: 7e26f2e426fef3c1a370382e7827ef2e530a2ff0c2cea7641ebb596a4a1b8008.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.943 | 0.997 | 1.012 |
| h2m-parser with readability | 5.930 | 6.364 | 6.444 |
| turndown | 6.075 | 7.342 | 7.564 |
| node html markdown | 2.890 | 3.170 | 3.234 |
| mdream | 1.915 | 2.104 | 2.116 |

### file_65

- Size: 103236 bytes
- File: 7e2d19ccbb3b4029dddf26557555278babdac18bb78a742052fd946001c28e4e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.526 | 1.688 | 1.693 |
| h2m-parser with readability | 15.238 | 21.567 | 21.781 |
| turndown | 8.688 | 9.564 | 9.626 |
| node html markdown | 7.551 | 8.342 | 8.387 |
| mdream | 2.297 | 2.460 | 2.474 |

### file_66

- Size: 78718 bytes
- File: 7e54e701ac39a9046d6eeb0ae75d2138733b66b30b5211e7f3245dd6dc3ca36c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.802 | 0.892 | 0.900 |
| h2m-parser with readability | 9.647 | 14.996 | 15.177 |
| turndown | 4.323 | 5.480 | 5.665 |
| node html markdown | 2.322 | 2.590 | 2.613 |
| mdream | 0.338 | 0.364 | 0.365 |

### file_67

- Size: 65198 bytes
- File: 7e91eb56692c91312a3dc3e7b769a2916029ef3d9e431d056d5f548c0f771d16.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.717 | 0.734 | 0.742 |
| h2m-parser with readability | 4.648 | 5.026 | 5.150 |
| turndown | 3.417 | 3.711 | 3.818 |
| node html markdown | 2.193 | 2.481 | 2.507 |
| mdream | 1.074 | 1.143 | 1.173 |

### file_68

- Size: 83251 bytes
- File: 7fc58a2d32d5b8d5fa9b918453a284acc71703ccfa0f0c89ec292b4245fd0521.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.974 | 1.081 | 1.106 |
| h2m-parser with readability | 5.078 | 5.398 | 5.420 |
| turndown | 7.609 | 8.924 | 9.042 |
| node html markdown | 3.607 | 3.885 | 3.910 |
| mdream | 1.395 | 1.451 | 1.460 |

### file_69

- Size: 66855 bytes
- File: 81d304541f62a6aaf29494766718ab8e58e95a8e784613e75f106cdef17868d6.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.798 | 0.837 | 0.854 |
| h2m-parser with readability | 5.243 | 5.598 | 5.844 |
| turndown | 3.786 | 4.239 | 5.077 |
| node html markdown | 2.464 | 2.740 | 2.745 |
| mdream | 1.106 | 1.134 | 1.139 |

### file_70

- Size: 42437 bytes
- File: 83c362b1373f55d45fdad0edee4d2885cafd0da3f2afb146cf2822448c3c4104.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.468 | 0.482 | 0.489 |
| h2m-parser with readability | 3.076 | 3.326 | 3.385 |
| turndown | 2.113 | 2.253 | 2.299 |
| node html markdown | 0.627 | 0.682 | 0.730 |
| mdream | 0.665 | 0.685 | 0.690 |

### file_71

- Size: 126437 bytes
- File: 84a7e7d5f61c90050a326bb74ac3a57899fdba4b755bd50df01a053c262d354e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.397 | 1.450 | 1.489 |
| h2m-parser with readability | 14.598 | 19.350 | 19.572 |
| turndown | 6.401 | 7.949 | 8.060 |
| node html markdown | 3.274 | 3.560 | 3.576 |
| mdream | 1.337 | 1.372 | 1.383 |

### file_72

- Size: 95344 bytes
- File: 8a1eb64f950f2f43097577c244fb38a35660f50a88c4305b23a8f24f254da8cb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.066 | 1.142 | 1.162 |
| h2m-parser with readability | 6.820 | 7.136 | 12.973 |
| turndown | 6.277 | 7.586 | 7.758 |
| node html markdown | 3.325 | 3.569 | 3.586 |
| mdream | 2.021 | 2.078 | 2.091 |

### file_73

- Size: 79924 bytes
- File: 8a701b6ec1c56e2c37357030da0b4b10af4187f069a988e12c2f91d2ba40cdc1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.739 | 0.756 | 0.761 |
| h2m-parser with readability | 7.338 | 8.001 | 11.391 |
| turndown | 3.131 | 3.400 | 3.410 |
| node html markdown | 1.378 | 1.489 | 1.577 |
| mdream | 1.061 | 1.082 | 1.098 |

### file_74

- Size: 167983 bytes
- File: 8a82ce22fec5e3656dad3d55e585727c88c94808ad92e37a0f6e99dcb3888800.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.075 | 2.143 | 2.178 |
| h2m-parser with readability | 12.651 | 20.021 | 20.212 |
| turndown | 10.030 | 12.024 | 12.129 |
| node html markdown | 10.047 | 10.326 | 10.381 |
| mdream | 0.047 | 0.050 | 0.050 |

### file_75

- Size: 101361 bytes
- File: 8a9d17a1e5b1866abc7b9263fabbc428e5299c7443ecad6cc56c0076287fe11a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.779 | 0.794 | 0.806 |
| h2m-parser with readability | 3.235 | 3.392 | 3.470 |
| turndown | 3.119 | 3.311 | 3.360 |
| node html markdown | 1.824 | 2.105 | 2.109 |
| mdream | 1.332 | 1.372 | 1.385 |

### file_76

- Size: 32087 bytes
- File: 8bd6d9bcba689408767f770d69f12b59c3f092e73cffcc9332261fbab4aa16e1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.290 | 0.297 | 0.303 |
| h2m-parser with readability | 2.189 | 2.370 | 2.418 |
| turndown | 1.618 | 1.716 | 1.771 |
| node html markdown | 0.405 | 0.418 | 0.422 |
| mdream | 0.458 | 0.493 | 0.531 |

### file_77

- Size: 80418 bytes
- File: 8c0dd0456453aeff3f66d053710f18adc1a2fc0f1f3a0c95a3e166e41ffb737d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.784 | 0.819 | 0.851 |
| h2m-parser with readability | 7.360 | 7.564 | 13.052 |
| turndown | 4.217 | 4.617 | 5.546 |
| node html markdown | 2.349 | 2.689 | 2.711 |
| mdream | 0.299 | 0.306 | 0.306 |

### file_78

- Size: 171100 bytes
- File: 8c1a780dec8c1a5ea0344514524f53b2b580ce87083e0a756ade3d83627d5653.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.098 | 2.174 | 2.210 |
| h2m-parser with readability | 9.390 | 16.034 | 19.076 |
| turndown | 10.496 | 12.534 | 12.681 |
| node html markdown | 11.140 | 11.700 | 11.754 |
| mdream | 0.048 | 0.049 | 0.050 |

### file_79

- Size: 152242 bytes
- File: 8cbf3b144736ffc4adda5fe7105e7fd1413dcc1955110829d849a658aa722bea.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.543 | 1.628 | 1.685 |
| h2m-parser with readability | 6.827 | 7.147 | 14.372 |
| turndown | 6.161 | 7.206 | 7.313 |
| node html markdown | 4.934 | 5.252 | 5.276 |
| mdream | 2.484 | 2.627 | 2.654 |

### file_80

- Size: 69248 bytes
- File: 8cfa9d30e2b66b991461423012906121661cd9c8809f564eabb660149577864d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.605 | 0.625 | 0.635 |
| h2m-parser with readability | 3.505 | 4.623 | 5.114 |
| turndown | 3.508 | 3.791 | 4.669 |
| node html markdown | 1.536 | 1.899 | 1.930 |
| mdream | 0.933 | 0.997 | 1.001 |

### file_81

- Size: 100091 bytes
- File: 8d612a03fa42a2fb014b59534c46c9590da90fbeb91ac50938cdfa36dd274e23.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.459 | 1.562 | 1.578 |
| h2m-parser with readability | 14.978 | 21.342 | 22.056 |
| turndown | 8.797 | 9.808 | 9.892 |
| node html markdown | 6.856 | 7.466 | 7.503 |
| mdream | 2.235 | 2.363 | 2.381 |

### file_82

- Size: 158892 bytes
- File: 8faa3156452fa9d0667617c406eb9b6458b48d7b8c36cf2bf804fba290b302f5.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.592 | 1.718 | 1.730 |
| h2m-parser with readability | 7.148 | 7.417 | 14.960 |
| turndown | 6.506 | 7.468 | 7.547 |
| node html markdown | 4.934 | 5.130 | 5.171 |
| mdream | 2.511 | 2.584 | 2.595 |

### file_83

- Size: 37644 bytes
- File: 9c947bc9fbcb4e2eb0296d858fe193f580e869db7869358af822d7d2d4c0388e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.564 | 0.598 | 0.605 |
| h2m-parser with readability | 3.189 | 3.371 | 3.461 |
| turndown | 2.225 | 2.339 | 2.356 |
| node html markdown | 1.935 | 2.161 | 2.205 |
| mdream | 0.672 | 0.695 | 0.698 |

### file_84

- Size: 81258 bytes
- File: 9e04cb267a9b128369a11c7f6e5486d43644955dee7f73cc004b9cf1693a11c1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.824 | 0.879 | 0.888 |
| h2m-parser with readability | 10.049 | 15.357 | 15.880 |
| turndown | 4.280 | 5.364 | 5.507 |
| node html markdown | 2.446 | 2.735 | 2.769 |
| mdream | 0.347 | 0.368 | 0.369 |

### file_85

- Size: 82762 bytes
- File: 9e3c6d40690c1302613f203db178b23f9f18494d2653a1b547086a3973fff93c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.836 | 0.849 | 0.853 |
| h2m-parser with readability | 6.729 | 7.086 | 13.136 |
| turndown | 4.300 | 5.313 | 5.518 |
| node html markdown | 2.564 | 2.916 | 2.965 |
| mdream | 0.338 | 0.361 | 0.364 |

### file_86

- Size: 141136 bytes
- File: 9f2031ee45a11919452ca2efbc3498672324cda5f76314d7ea10913f63cf3545.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.388 | 1.525 | 1.583 |
| h2m-parser with readability | 6.506 | 6.888 | 14.079 |
| turndown | 6.029 | 7.326 | 7.525 |
| node html markdown | 9.420 | 11.549 | 11.746 |
| mdream | 0.377 | 0.509 | 0.543 |

### file_87

- Size: 80201 bytes
- File: 9fba51a14308353194c537f494ded0ccb27d9f908f252690b083d48db64ea15a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.847 | 2.244 | 2.278 |
| h2m-parser with readability | 7.867 | 13.489 | 13.980 |
| turndown | 4.186 | 4.917 | 5.466 |
| node html markdown | 2.310 | 2.642 | 2.649 |
| mdream | 0.316 | 0.334 | 0.335 |

### file_88

- Size: 429661 bytes
- File: github-markdown-complete.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.850 | 2.948 | 2.980 |
| h2m-parser with readability | 30.124 | 34.700 | 34.852 |
| turndown | 13.077 | 14.702 | 14.950 |
| node html markdown | 7.417 | 7.856 | 7.896 |
| mdream | 8.835 | 9.202 | 9.302 |

### file_89

- Size: 128 bytes
- File: simple.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.005 | 0.006 | 0.006 |
| h2m-parser with readability | 0.140 | 0.148 | 0.153 |
| turndown | 0.009 | 0.012 | 0.013 |
| node html markdown | 0.004 | 0.004 | 0.004 |
| mdream | 0.003 | 0.003 | 0.003 |

### file_90

- Size: 865 bytes
- File: test-origin.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.022 | 0.025 | 0.025 |
| h2m-parser with readability | 0.432 | 0.468 | 0.500 |
| turndown | 0.114 | 0.120 | 0.123 |
| node html markdown | 0.054 | 0.056 | 0.057 |
| mdream | 0.032 | 0.034 | 0.034 |

### file_91

- Size: 1813514 bytes
- File: wikipedia-largest.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 31.285 | 32.523 | 33.396 |
| h2m-parser with readability | 803.800 | 1050.875 | 1084.076 |
| turndown | 198.408 | 207.124 | 209.040 |
| node html markdown | 12860.706 | 13446.996 | 13451.017 |
| mdream | 49.437 | 51.141 | 51.449 |

### file_92

- Size: 166054 bytes
- File: wikipedia-small.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.036 | 2.112 | 2.166 |
| h2m-parser with readability | 18.622 | 25.209 | 25.296 |
| turndown | 9.156 | 10.428 | 10.579 |
| node html markdown | 8.622 | 8.897 | 8.946 |
| mdream | 2.919 | 2.986 | 3.038 |

