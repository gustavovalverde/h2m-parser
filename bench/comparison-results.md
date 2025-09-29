# h2m-parser Benchmark Results

Generated: 2025-09-29T07:21:48.674Z

## Test Configuration

- Iterations: 1000
- Dataset: tests/fixtures
- Readability tested: Yes

## Results by File

### tiny

- Size: 18 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.008 | 0.011 | 0.012 |
| h2m-parser with readability | 0.105 | 0.141 | 0.151 |
| turndown | 0.011 | 0.016 | 0.018 |
| node html markdown | 0.006 | 0.008 | 0.009 |
| mdream | 0.002 | 0.004 | 0.004 |

### small

- Size: 84 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.009 | 0.012 | 0.012 |
| h2m-parser with readability | 0.121 | 0.142 | 0.146 |
| turndown | 0.023 | 0.028 | 0.030 |
| node html markdown | 0.012 | 0.015 | 0.016 |
| mdream | 0.005 | 0.009 | 0.009 |

### medium

- Size: 369 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.011 | 0.012 | 0.012 |
| h2m-parser with readability | 0.169 | 0.177 | 0.179 |
| turndown | 0.032 | 0.034 | 0.035 |
| node html markdown | 0.017 | 0.020 | 0.025 |
| mdream | 0.009 | 0.010 | 0.011 |

### file_1

- Size: 89721 bytes
- File: 039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.978 | 1.032 | 1.054 |
| h2m-parser with readability | 6.085 | 6.516 | 9.328 |
| turndown | 5.659 | 6.935 | 7.000 |
| node html markdown | 2.876 | 3.089 | 3.116 |
| mdream | 1.623 | 1.675 | 1.690 |

### file_2

- Size: 70337 bytes
- File: 06ed0a833361190536a4f61888354e07dccaa501bd9a1c0f1c545533bde1650b.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.738 | 0.759 | 0.767 |
| h2m-parser with readability | 4.975 | 5.339 | 5.504 |
| turndown | 4.116 | 4.424 | 5.430 |
| node html markdown | 2.017 | 2.256 | 2.284 |
| mdream | 0.151 | 0.160 | 0.161 |

### file_3

- Size: 160839 bytes
- File: 078cdb456d1beb698aeed86e0f2161e442e9431c4580295f1ba4ece22741068c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.379 | 1.436 | 1.463 |
| h2m-parser with readability | 13.010 | 18.269 | 19.437 |
| turndown | 9.094 | 11.260 | 11.434 |
| node html markdown | 3.849 | 4.033 | 4.076 |
| mdream | 0.252 | 0.257 | 0.258 |

### file_4

- Size: 99724 bytes
- File: 0a8c510c3691d8e68ccc749559680257a382fe792a3d4d8531fb285cd74c3492.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.902 | 0.937 | 0.950 |
| h2m-parser with readability | 6.192 | 6.731 | 8.703 |
| turndown | 4.270 | 4.598 | 5.677 |
| node html markdown | 2.330 | 2.589 | 2.623 |
| mdream | 0.999 | 1.046 | 1.057 |

### file_5

- Size: 105057 bytes
- File: 0e55dcdbeb54c88ee87942b9fef7ea5398fa9a1e83493d55844b479506a80fd8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.205 | 1.261 | 1.281 |
| h2m-parser with readability | 7.362 | 7.922 | 13.942 |
| turndown | 6.286 | 7.570 | 7.713 |
| node html markdown | 3.123 | 3.309 | 3.331 |
| mdream | 0.500 | 0.516 | 0.519 |

### file_6

- Size: 94725 bytes
- File: 17ca85324662023ba21666b3ca5d5d37a92b2806bf7a88b906c28b90a635f82a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.280 | 1.351 | 1.370 |
| h2m-parser with readability | 7.227 | 7.909 | 14.253 |
| turndown | 7.799 | 9.032 | 9.103 |
| node html markdown | 4.452 | 4.705 | 4.757 |
| mdream | 1.142 | 1.164 | 1.181 |

### file_7

- Size: 62759 bytes
- File: 19fe8f574b7420277862728929d83dd74d7aa9c742688ca4c386b75693547bd3.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.788 | 0.808 | 0.813 |
| h2m-parser with readability | 5.120 | 5.422 | 5.530 |
| turndown | 4.233 | 4.510 | 5.662 |
| node html markdown | 2.143 | 2.398 | 2.425 |
| mdream | 0.481 | 0.502 | 0.509 |

### file_8

- Size: 41355 bytes
- File: 1a2c2f9fe410c836bb94e85c85625dbe8174f6e57f0b0316644cefd30979f096.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.443 | 0.468 | 0.475 |
| h2m-parser with readability | 3.199 | 3.371 | 3.409 |
| turndown | 2.103 | 2.253 | 2.283 |
| node html markdown | 0.596 | 0.641 | 0.662 |
| mdream | 0.605 | 0.632 | 0.639 |

### file_9

- Size: 61437 bytes
- File: 1bbc7f62e80e44afd533e896c0168c3b18f1e934530d05cb1f579ad3347d135c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.690 | 0.728 | 0.739 |
| h2m-parser with readability | 4.846 | 5.115 | 5.193 |
| turndown | 3.284 | 3.518 | 3.660 |
| node html markdown | 1.829 | 2.060 | 2.082 |
| mdream | 1.043 | 1.091 | 1.101 |

### file_10

- Size: 177823 bytes
- File: 1d43b4816bdba5825165dc21558d9eafb9f650c67ba048411b04dc77a745dc39.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.946 | 1.007 | 1.027 |
| h2m-parser with readability | 6.624 | 7.017 | 7.437 |
| turndown | 7.893 | 10.280 | 10.450 |
| node html markdown | 2.706 | 3.030 | 3.058 |
| mdream | 0.017 | 0.018 | 0.019 |

### file_11

- Size: 139469 bytes
- File: 1de0efed4d661163ff8414e8ca69f45a49efd7edca19dc896ca0983a4bf41485.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.564 | 1.654 | 1.672 |
| h2m-parser with readability | 21.439 | 28.592 | 29.095 |
| turndown | 9.543 | 11.240 | 11.424 |
| node html markdown | 6.410 | 6.848 | 6.912 |
| mdream | 0.123 | 0.130 | 0.133 |

### file_12

- Size: 48447 bytes
- File: 1e62a223bca12adda6410b1789072a2ad755566bd4a6bc17d10dc95a51d74d65.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.478 | 0.491 | 0.495 |
| h2m-parser with readability | 3.036 | 3.235 | 3.282 |
| turndown | 2.410 | 2.594 | 2.639 |
| node html markdown | 1.013 | 1.102 | 1.192 |
| mdream | 0.659 | 0.684 | 0.693 |

### file_13

- Size: 94912 bytes
- File: 20f1955819dc2b50d2d10788f73adc72bceb491a03ed608debb72a90bce65c50.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.052 | 1.085 | 1.104 |
| h2m-parser with readability | 5.290 | 5.717 | 5.928 |
| turndown | 4.880 | 5.884 | 6.008 |
| node html markdown | 3.222 | 3.452 | 3.485 |
| mdream | 1.518 | 1.577 | 1.588 |

### file_14

- Size: 67227 bytes
- File: 22c0f41ae560968de5e6b0ef9ecffffeae3f409aa73d9b82853f65535116f68f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.663 | 0.679 | 0.685 |
| h2m-parser with readability | 4.338 | 4.566 | 4.639 |
| turndown | 3.520 | 3.744 | 3.813 |
| node html markdown | 2.253 | 2.538 | 2.586 |
| mdream | 0.708 | 0.743 | 0.750 |

### file_15

- Size: 69850 bytes
- File: 22c3886e7116464c04c2332c20a013a5837992e7bcdb1f6cacd7d475f9784273.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.790 | 0.878 | 0.907 |
| h2m-parser with readability | 4.807 | 5.280 | 5.535 |
| turndown | 3.965 | 4.415 | 5.210 |
| node html markdown | 2.434 | 2.790 | 2.828 |
| mdream | 0.984 | 1.046 | 1.060 |

### file_16

- Size: 95103 bytes
- File: 22c4be85802e9602a344fc2cc704093362b9193523c6e35cfb7dc086c8ef8648.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.045 | 1.140 | 1.171 |
| h2m-parser with readability | 6.740 | 7.038 | 11.514 |
| turndown | 6.416 | 7.705 | 7.894 |
| node html markdown | 3.222 | 3.544 | 3.579 |
| mdream | 2.018 | 2.196 | 2.232 |

### file_17

- Size: 91296 bytes
- File: 26c3b98f33bb6902f32535235fd7d32792df87779bdf1f86c3b21e15fbf3161d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.079 | 1.177 | 1.203 |
| h2m-parser with readability | 6.760 | 7.288 | 14.177 |
| turndown | 5.416 | 5.804 | 7.018 |
| node html markdown | 3.030 | 3.339 | 3.396 |
| mdream | 0.511 | 0.543 | 0.550 |

### file_18

- Size: 74095 bytes
- File: 2dbf7cd4444617cc60f0e2d2c95b20a535979a32972f5005e2af577b37980e48.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.722 | 0.771 | 0.793 |
| h2m-parser with readability | 4.181 | 4.593 | 4.703 |
| turndown | 3.799 | 4.741 | 4.928 |
| node html markdown | 2.031 | 2.332 | 2.374 |
| mdream | 1.390 | 1.451 | 1.472 |

### file_19

- Size: 141461 bytes
- File: 2fd71e2969106342bab6862bb212ae16ba592b426dd4141da8a383b183aa3a37.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.590 | 1.667 | 1.703 |
| h2m-parser with readability | 10.983 | 18.955 | 19.296 |
| turndown | 7.960 | 9.469 | 9.616 |
| node html markdown | 6.203 | 6.644 | 6.722 |
| mdream | 1.408 | 1.461 | 1.481 |

### file_20

- Size: 78203 bytes
- File: 35f536ef8c8eba0616f2dc78e6653e1d7d68e3af927b09efad3dae7ce2080567.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.126 | 1.183 | 1.207 |
| h2m-parser with readability | 8.074 | 8.503 | 15.207 |
| turndown | 5.508 | 6.732 | 6.864 |
| node html markdown | 4.908 | 5.149 | 5.187 |
| mdream | 1.388 | 1.439 | 1.451 |

### file_21

- Size: 78530 bytes
- File: 3b27831099c75b36d5978864ec89575c675c963e949cda52147a044bbfa77559.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.903 | 0.939 | 0.953 |
| h2m-parser with readability | 5.585 | 6.111 | 6.431 |
| turndown | 5.352 | 6.753 | 7.035 |
| node html markdown | 3.614 | 3.856 | 3.889 |
| mdream | 1.099 | 1.157 | 1.168 |

### file_22

- Size: 50858 bytes
- File: 3f6413c32bffc73b64cb1a2adb237cd19ffc75494c9172755f1a961ba32e75dd.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.569 | 0.602 | 0.613 |
| h2m-parser with readability | 4.297 | 4.530 | 4.573 |
| turndown | 3.317 | 3.555 | 3.672 |
| node html markdown | 1.433 | 1.686 | 1.714 |
| mdream | 0.871 | 0.913 | 0.926 |

### file_23

- Size: 160633 bytes
- File: 40d4e50472a8f0d30d68613051be510ed098087679df7e0e564d6dd32152d679.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.250 | 1.348 | 1.368 |
| h2m-parser with readability | 9.802 | 16.379 | 16.962 |
| turndown | 7.033 | 9.127 | 9.317 |
| node html markdown | 3.519 | 3.819 | 3.854 |
| mdream | 0.673 | 0.708 | 0.716 |

### file_24

- Size: 184834 bytes
- File: 42b43887c6dd91353249924745e030eac3a6d818966d91c67b406431ff9bdf05.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.810 | 1.921 | 1.947 |
| h2m-parser with readability | 8.778 | 9.239 | 18.533 |
| turndown | 7.332 | 8.578 | 8.652 |
| node html markdown | 6.079 | 6.492 | 6.548 |
| mdream | 0.172 | 0.184 | 0.197 |

### file_25

- Size: 98648 bytes
- File: 44b21071ae6feede3c36d2ab032cd422eb0c6a0fdfe4da79531931ad93dd4940.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.944 | 0.999 | 1.012 |
| h2m-parser with readability | 7.164 | 7.481 | 11.556 |
| turndown | 4.975 | 5.472 | 6.514 |
| node html markdown | 2.501 | 2.808 | 2.842 |
| mdream | 0.983 | 1.029 | 1.037 |

### file_26

- Size: 85583 bytes
- File: 44f750fab67bb9f54f5b5cc90bc34d55cff06260a3e63245856a6e57fcda5906.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.142 | 1.210 | 1.225 |
| h2m-parser with readability | 6.280 | 6.627 | 6.916 |
| turndown | 5.506 | 6.925 | 7.051 |
| node html markdown | 5.926 | 6.136 | 6.172 |
| mdream | 1.760 | 1.843 | 1.863 |

### file_27

- Size: 65639 bytes
- File: 45b6063ac2016db7b2fb1f995f0b54ee054fb561022e169c8fdbe321dcf672db.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.996 | 1.055 | 1.075 |
| h2m-parser with readability | 5.053 | 5.389 | 5.524 |
| turndown | 4.434 | 4.738 | 6.094 |
| node html markdown | 4.581 | 4.919 | 4.980 |
| mdream | 1.448 | 1.514 | 1.527 |

### file_28

- Size: 53725 bytes
- File: 45efaba666da241d9d069b550890530b65f2a6b61a5e529e1d3664630d4897ee.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.644 | 0.687 | 0.701 |
| h2m-parser with readability | 3.766 | 4.042 | 4.086 |
| turndown | 3.147 | 3.366 | 3.473 |
| node html markdown | 1.568 | 1.873 | 1.907 |
| mdream | 0.992 | 1.041 | 1.049 |

### file_29

- Size: 88224 bytes
- File: 46ab324348ca339dba58238e193f794c3309e52c018a8156ef9aedfedf0572e7.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.929 | 0.977 | 0.994 |
| h2m-parser with readability | 11.540 | 16.591 | 16.864 |
| turndown | 4.791 | 5.949 | 6.066 |
| node html markdown | 2.929 | 3.220 | 3.244 |
| mdream | 0.316 | 0.334 | 0.339 |

### file_30

- Size: 52935 bytes
- File: 46ed10778ec7c1292e624e1a72a2a0899f8ab6d8d4db1aa57fa4418b8b7e0a5d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.626 | 0.658 | 0.672 |
| h2m-parser with readability | 3.685 | 3.963 | 4.017 |
| turndown | 2.900 | 3.121 | 3.236 |
| node html markdown | 2.014 | 2.295 | 2.325 |
| mdream | 0.838 | 0.879 | 0.887 |

### file_31

- Size: 166944 bytes
- File: 4b8debc51d3d9598ad4552cc7a591d200a6c7d545fed2454916bedbb0f666086.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.260 | 1.344 | 1.368 |
| h2m-parser with readability | 9.104 | 11.096 | 17.125 |
| turndown | 7.383 | 9.508 | 9.665 |
| node html markdown | 3.475 | 3.814 | 3.845 |
| mdream | 0.669 | 0.697 | 0.706 |

### file_32

- Size: 97808 bytes
- File: 4bf8e536214f987f4a0bf6ca7d233619d30bde1e80a816c78d00358eb61e353c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.098 | 1.179 | 1.205 |
| h2m-parser with readability | 7.572 | 8.423 | 16.123 |
| turndown | 6.514 | 7.777 | 7.902 |
| node html markdown | 3.487 | 3.753 | 3.789 |
| mdream | 2.052 | 2.143 | 2.163 |

### file_33

- Size: 90241 bytes
- File: 4e0e399d24fe145def4817facccb0ff79e305dedb9ece5f8ec66396ea378f723.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.983 | 1.059 | 1.081 |
| h2m-parser with readability | 6.108 | 6.673 | 8.701 |
| turndown | 5.762 | 6.988 | 7.064 |
| node html markdown | 2.975 | 3.206 | 3.241 |
| mdream | 1.877 | 1.965 | 1.985 |

### file_34

- Size: 166420 bytes
- File: 4f454cb97e9b77d94c10ed8a6a35cd2eff1671de9d3d27852a38abd76a95be83.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.684 | 1.785 | 1.832 |
| h2m-parser with readability | 8.245 | 9.083 | 17.790 |
| turndown | 7.245 | 8.674 | 8.855 |
| node html markdown | 6.277 | 6.735 | 6.813 |
| mdream | 0.164 | 0.178 | 0.186 |

### file_35

- Size: 68778 bytes
- File: 4f83531b9fc91fd1e0062e43200669cd82cc36a518caa7f66fc6ba5be4ac545b.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.609 | 0.670 | 0.694 |
| h2m-parser with readability | 3.559 | 3.843 | 3.902 |
| turndown | 3.526 | 3.912 | 4.763 |
| node html markdown | 1.539 | 1.849 | 1.924 |
| mdream | 0.921 | 1.043 | 1.162 |

### file_36

- Size: 167544 bytes
- File: 4fe5472ba89db38e20daef6025108310c52121fd382c06314d5b33d7f47c1e94.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.140 | 2.278 | 2.310 |
| h2m-parser with readability | 16.883 | 24.782 | 24.955 |
| turndown | 11.124 | 12.954 | 13.093 |
| node html markdown | 10.528 | 11.112 | 11.266 |
| mdream | 0.418 | 0.466 | 0.480 |

### file_37

- Size: 84444 bytes
- File: 5a012f66c2bf0c70a0744c7483478aaa0c1a2b5b5920a72223f3a090e39df8be.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.492 | 1.706 | 1.814 |
| h2m-parser with readability | 7.804 | 8.679 | 14.014 |
| turndown | 6.762 | 7.933 | 8.148 |
| node html markdown | 7.350 | 7.797 | 7.864 |
| mdream | 1.816 | 1.941 | 1.970 |

### file_38

- Size: 69828 bytes
- File: 5bc9df3a36efb57a22edf862cec6a28eb112e535559c194d7976fb664c922c13.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.899 | 0.977 | 0.993 |
| h2m-parser with readability | 8.862 | 12.443 | 15.469 |
| turndown | 5.151 | 6.040 | 6.452 |
| node html markdown | 2.524 | 2.806 | 2.846 |
| mdream | 1.329 | 1.421 | 1.434 |

### file_39

- Size: 66504 bytes
- File: 5c83c2d71f97e2b5a979f197fbae6773dee6844e28889ae66ccb8d7458a9c5bb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.945 | 1.025 | 1.041 |
| h2m-parser with readability | 5.586 | 6.035 | 6.990 |
| turndown | 4.449 | 4.951 | 5.878 |
| node html markdown | 3.114 | 3.443 | 3.491 |
| mdream | 1.299 | 1.394 | 1.407 |

### file_40

- Size: 76713 bytes
- File: 5de3db78f95172797a51b3b3b2cdc4caeb63a4d7b709e4441510d2c1967e0e6f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.721 | 0.807 | 0.822 |
| h2m-parser with readability | 10.003 | 15.604 | 16.289 |
| turndown | 4.138 | 4.768 | 5.530 |
| node html markdown | 2.110 | 2.432 | 2.463 |
| mdream | 0.321 | 0.344 | 0.351 |

### file_41

- Size: 157066 bytes
- File: 5f081a0a9d1a1ce3b0e53603ecd8bde78947841c8fd1ff3c36efa95ee84681f6.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.602 | 1.743 | 1.772 |
| h2m-parser with readability | 9.810 | 14.858 | 18.776 |
| turndown | 7.950 | 9.540 | 9.740 |
| node html markdown | 5.319 | 5.666 | 5.716 |
| mdream | 1.045 | 1.083 | 1.098 |

### file_42

- Size: 21734 bytes
- File: 5f8b89390d3fc01c6a80728ba2aee597fea1dbfc8399d61015956db71e5336c7.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.246 | 0.259 | 0.264 |
| h2m-parser with readability | 1.798 | 1.907 | 1.935 |
| turndown | 1.362 | 1.444 | 1.475 |
| node html markdown | 0.396 | 0.414 | 0.422 |
| mdream | 0.345 | 0.361 | 0.365 |

### file_43

- Size: 91883 bytes
- File: 5f8c9f60be2250f694094ee1ca5deb9df10479e29fc92ff07c77c4cb9d2c3f21.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.147 | 1.197 | 1.211 |
| h2m-parser with readability | 7.416 | 8.289 | 14.985 |
| turndown | 5.536 | 7.004 | 7.151 |
| node html markdown | 3.990 | 4.265 | 4.297 |
| mdream | 1.237 | 1.290 | 1.301 |

### file_44

- Size: 124858 bytes
- File: 5fbfe3905c71925b1b3a875a3111073e5d0996d3f250a697398477d3642db321.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.172 | 1.274 | 1.309 |
| h2m-parser with readability | 6.793 | 7.276 | 10.931 |
| turndown | 5.159 | 6.321 | 6.508 |
| node html markdown | 4.444 | 4.820 | 4.879 |
| mdream | 0.504 | 0.537 | 0.546 |

### file_45

- Size: 185748 bytes
- File: 60b8aff17382f2fd02584645ef66e517b41f764d5b4ca404c1ceff3fe22bdda8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.674 | 1.810 | 1.836 |
| h2m-parser with readability | 11.459 | 19.749 | 20.366 |
| turndown | 8.681 | 10.498 | 10.639 |
| node html markdown | 6.156 | 6.667 | 6.768 |
| mdream | 0.361 | 0.382 | 0.389 |

### file_46

- Size: 172926 bytes
- File: 60bccec4069d54a6889bfcda785c0f3066a70cb5fadeea81f28d371681a2dee8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.374 | 2.535 | 2.570 |
| h2m-parser with readability | 13.478 | 21.158 | 21.388 |
| turndown | 13.981 | 15.155 | 15.286 |
| node html markdown | 7.577 | 8.017 | 8.102 |
| mdream | 3.076 | 3.236 | 3.261 |

### file_47

- Size: 42840 bytes
- File: 60cc80fb25f0b2ebdb2e6835ab7bfd3d26362971e39fe8838e7ac548ba323cf0.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.468 | 0.514 | 0.532 |
| h2m-parser with readability | 3.277 | 3.568 | 3.624 |
| turndown | 2.168 | 2.283 | 2.326 |
| node html markdown | 0.636 | 0.672 | 0.694 |
| mdream | 0.625 | 0.656 | 0.668 |

### file_48

- Size: 137969 bytes
- File: 61adb9c208d9c67253b4413ef7ec2d010edae448b8c832bff2254125e4b51d5f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.984 | 1.058 | 1.081 |
| h2m-parser with readability | 10.188 | 18.508 | 18.916 |
| turndown | 5.855 | 7.541 | 7.654 |
| node html markdown | 3.175 | 3.402 | 3.434 |
| mdream | 1.406 | 1.478 | 1.493 |

### file_49

- Size: 120011 bytes
- File: 61d8052b19ed9885651ed1110ddcccc001f9ec2e3b7a77926d350762bcd02400.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.072 | 1.121 | 1.144 |
| h2m-parser with readability | 7.200 | 7.555 | 14.376 |
| turndown | 4.762 | 5.997 | 6.111 |
| node html markdown | 3.784 | 3.974 | 4.004 |
| mdream | 0.484 | 0.510 | 0.516 |

### file_50

- Size: 66809 bytes
- File: 63c6d5256b8ce1098b5688eb5fafa747e9467692d099a3e9e42246e7af29748f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.736 | 0.810 | 0.833 |
| h2m-parser with readability | 4.589 | 4.865 | 4.949 |
| turndown | 3.852 | 4.160 | 5.037 |
| node html markdown | 1.705 | 2.009 | 2.064 |
| mdream | 0.646 | 0.678 | 0.690 |

### file_51

- Size: 82725 bytes
- File: 64bf40da8348d808ef103cc5529fd268fec46fbefa40b486d288d2a07871a527.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.854 | 0.932 | 0.961 |
| h2m-parser with readability | 4.665 | 5.055 | 5.173 |
| turndown | 4.779 | 5.894 | 6.118 |
| node html markdown | 2.370 | 2.615 | 2.640 |
| mdream | 0.720 | 0.764 | 0.769 |

### file_52

- Size: 46587 bytes
- File: 6a59bd96489c98226c72f0245bac98a4b09aa0516ebfe4982233a6c33d129691.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.556 | 0.580 | 0.590 |
| h2m-parser with readability | 3.763 | 4.025 | 4.096 |
| turndown | 2.716 | 2.991 | 3.068 |
| node html markdown | 1.709 | 1.996 | 2.037 |
| mdream | 0.804 | 0.860 | 0.874 |

### file_53

- Size: 59176 bytes
- File: 6b095375a53dfc7994a032e2efac70f43a4fac9303d549256d88b8f7cecadd50.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.596 | 0.651 | 0.666 |
| h2m-parser with readability | 4.465 | 4.766 | 4.861 |
| turndown | 2.850 | 3.357 | 3.819 |
| node html markdown | 1.256 | 1.512 | 1.553 |
| mdream | 0.237 | 0.252 | 0.260 |

### file_54

- Size: 227057 bytes
- File: 6b817bedb8d6402bab160ed6d2b99256163bd3aef20deae3015f74e5bb253e55.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.306 | 1.422 | 1.458 |
| h2m-parser with readability | 9.901 | 16.892 | 17.726 |
| turndown | 8.539 | 11.615 | 11.862 |
| node html markdown | 3.441 | 3.802 | 3.836 |
| mdream | 0.684 | 0.710 | 0.717 |

### file_55

- Size: 75425 bytes
- File: 6d30abed88489774017024b17cdb1928d9a2b45bb79767515383b8444e9601b2.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.815 | 0.853 | 0.868 |
| h2m-parser with readability | 2.555 | 2.749 | 2.801 |
| turndown | 3.528 | 3.822 | 4.652 |
| node html markdown | 3.392 | 3.592 | 3.618 |
| mdream | 1.362 | 1.422 | 1.435 |

### file_56

- Size: 123582 bytes
- File: 71bf3c23c5d3fff9cec67606fde6547c8866ae8aa95f5991651d94c68df4ad1d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.479 | 1.584 | 1.614 |
| h2m-parser with readability | 8.606 | 12.417 | 15.683 |
| turndown | 6.452 | 7.812 | 7.872 |
| node html markdown | 5.111 | 5.446 | 5.514 |
| mdream | 1.211 | 1.253 | 1.263 |

### file_57

- Size: 90590 bytes
- File: 71cb773c42c94b75d41c059a27dd10b763443a71dbb6dd202402843de8a5e331.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.795 | 0.831 | 0.851 |
| h2m-parser with readability | 5.620 | 5.981 | 7.036 |
| turndown | 4.083 | 5.063 | 5.140 |
| node html markdown | 2.068 | 2.277 | 2.312 |
| mdream | 1.034 | 1.077 | 1.087 |

### file_58

- Size: 139105 bytes
- File: 72e78dee157bdf3e8a9a9f07e54a98a3714ea2998e2c2e2a94c46dbe92176feb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.039 | 2.132 | 2.173 |
| h2m-parser with readability | 9.720 | 14.339 | 18.333 |
| turndown | 6.103 | 8.153 | 8.242 |
| node html markdown | 11.017 | 11.661 | 11.797 |
| mdream | 1.289 | 1.402 | 1.428 |

### file_59

- Size: 99162 bytes
- File: 72ecfb3f60f4e8a6103916f2041ce9a55c4ef1e31477f9a8ffb7f4d3bba8c559.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.417 | 1.526 | 1.551 |
| h2m-parser with readability | 14.765 | 20.776 | 21.076 |
| turndown | 8.333 | 9.190 | 9.265 |
| node html markdown | 6.568 | 6.941 | 7.012 |
| mdream | 0.180 | 0.184 | 0.184 |

### file_60

- Size: 100264 bytes
- File: 73c175cdf9d5e065351ecf2220510088904adb77b49211cdd99e43e5870e06c2.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.045 | 1.076 | 1.087 |
| h2m-parser with readability | 13.434 | 16.814 | 17.085 |
| turndown | 4.184 | 4.643 | 5.669 |
| node html markdown | 2.432 | 2.684 | 2.701 |
| mdream | 1.363 | 1.411 | 1.422 |

### file_61

- Size: 388826 bytes
- File: 74e8bc94abea7c60f022d8d3f672f80e59e3e126735fae0b5ee5914ff2fce48e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 4.507 | 4.746 | 4.806 |
| h2m-parser with readability | 25.523 | 33.403 | 33.726 |
| turndown | 30.395 | 31.798 | 32.006 |
| node html markdown | 15.394 | 16.088 | 16.320 |
| mdream | 6.672 | 6.940 | 7.012 |

### file_62

- Size: 41388 bytes
- File: 7a426de207434e419a65eead0f4b46c8a479429d8429c36dc03b033d7e4891df.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.450 | 0.476 | 0.493 |
| h2m-parser with readability | 4.062 | 4.373 | 4.455 |
| turndown | 2.776 | 3.042 | 3.181 |
| node html markdown | 0.816 | 0.930 | 1.004 |
| mdream | 0.066 | 0.071 | 0.071 |

### file_63

- Size: 180017 bytes
- File: 7b7ffca82db8f721d6e5a8e4e65e60885af5eee4b9f28beb6b8363bb70c820f9.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.286 | 2.416 | 2.456 |
| h2m-parser with readability | 10.764 | 19.670 | 20.054 |
| turndown | 11.082 | 12.939 | 13.067 |
| node html markdown | 11.172 | 11.639 | 11.733 |
| mdream | 0.040 | 0.044 | 0.045 |

### file_64

- Size: 89817 bytes
- File: 7e26f2e426fef3c1a370382e7827ef2e530a2ff0c2cea7641ebb596a4a1b8008.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.938 | 0.984 | 0.999 |
| h2m-parser with readability | 5.902 | 6.333 | 6.754 |
| turndown | 5.748 | 7.014 | 7.086 |
| node html markdown | 2.766 | 3.031 | 3.059 |
| mdream | 1.800 | 1.860 | 1.872 |

### file_65

- Size: 103236 bytes
- File: 7e2d19ccbb3b4029dddf26557555278babdac18bb78a742052fd946001c28e4e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.456 | 1.529 | 1.555 |
| h2m-parser with readability | 14.602 | 20.403 | 20.660 |
| turndown | 8.299 | 9.073 | 9.112 |
| node html markdown | 6.582 | 6.795 | 6.853 |
| mdream | 2.152 | 2.216 | 2.237 |

### file_66

- Size: 78718 bytes
- File: 7e54e701ac39a9046d6eeb0ae75d2138733b66b30b5211e7f3245dd6dc3ca36c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.776 | 0.810 | 0.823 |
| h2m-parser with readability | 9.222 | 12.103 | 14.675 |
| turndown | 4.103 | 4.534 | 5.333 |
| node html markdown | 2.268 | 2.509 | 2.543 |
| mdream | 0.312 | 0.330 | 0.336 |

### file_67

- Size: 65198 bytes
- File: 7e91eb56692c91312a3dc3e7b769a2916029ef3d9e431d056d5f548c0f771d16.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.729 | 0.773 | 0.789 |
| h2m-parser with readability | 4.679 | 5.017 | 5.160 |
| turndown | 3.332 | 3.645 | 4.442 |
| node html markdown | 2.186 | 2.443 | 2.481 |
| mdream | 1.035 | 1.092 | 1.104 |

### file_68

- Size: 83251 bytes
- File: 7fc58a2d32d5b8d5fa9b918453a284acc71703ccfa0f0c89ec292b4245fd0521.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.955 | 0.999 | 1.018 |
| h2m-parser with readability | 5.186 | 5.674 | 5.886 |
| turndown | 7.485 | 8.816 | 8.886 |
| node html markdown | 3.551 | 3.814 | 3.848 |
| mdream | 1.364 | 1.417 | 1.426 |

### file_69

- Size: 66855 bytes
- File: 81d304541f62a6aaf29494766718ab8e58e95a8e784613e75f106cdef17868d6.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.790 | 0.827 | 0.845 |
| h2m-parser with readability | 5.258 | 5.681 | 5.878 |
| turndown | 3.699 | 3.912 | 4.773 |
| node html markdown | 2.417 | 2.627 | 2.649 |
| mdream | 1.070 | 1.109 | 1.117 |

### file_70

- Size: 42437 bytes
- File: 83c362b1373f55d45fdad0edee4d2885cafd0da3f2afb146cf2822448c3c4104.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.460 | 0.481 | 0.490 |
| h2m-parser with readability | 3.057 | 3.239 | 3.286 |
| turndown | 2.152 | 2.335 | 2.376 |
| node html markdown | 0.621 | 0.656 | 0.665 |
| mdream | 0.641 | 0.664 | 0.673 |

### file_71

- Size: 126437 bytes
- File: 84a7e7d5f61c90050a326bb74ac3a57899fdba4b755bd50df01a053c262d354e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.431 | 1.538 | 1.567 |
| h2m-parser with readability | 14.726 | 19.380 | 19.564 |
| turndown | 6.460 | 7.882 | 8.010 |
| node html markdown | 3.363 | 3.691 | 3.742 |
| mdream | 1.307 | 1.378 | 1.395 |

### file_72

- Size: 95344 bytes
- File: 8a1eb64f950f2f43097577c244fb38a35660f50a88c4305b23a8f24f254da8cb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.055 | 1.111 | 1.135 |
| h2m-parser with readability | 6.849 | 7.247 | 14.963 |
| turndown | 6.150 | 7.408 | 7.480 |
| node html markdown | 3.276 | 3.460 | 3.484 |
| mdream | 1.922 | 1.989 | 2.001 |

### file_73

- Size: 79924 bytes
- File: 8a701b6ec1c56e2c37357030da0b4b10af4187f069a988e12c2f91d2ba40cdc1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.732 | 0.747 | 0.752 |
| h2m-parser with readability | 7.423 | 7.942 | 11.642 |
| turndown | 3.256 | 3.552 | 3.689 |
| node html markdown | 1.411 | 1.519 | 1.585 |
| mdream | 1.054 | 1.122 | 1.134 |

### file_74

- Size: 167983 bytes
- File: 8a82ce22fec5e3656dad3d55e585727c88c94808ad92e37a0f6e99dcb3888800.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.150 | 2.337 | 2.374 |
| h2m-parser with readability | 13.513 | 21.623 | 21.879 |
| turndown | 10.437 | 12.501 | 12.616 |
| node html markdown | 10.786 | 11.105 | 11.183 |
| mdream | 0.042 | 0.046 | 0.047 |

### file_75

- Size: 101361 bytes
- File: 8a9d17a1e5b1866abc7b9263fabbc428e5299c7443ecad6cc56c0076287fe11a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.786 | 0.836 | 0.852 |
| h2m-parser with readability | 3.524 | 3.814 | 3.870 |
| turndown | 3.183 | 3.421 | 3.499 |
| node html markdown | 1.933 | 2.314 | 2.369 |
| mdream | 1.307 | 1.408 | 1.430 |

### file_76

- Size: 32087 bytes
- File: 8bd6d9bcba689408767f770d69f12b59c3f092e73cffcc9332261fbab4aa16e1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.292 | 0.321 | 0.332 |
| h2m-parser with readability | 2.378 | 2.645 | 2.707 |
| turndown | 1.650 | 1.809 | 1.833 |
| node html markdown | 0.407 | 0.454 | 0.470 |
| mdream | 0.445 | 0.477 | 0.488 |

### file_77

- Size: 80418 bytes
- File: 8c0dd0456453aeff3f66d053710f18adc1a2fc0f1f3a0c95a3e166e41ffb737d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.784 | 0.840 | 0.855 |
| h2m-parser with readability | 7.763 | 8.096 | 14.254 |
| turndown | 4.431 | 5.539 | 5.845 |
| node html markdown | 2.448 | 2.843 | 2.879 |
| mdream | 0.296 | 0.321 | 0.331 |

### file_78

- Size: 171100 bytes
- File: 8c1a780dec8c1a5ea0344514524f53b2b580ce87083e0a756ade3d83627d5653.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.167 | 2.343 | 2.379 |
| h2m-parser with readability | 10.188 | 19.891 | 20.467 |
| turndown | 10.540 | 12.641 | 12.756 |
| node html markdown | 11.125 | 11.461 | 11.527 |
| mdream | 0.044 | 0.048 | 0.049 |

### file_79

- Size: 152242 bytes
- File: 8cbf3b144736ffc4adda5fe7105e7fd1413dcc1955110829d849a658aa722bea.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.594 | 1.753 | 1.780 |
| h2m-parser with readability | 7.589 | 8.074 | 15.680 |
| turndown | 6.435 | 7.489 | 7.628 |
| node html markdown | 5.448 | 5.803 | 5.878 |
| mdream | 2.414 | 2.566 | 2.597 |

### file_80

- Size: 69248 bytes
- File: 8cfa9d30e2b66b991461423012906121661cd9c8809f564eabb660149577864d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.621 | 0.696 | 0.717 |
| h2m-parser with readability | 4.008 | 4.691 | 4.927 |
| turndown | 3.521 | 3.841 | 4.608 |
| node html markdown | 1.572 | 1.934 | 1.985 |
| mdream | 0.929 | 1.006 | 1.020 |

### file_81

- Size: 100091 bytes
- File: 8d612a03fa42a2fb014b59534c46c9590da90fbeb91ac50938cdfa36dd274e23.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.445 | 1.566 | 1.601 |
| h2m-parser with readability | 15.237 | 21.982 | 22.280 |
| turndown | 8.696 | 9.690 | 9.755 |
| node html markdown | 7.168 | 7.467 | 7.515 |
| mdream | 2.199 | 2.331 | 2.361 |

### file_82

- Size: 158892 bytes
- File: 8faa3156452fa9d0667617c406eb9b6458b48d7b8c36cf2bf804fba290b302f5.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.597 | 1.719 | 1.752 |
| h2m-parser with readability | 7.824 | 8.528 | 16.248 |
| turndown | 6.875 | 7.950 | 8.054 |
| node html markdown | 5.346 | 5.602 | 5.672 |
| mdream | 2.471 | 2.574 | 2.594 |

### file_83

- Size: 37644 bytes
- File: 9c947bc9fbcb4e2eb0296d858fe193f580e869db7869358af822d7d2d4c0388e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.572 | 0.608 | 0.618 |
| h2m-parser with readability | 3.451 | 3.695 | 3.749 |
| turndown | 2.247 | 2.409 | 2.462 |
| node html markdown | 2.002 | 2.280 | 2.317 |
| mdream | 0.673 | 0.714 | 0.725 |

### file_84

- Size: 81258 bytes
- File: 9e04cb267a9b128369a11c7f6e5486d43644955dee7f73cc004b9cf1693a11c1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.821 | 0.877 | 0.893 |
| h2m-parser with readability | 10.130 | 15.727 | 16.161 |
| turndown | 4.402 | 5.261 | 5.695 |
| node html markdown | 2.571 | 2.918 | 2.949 |
| mdream | 0.318 | 0.339 | 0.347 |

### file_85

- Size: 82762 bytes
- File: 9e3c6d40690c1302613f203db178b23f9f18494d2653a1b547086a3973fff93c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.853 | 0.911 | 0.931 |
| h2m-parser with readability | 7.153 | 7.499 | 14.020 |
| turndown | 4.519 | 5.520 | 5.784 |
| node html markdown | 2.699 | 3.105 | 3.167 |
| mdream | 0.314 | 0.343 | 0.351 |

### file_86

- Size: 141136 bytes
- File: 9f2031ee45a11919452ca2efbc3498672324cda5f76314d7ea10913f63cf3545.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.388 | 1.526 | 1.556 |
| h2m-parser with readability | 6.714 | 7.872 | 15.071 |
| turndown | 5.885 | 7.061 | 7.344 |
| node html markdown | 4.197 | 4.465 | 4.512 |
| mdream | 0.154 | 0.166 | 0.172 |

### file_87

- Size: 80201 bytes
- File: 9fba51a14308353194c537f494ded0ccb27d9f908f252690b083d48db64ea15a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.788 | 0.868 | 0.888 |
| h2m-parser with readability | 7.705 | 8.122 | 13.982 |
| turndown | 4.389 | 5.234 | 5.786 |
| node html markdown | 2.526 | 3.024 | 3.139 |
| mdream | 0.301 | 0.333 | 0.340 |

### file_88

- Size: 429661 bytes
- File: github-markdown-complete.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 3.002 | 3.292 | 3.375 |
| h2m-parser with readability | 30.321 | 34.749 | 35.263 |
| turndown | 13.106 | 14.789 | 14.968 |
| node html markdown | 7.384 | 7.854 | 7.921 |
| mdream | 8.668 | 9.064 | 9.142 |

### file_89

- Size: 128 bytes
- File: simple.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.005 | 0.005 | 0.005 |
| h2m-parser with readability | 0.014 | 0.017 | 0.018 |
| turndown | 0.007 | 0.008 | 0.008 |
| node html markdown | 0.004 | 0.004 | 0.004 |
| mdream | 0.003 | 0.003 | 0.003 |

### file_90

- Size: 865 bytes
- File: test-origin.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.021 | 0.022 | 0.023 |
| h2m-parser with readability | 0.426 | 0.470 | 0.482 |
| turndown | 0.105 | 0.116 | 0.122 |
| node html markdown | 0.053 | 0.056 | 0.058 |
| mdream | 0.031 | 0.033 | 0.035 |

### file_91

- Size: 166054 bytes
- File: wikipedia-small.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.024 | 2.143 | 2.175 |
| h2m-parser with readability | 19.059 | 25.095 | 25.482 |
| turndown | 9.318 | 10.607 | 10.727 |
| node html markdown | 9.012 | 9.589 | 9.742 |
| mdream | 2.871 | 2.994 | 3.043 |

