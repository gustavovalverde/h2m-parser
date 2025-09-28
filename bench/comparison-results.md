# h2m-parser Benchmark Results

Generated: 2025-09-28T17:49:57.465Z

## Test Configuration

- Iterations: 100
- Dataset: tests/fixtures
- Readability tested: Yes

## Results by File

### tiny

- Size: 18 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.013 | 0.026 | 0.029 |
| h2m-parser with readability | 0.211 | 0.323 | 0.346 |
| turndown | 0.024 | 0.045 | 0.054 |
| node html markdown | 0.012 | 0.018 | 0.022 |
| mdream | 0.005 | 0.008 | 0.011 |

### small

- Size: 84 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.016 | 0.023 | 0.024 |
| h2m-parser with readability | 0.174 | 0.209 | 0.211 |
| turndown | 0.041 | 0.051 | 0.058 |
| node html markdown | 0.021 | 0.028 | 0.028 |
| mdream | 0.014 | 0.020 | 0.021 |

### medium

- Size: 369 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.013 | 0.015 | 0.016 |
| h2m-parser with readability | 0.220 | 0.249 | 0.276 |
| turndown | 0.046 | 0.053 | 0.054 |
| node html markdown | 0.018 | 0.019 | 0.020 |
| mdream | 0.020 | 0.038 | 0.038 |

### file_1

- Size: 89721 bytes
- File: 039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.124 | 1.247 | 1.280 |
| h2m-parser with readability | 6.525 | 7.520 | 11.307 |
| turndown | 6.038 | 7.720 | 7.744 |
| node html markdown | 3.206 | 3.656 | 3.700 |
| mdream | 1.728 | 1.878 | 1.923 |

### file_2

- Size: 70337 bytes
- File: 06ed0a833361190536a4f61888354e07dccaa501bd9a1c0f1c545533bde1650b.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.793 | 0.868 | 0.887 |
| h2m-parser with readability | 5.181 | 5.528 | 5.816 |
| turndown | 4.442 | 4.985 | 5.985 |
| node html markdown | 2.152 | 2.492 | 2.533 |
| mdream | 0.193 | 0.416 | 0.421 |

### file_3

- Size: 160839 bytes
- File: 078cdb456d1beb698aeed86e0f2161e442e9431c4580295f1ba4ece22741068c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.560 | 1.666 | 1.685 |
| h2m-parser with readability | 12.730 | 17.491 | 17.999 |
| turndown | 9.288 | 11.522 | 11.644 |
| node html markdown | 4.085 | 4.227 | 4.244 |
| mdream | 0.259 | 0.275 | 0.278 |

### file_4

- Size: 99724 bytes
- File: 0a8c510c3691d8e68ccc749559680257a382fe792a3d4d8531fb285cd74c3492.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.982 | 1.091 | 1.099 |
| h2m-parser with readability | 6.315 | 6.671 | 7.330 |
| turndown | 4.620 | 5.302 | 5.867 |
| node html markdown | 2.419 | 2.696 | 2.731 |
| mdream | 1.038 | 1.105 | 1.147 |

### file_5

- Size: 105057 bytes
- File: 0e55dcdbeb54c88ee87942b9fef7ea5398fa9a1e83493d55844b479506a80fd8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.334 | 1.463 | 1.485 |
| h2m-parser with readability | 7.886 | 11.046 | 13.794 |
| turndown | 6.545 | 8.022 | 8.077 |
| node html markdown | 3.414 | 3.678 | 3.700 |
| mdream | 0.531 | 0.615 | 0.639 |

### file_6

- Size: 94725 bytes
- File: 17ca85324662023ba21666b3ca5d5d37a92b2806bf7a88b906c28b90a635f82a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.381 | 1.526 | 1.546 |
| h2m-parser with readability | 7.496 | 7.859 | 13.290 |
| turndown | 8.250 | 9.653 | 9.749 |
| node html markdown | 4.675 | 5.015 | 5.055 |
| mdream | 1.203 | 1.288 | 1.304 |

### file_7

- Size: 62759 bytes
- File: 19fe8f574b7420277862728929d83dd74d7aa9c742688ca4c386b75693547bd3.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.893 | 0.983 | 0.998 |
| h2m-parser with readability | 5.161 | 5.459 | 5.531 |
| turndown | 4.243 | 4.542 | 5.464 |
| node html markdown | 2.221 | 2.477 | 2.514 |
| mdream | 0.520 | 0.600 | 0.609 |

### file_8

- Size: 41355 bytes
- File: 1a2c2f9fe410c836bb94e85c85625dbe8174f6e57f0b0316644cefd30979f096.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.487 | 0.543 | 0.559 |
| h2m-parser with readability | 3.295 | 3.531 | 3.568 |
| turndown | 2.158 | 2.280 | 2.321 |
| node html markdown | 0.604 | 0.705 | 0.727 |
| mdream | 0.617 | 0.660 | 0.672 |

### file_9

- Size: 61437 bytes
- File: 1bbc7f62e80e44afd533e896c0168c3b18f1e934530d05cb1f579ad3347d135c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.752 | 0.828 | 0.855 |
| h2m-parser with readability | 4.958 | 5.296 | 5.358 |
| turndown | 3.395 | 3.849 | 4.059 |
| node html markdown | 1.986 | 2.192 | 2.244 |
| mdream | 1.054 | 1.135 | 1.151 |

### file_10

- Size: 177823 bytes
- File: 1d43b4816bdba5825165dc21558d9eafb9f650c67ba048411b04dc77a745dc39.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.999 | 1.084 | 1.098 |
| h2m-parser with readability | 6.635 | 6.949 | 7.099 |
| turndown | 7.723 | 9.897 | 10.049 |
| node html markdown | 2.737 | 3.029 | 3.076 |
| mdream | 0.018 | 0.018 | 0.019 |

### file_11

- Size: 139469 bytes
- File: 1de0efed4d661163ff8414e8ca69f45a49efd7edca19dc896ca0983a4bf41485.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.718 | 1.847 | 1.861 |
| h2m-parser with readability | 21.486 | 27.662 | 27.941 |
| turndown | 9.332 | 11.001 | 11.158 |
| node html markdown | 6.607 | 6.938 | 6.967 |
| mdream | 0.143 | 0.159 | 0.160 |

### file_12

- Size: 48447 bytes
- File: 1e62a223bca12adda6410b1789072a2ad755566bd4a6bc17d10dc95a51d74d65.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.550 | 0.617 | 0.640 |
| h2m-parser with readability | 3.253 | 3.539 | 3.571 |
| turndown | 2.546 | 2.875 | 2.897 |
| node html markdown | 1.077 | 1.183 | 1.291 |
| mdream | 0.687 | 0.729 | 0.748 |

### file_13

- Size: 94912 bytes
- File: 20f1955819dc2b50d2d10788f73adc72bceb491a03ed608debb72a90bce65c50.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.179 | 1.271 | 1.312 |
| h2m-parser with readability | 5.413 | 5.673 | 5.809 |
| turndown | 4.923 | 5.928 | 6.061 |
| node html markdown | 3.370 | 3.628 | 3.650 |
| mdream | 1.592 | 1.705 | 1.727 |

### file_14

- Size: 67227 bytes
- File: 22c0f41ae560968de5e6b0ef9ecffffeae3f409aa73d9b82853f65535116f68f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.716 | 0.785 | 0.801 |
| h2m-parser with readability | 4.340 | 4.653 | 4.667 |
| turndown | 3.547 | 3.748 | 4.022 |
| node html markdown | 2.265 | 2.531 | 2.538 |
| mdream | 0.729 | 0.833 | 0.864 |

### file_15

- Size: 69850 bytes
- File: 22c3886e7116464c04c2332c20a013a5837992e7bcdb1f6cacd7d475f9784273.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.893 | 0.991 | 1.000 |
| h2m-parser with readability | 4.679 | 4.926 | 5.050 |
| turndown | 3.831 | 4.053 | 5.060 |
| node html markdown | 2.378 | 2.690 | 2.701 |
| mdream | 1.001 | 1.065 | 1.089 |

### file_16

- Size: 95103 bytes
- File: 22c4be85802e9602a344fc2cc704093362b9193523c6e35cfb7dc086c8ef8648.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.089 | 1.188 | 1.204 |
| h2m-parser with readability | 6.688 | 7.089 | 10.222 |
| turndown | 6.189 | 7.429 | 7.560 |
| node html markdown | 3.167 | 3.613 | 3.641 |
| mdream | 2.002 | 2.118 | 2.121 |

### file_17

- Size: 91296 bytes
- File: 26c3b98f33bb6902f32535235fd7d32792df87779bdf1f86c3b21e15fbf3161d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.170 | 1.260 | 1.274 |
| h2m-parser with readability | 6.517 | 6.850 | 7.272 |
| turndown | 5.581 | 6.926 | 7.213 |
| node html markdown | 2.996 | 3.245 | 3.263 |
| mdream | 0.529 | 0.618 | 0.659 |

### file_18

- Size: 74095 bytes
- File: 2dbf7cd4444617cc60f0e2d2c95b20a535979a32972f5005e2af577b37980e48.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.814 | 0.905 | 0.940 |
| h2m-parser with readability | 4.167 | 4.433 | 4.491 |
| turndown | 3.699 | 3.981 | 4.777 |
| node html markdown | 2.066 | 2.421 | 2.435 |
| mdream | 1.430 | 1.490 | 1.491 |

### file_19

- Size: 141461 bytes
- File: 2fd71e2969106342bab6862bb212ae16ba592b426dd4141da8a383b183aa3a37.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.771 | 1.922 | 1.935 |
| h2m-parser with readability | 10.855 | 17.454 | 18.292 |
| turndown | 8.280 | 9.766 | 9.866 |
| node html markdown | 6.354 | 6.682 | 6.714 |
| mdream | 1.464 | 1.529 | 1.560 |

### file_20

- Size: 78203 bytes
- File: 35f536ef8c8eba0616f2dc78e6653e1d7d68e3af927b09efad3dae7ce2080567.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.237 | 1.363 | 1.376 |
| h2m-parser with readability | 7.852 | 8.375 | 11.693 |
| turndown | 5.491 | 6.750 | 6.929 |
| node html markdown | 4.807 | 4.937 | 4.953 |
| mdream | 1.415 | 1.510 | 1.526 |

### file_21

- Size: 78530 bytes
- File: 3b27831099c75b36d5978864ec89575c675c963e949cda52147a044bbfa77559.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.966 | 1.063 | 1.091 |
| h2m-parser with readability | 5.602 | 5.897 | 6.030 |
| turndown | 5.672 | 7.343 | 7.643 |
| node html markdown | 3.685 | 3.876 | 3.905 |
| mdream | 1.109 | 1.203 | 1.221 |

### file_22

- Size: 50858 bytes
- File: 3f6413c32bffc73b64cb1a2adb237cd19ffc75494c9172755f1a961ba32e75dd.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.646 | 0.713 | 0.724 |
| h2m-parser with readability | 4.220 | 4.448 | 4.548 |
| turndown | 3.354 | 3.618 | 3.714 |
| node html markdown | 1.502 | 1.784 | 1.802 |
| mdream | 0.894 | 0.960 | 0.971 |

### file_23

- Size: 160633 bytes
- File: 40d4e50472a8f0d30d68613051be510ed098087679df7e0e564d6dd32152d679.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.264 | 1.358 | 1.374 |
| h2m-parser with readability | 9.703 | 13.034 | 15.485 |
| turndown | 6.965 | 9.013 | 9.173 |
| node html markdown | 3.532 | 3.780 | 3.805 |
| mdream | 0.686 | 0.783 | 0.813 |

### file_24

- Size: 184834 bytes
- File: 42b43887c6dd91353249924745e030eac3a6d818966d91c67b406431ff9bdf05.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.857 | 2.001 | 2.015 |
| h2m-parser with readability | 8.467 | 8.710 | 17.060 |
| turndown | 7.335 | 8.622 | 8.696 |
| node html markdown | 6.134 | 6.549 | 6.560 |
| mdream | 0.194 | 0.217 | 0.225 |

### file_25

- Size: 98648 bytes
- File: 44b21071ae6feede3c36d2ab032cd422eb0c6a0fdfe4da79531931ad93dd4940.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.989 | 1.088 | 1.091 |
| h2m-parser with readability | 7.018 | 7.410 | 8.409 |
| turndown | 4.981 | 5.822 | 6.285 |
| node html markdown | 2.494 | 2.841 | 2.859 |
| mdream | 1.031 | 1.133 | 1.151 |

### file_26

- Size: 85583 bytes
- File: 44f750fab67bb9f54f5b5cc90bc34d55cff06260a3e63245856a6e57fcda5906.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.183 | 1.267 | 1.285 |
| h2m-parser with readability | 6.253 | 6.551 | 9.889 |
| turndown | 5.524 | 6.844 | 6.995 |
| node html markdown | 5.972 | 6.144 | 6.152 |
| mdream | 1.780 | 1.907 | 1.920 |

### file_27

- Size: 65639 bytes
- File: 45b6063ac2016db7b2fb1f995f0b54ee054fb561022e169c8fdbe321dcf672db.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.038 | 1.146 | 1.164 |
| h2m-parser with readability | 5.039 | 5.412 | 5.544 |
| turndown | 4.533 | 5.165 | 6.134 |
| node html markdown | 4.696 | 5.114 | 5.134 |
| mdream | 1.441 | 1.540 | 1.542 |

### file_28

- Size: 53725 bytes
- File: 45efaba666da241d9d069b550890530b65f2a6b61a5e529e1d3664630d4897ee.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.672 | 0.749 | 0.762 |
| h2m-parser with readability | 3.753 | 4.026 | 4.077 |
| turndown | 3.198 | 3.520 | 3.761 |
| node html markdown | 1.613 | 1.874 | 1.910 |
| mdream | 1.028 | 1.100 | 1.117 |

### file_29

- Size: 88224 bytes
- File: 46ab324348ca339dba58238e193f794c3309e52c018a8156ef9aedfedf0572e7.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.975 | 1.078 | 1.093 |
| h2m-parser with readability | 11.344 | 15.553 | 15.790 |
| turndown | 4.804 | 6.064 | 6.105 |
| node html markdown | 3.025 | 3.348 | 3.380 |
| mdream | 0.345 | 0.375 | 0.382 |

### file_30

- Size: 52935 bytes
- File: 46ed10778ec7c1292e624e1a72a2a0899f8ab6d8d4db1aa57fa4418b8b7e0a5d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.645 | 0.739 | 0.750 |
| h2m-parser with readability | 3.694 | 3.939 | 4.021 |
| turndown | 2.953 | 3.116 | 3.143 |
| node html markdown | 2.055 | 2.334 | 2.351 |
| mdream | 0.880 | 0.961 | 1.005 |

### file_31

- Size: 166944 bytes
- File: 4b8debc51d3d9598ad4552cc7a591d200a6c7d545fed2454916bedbb0f666086.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.296 | 1.400 | 1.401 |
| h2m-parser with readability | 8.780 | 9.219 | 15.633 |
| turndown | 7.336 | 9.440 | 9.553 |
| node html markdown | 3.514 | 3.806 | 3.835 |
| mdream | 0.693 | 0.769 | 0.812 |

### file_32

- Size: 97808 bytes
- File: 4bf8e536214f987f4a0bf6ca7d233619d30bde1e80a816c78d00358eb61e353c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.131 | 1.266 | 1.297 |
| h2m-parser with readability | 7.274 | 7.728 | 11.054 |
| turndown | 6.386 | 7.635 | 7.718 |
| node html markdown | 3.561 | 3.867 | 3.889 |
| mdream | 2.074 | 2.166 | 2.186 |

### file_33

- Size: 90241 bytes
- File: 4e0e399d24fe145def4817facccb0ff79e305dedb9ece5f8ec66396ea378f723.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.012 | 1.118 | 1.142 |
| h2m-parser with readability | 6.122 | 6.449 | 9.356 |
| turndown | 5.964 | 7.175 | 7.260 |
| node html markdown | 3.161 | 3.507 | 3.677 |
| mdream | 1.946 | 2.035 | 2.090 |

### file_34

- Size: 166420 bytes
- File: 4f454cb97e9b77d94c10ed8a6a35cd2eff1671de9d3d27852a38abd76a95be83.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.740 | 1.888 | 1.910 |
| h2m-parser with readability | 7.923 | 8.230 | 13.698 |
| turndown | 7.092 | 8.511 | 8.680 |
| node html markdown | 5.913 | 6.303 | 6.383 |
| mdream | 0.183 | 0.209 | 0.212 |

### file_35

- Size: 68778 bytes
- File: 4f83531b9fc91fd1e0062e43200669cd82cc36a518caa7f66fc6ba5be4ac545b.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.616 | 0.685 | 0.689 |
| h2m-parser with readability | 3.491 | 3.651 | 3.694 |
| turndown | 3.434 | 3.661 | 4.630 |
| node html markdown | 1.517 | 1.809 | 1.846 |
| mdream | 0.939 | 1.037 | 1.067 |

### file_36

- Size: 167544 bytes
- File: 4fe5472ba89db38e20daef6025108310c52121fd382c06314d5b33d7f47c1e94.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.205 | 2.322 | 2.356 |
| h2m-parser with readability | 16.200 | 22.407 | 22.782 |
| turndown | 10.624 | 12.315 | 12.474 |
| node html markdown | 9.639 | 9.863 | 9.884 |
| mdream | 0.400 | 0.444 | 0.452 |

### file_37

- Size: 84444 bytes
- File: 5a012f66c2bf0c70a0744c7483478aaa0c1a2b5b5920a72223f3a090e39df8be.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.304 | 1.422 | 1.442 |
| h2m-parser with readability | 6.943 | 7.383 | 8.179 |
| turndown | 6.303 | 7.434 | 7.554 |
| node html markdown | 6.570 | 6.792 | 6.829 |
| mdream | 1.698 | 1.823 | 1.856 |

### file_38

- Size: 69828 bytes
- File: 5bc9df3a36efb57a22edf862cec6a28eb112e535559c194d7976fb664c922c13.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.879 | 0.967 | 0.979 |
| h2m-parser with readability | 8.238 | 10.565 | 13.269 |
| turndown | 4.983 | 6.242 | 6.546 |
| node html markdown | 2.502 | 2.786 | 2.805 |
| mdream | 1.322 | 1.433 | 1.445 |

### file_39

- Size: 66504 bytes
- File: 5c83c2d71f97e2b5a979f197fbae6773dee6844e28889ae66ccb8d7458a9c5bb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.977 | 1.101 | 1.111 |
| h2m-parser with readability | 5.392 | 5.587 | 5.709 |
| turndown | 4.409 | 5.198 | 5.854 |
| node html markdown | 2.986 | 3.205 | 3.229 |
| mdream | 1.316 | 1.414 | 1.417 |

### file_40

- Size: 76713 bytes
- File: 5de3db78f95172797a51b3b3b2cdc4caeb63a4d7b709e4441510d2c1967e0e6f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.724 | 0.808 | 0.819 |
| h2m-parser with readability | 9.428 | 10.690 | 14.045 |
| turndown | 4.021 | 4.276 | 5.243 |
| node html markdown | 2.048 | 2.308 | 2.336 |
| mdream | 0.327 | 0.369 | 0.375 |

### file_41

- Size: 157066 bytes
- File: 5f081a0a9d1a1ce3b0e53603ecd8bde78947841c8fd1ff3c36efa95ee84681f6.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.615 | 1.733 | 1.760 |
| h2m-parser with readability | 9.272 | 9.543 | 16.567 |
| turndown | 8.054 | 9.687 | 9.766 |
| node html markdown | 5.590 | 5.945 | 5.949 |
| mdream | 1.071 | 1.156 | 1.169 |

### file_42

- Size: 21734 bytes
- File: 5f8b89390d3fc01c6a80728ba2aee597fea1dbfc8399d61015956db71e5336c7.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.255 | 0.288 | 0.300 |
| h2m-parser with readability | 1.848 | 2.020 | 2.041 |
| turndown | 1.404 | 1.574 | 1.587 |
| node html markdown | 0.416 | 0.474 | 0.486 |
| mdream | 0.359 | 0.419 | 0.422 |

### file_43

- Size: 91883 bytes
- File: 5f8c9f60be2250f694094ee1ca5deb9df10479e29fc92ff07c77c4cb9d2c3f21.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.202 | 1.285 | 1.297 |
| h2m-parser with readability | 7.271 | 7.883 | 11.233 |
| turndown | 5.603 | 7.134 | 7.297 |
| node html markdown | 3.979 | 4.186 | 4.196 |
| mdream | 1.239 | 1.305 | 1.316 |

### file_44

- Size: 124858 bytes
- File: 5fbfe3905c71925b1b3a875a3111073e5d0996d3f250a697398477d3642db321.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.181 | 1.281 | 1.293 |
| h2m-parser with readability | 7.147 | 10.345 | 12.036 |
| turndown | 5.088 | 6.354 | 6.518 |
| node html markdown | 4.271 | 4.492 | 4.511 |
| mdream | 0.531 | 0.596 | 0.603 |

### file_45

- Size: 185748 bytes
- File: 60b8aff17382f2fd02584645ef66e517b41f764d5b4ca404c1ceff3fe22bdda8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.698 | 1.817 | 1.852 |
| h2m-parser with readability | 11.101 | 16.413 | 19.298 |
| turndown | 8.681 | 10.593 | 10.728 |
| node html markdown | 6.142 | 6.476 | 6.539 |
| mdream | 0.384 | 0.422 | 0.431 |

### file_46

- Size: 172926 bytes
- File: 60bccec4069d54a6889bfcda785c0f3066a70cb5fadeea81f28d371681a2dee8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.418 | 2.572 | 2.598 |
| h2m-parser with readability | 13.235 | 19.844 | 20.113 |
| turndown | 14.024 | 15.189 | 15.196 |
| node html markdown | 7.509 | 7.710 | 7.748 |
| mdream | 3.067 | 3.192 | 3.233 |

### file_47

- Size: 42840 bytes
- File: 60cc80fb25f0b2ebdb2e6835ab7bfd3d26362971e39fe8838e7ac548ba323cf0.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.492 | 0.541 | 0.552 |
| h2m-parser with readability | 3.309 | 3.498 | 3.503 |
| turndown | 2.263 | 2.427 | 2.482 |
| node html markdown | 0.652 | 0.737 | 0.789 |
| mdream | 0.646 | 0.682 | 0.695 |

### file_48

- Size: 137969 bytes
- File: 61adb9c208d9c67253b4413ef7ec2d010edae448b8c832bff2254125e4b51d5f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.017 | 1.102 | 1.125 |
| h2m-parser with readability | 9.983 | 17.485 | 18.075 |
| turndown | 5.998 | 7.741 | 7.842 |
| node html markdown | 3.325 | 3.652 | 3.657 |
| mdream | 1.469 | 1.581 | 1.618 |

### file_49

- Size: 120011 bytes
- File: 61d8052b19ed9885651ed1110ddcccc001f9ec2e3b7a77926d350762bcd02400.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.135 | 1.234 | 1.267 |
| h2m-parser with readability | 7.349 | 7.845 | 11.485 |
| turndown | 4.852 | 6.004 | 6.205 |
| node html markdown | 3.944 | 4.142 | 4.158 |
| mdream | 0.520 | 0.601 | 0.617 |

### file_50

- Size: 66809 bytes
- File: 63c6d5256b8ce1098b5688eb5fafa747e9467692d099a3e9e42246e7af29748f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.765 | 0.856 | 0.879 |
| h2m-parser with readability | 4.603 | 4.843 | 4.961 |
| turndown | 4.004 | 4.516 | 5.322 |
| node html markdown | 1.750 | 2.086 | 2.111 |
| mdream | 0.693 | 0.778 | 0.783 |

### file_51

- Size: 82725 bytes
- File: 64bf40da8348d808ef103cc5529fd268fec46fbefa40b486d288d2a07871a527.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.878 | 0.957 | 0.997 |
| h2m-parser with readability | 4.582 | 4.831 | 4.902 |
| turndown | 4.738 | 5.177 | 6.061 |
| node html markdown | 2.445 | 2.698 | 2.732 |
| mdream | 0.762 | 0.869 | 0.881 |

### file_52

- Size: 46587 bytes
- File: 6a59bd96489c98226c72f0245bac98a4b09aa0516ebfe4982233a6c33d129691.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.572 | 0.635 | 0.646 |
| h2m-parser with readability | 3.844 | 4.101 | 4.178 |
| turndown | 2.683 | 2.853 | 2.915 |
| node html markdown | 1.782 | 2.081 | 2.107 |
| mdream | 0.797 | 0.848 | 0.869 |

### file_53

- Size: 59176 bytes
- File: 6b095375a53dfc7994a032e2efac70f43a4fac9303d549256d88b8f7cecadd50.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.608 | 0.659 | 0.671 |
| h2m-parser with readability | 4.482 | 4.692 | 4.751 |
| turndown | 2.771 | 3.097 | 3.870 |
| node html markdown | 1.235 | 1.459 | 1.503 |
| mdream | 0.252 | 0.297 | 0.303 |

### file_54

- Size: 227057 bytes
- File: 6b817bedb8d6402bab160ed6d2b99256163bd3aef20deae3015f74e5bb253e55.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.296 | 1.394 | 1.449 |
| h2m-parser with readability | 9.518 | 11.562 | 16.647 |
| turndown | 8.412 | 11.317 | 11.638 |
| node html markdown | 3.530 | 3.909 | 3.945 |
| mdream | 0.709 | 0.775 | 0.825 |

### file_55

- Size: 75425 bytes
- File: 6d30abed88489774017024b17cdb1928d9a2b45bb79767515383b8444e9601b2.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.864 | 0.942 | 0.979 |
| h2m-parser with readability | 2.662 | 2.857 | 2.926 |
| turndown | 3.712 | 4.657 | 4.910 |
| node html markdown | 3.501 | 3.701 | 3.719 |
| mdream | 1.419 | 1.502 | 1.517 |

### file_56

- Size: 123582 bytes
- File: 71bf3c23c5d3fff9cec67606fde6547c8866ae8aa95f5991651d94c68df4ad1d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.519 | 1.639 | 1.667 |
| h2m-parser with readability | 8.679 | 12.209 | 14.636 |
| turndown | 6.594 | 7.963 | 8.124 |
| node html markdown | 5.367 | 5.688 | 5.761 |
| mdream | 1.251 | 1.341 | 1.366 |

### file_57

- Size: 90590 bytes
- File: 71cb773c42c94b75d41c059a27dd10b763443a71dbb6dd202402843de8a5e331.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.829 | 0.917 | 0.954 |
| h2m-parser with readability | 5.842 | 6.191 | 7.527 |
| turndown | 4.204 | 5.106 | 5.245 |
| node html markdown | 2.187 | 2.464 | 2.484 |
| mdream | 1.078 | 1.148 | 1.154 |

### file_58

- Size: 139105 bytes
- File: 72e78dee157bdf3e8a9a9f07e54a98a3714ea2998e2c2e2a94c46dbe92176feb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.112 | 2.268 | 2.273 |
| h2m-parser with readability | 9.809 | 13.916 | 17.146 |
| turndown | 6.361 | 8.409 | 8.569 |
| node html markdown | 11.420 | 11.736 | 11.773 |
| mdream | 1.283 | 1.397 | 1.423 |

### file_59

- Size: 99162 bytes
- File: 72ecfb3f60f4e8a6103916f2041ce9a55c4ef1e31477f9a8ffb7f4d3bba8c559.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.440 | 1.547 | 1.560 |
| h2m-parser with readability | 14.585 | 19.916 | 20.115 |
| turndown | 8.322 | 9.319 | 9.388 |
| node html markdown | 6.818 | 7.074 | 7.081 |
| mdream | 0.192 | 0.204 | 0.207 |

### file_60

- Size: 100264 bytes
- File: 73c175cdf9d5e065351ecf2220510088904adb77b49211cdd99e43e5870e06c2.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.075 | 1.165 | 1.190 |
| h2m-parser with readability | 13.224 | 16.646 | 16.987 |
| turndown | 4.417 | 5.823 | 6.011 |
| node html markdown | 2.570 | 2.921 | 2.948 |
| mdream | 1.412 | 1.513 | 1.534 |

### file_61

- Size: 388826 bytes
- File: 74e8bc94abea7c60f022d8d3f672f80e59e3e126735fae0b5ee5914ff2fce48e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 4.582 | 4.728 | 4.748 |
| h2m-parser with readability | 25.839 | 33.049 | 33.140 |
| turndown | 30.956 | 32.133 | 32.765 |
| node html markdown | 16.086 | 16.415 | 16.454 |
| mdream | 6.829 | 7.024 | 7.084 |

### file_62

- Size: 41388 bytes
- File: 7a426de207434e419a65eead0f4b46c8a479429d8429c36dc03b033d7e4891df.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.453 | 0.499 | 0.521 |
| h2m-parser with readability | 4.297 | 4.606 | 4.739 |
| turndown | 2.899 | 3.259 | 3.324 |
| node html markdown | 0.832 | 0.990 | 1.139 |
| mdream | 0.066 | 0.068 | 0.070 |

### file_63

- Size: 180017 bytes
- File: 7b7ffca82db8f721d6e5a8e4e65e60885af5eee4b9f28beb6b8363bb70c820f9.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.327 | 2.462 | 2.504 |
| h2m-parser with readability | 10.629 | 19.984 | 20.324 |
| turndown | 11.137 | 13.029 | 13.063 |
| node html markdown | 11.533 | 11.777 | 11.798 |
| mdream | 0.045 | 0.049 | 0.049 |

### file_64

- Size: 89817 bytes
- File: 7e26f2e426fef3c1a370382e7827ef2e530a2ff0c2cea7641ebb596a4a1b8008.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.954 | 1.033 | 1.058 |
| h2m-parser with readability | 5.996 | 6.308 | 6.488 |
| turndown | 5.906 | 7.294 | 7.390 |
| node html markdown | 2.914 | 3.249 | 3.305 |
| mdream | 1.874 | 1.989 | 1.999 |

### file_65

- Size: 103236 bytes
- File: 7e2d19ccbb3b4029dddf26557555278babdac18bb78a742052fd946001c28e4e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.495 | 1.617 | 1.630 |
| h2m-parser with readability | 14.881 | 20.482 | 20.743 |
| turndown | 8.411 | 9.219 | 9.349 |
| node html markdown | 7.076 | 7.284 | 7.312 |
| mdream | 2.256 | 2.370 | 2.396 |

### file_66

- Size: 78718 bytes
- File: 7e54e701ac39a9046d6eeb0ae75d2138733b66b30b5211e7f3245dd6dc3ca36c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.799 | 0.884 | 0.914 |
| h2m-parser with readability | 9.538 | 11.867 | 14.941 |
| turndown | 4.365 | 5.512 | 5.631 |
| node html markdown | 2.402 | 2.696 | 2.756 |
| mdream | 0.334 | 0.357 | 0.359 |

### file_67

- Size: 65198 bytes
- File: 7e91eb56692c91312a3dc3e7b769a2916029ef3d9e431d056d5f548c0f771d16.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.746 | 0.815 | 0.823 |
| h2m-parser with readability | 4.905 | 5.186 | 5.255 |
| turndown | 3.416 | 3.798 | 4.692 |
| node html markdown | 2.191 | 2.454 | 2.482 |
| mdream | 1.042 | 1.116 | 1.131 |

### file_68

- Size: 83251 bytes
- File: 7fc58a2d32d5b8d5fa9b918453a284acc71703ccfa0f0c89ec292b4245fd0521.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.016 | 1.091 | 1.095 |
| h2m-parser with readability | 5.285 | 5.602 | 5.802 |
| turndown | 7.725 | 9.140 | 9.219 |
| node html markdown | 3.685 | 3.982 | 4.010 |
| mdream | 1.416 | 1.507 | 1.556 |

### file_69

- Size: 66855 bytes
- File: 81d304541f62a6aaf29494766718ab8e58e95a8e784613e75f106cdef17868d6.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.820 | 0.895 | 0.908 |
| h2m-parser with readability | 5.540 | 5.803 | 6.102 |
| turndown | 3.901 | 4.358 | 4.513 |
| node html markdown | 2.588 | 2.878 | 2.908 |
| mdream | 1.123 | 1.229 | 1.236 |

### file_70

- Size: 42437 bytes
- File: 83c362b1373f55d45fdad0edee4d2885cafd0da3f2afb146cf2822448c3c4104.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.474 | 0.533 | 0.548 |
| h2m-parser with readability | 3.227 | 3.472 | 3.495 |
| turndown | 2.165 | 2.352 | 2.374 |
| node html markdown | 0.660 | 0.757 | 0.777 |
| mdream | 0.676 | 0.768 | 0.786 |

### file_71

- Size: 126437 bytes
- File: 84a7e7d5f61c90050a326bb74ac3a57899fdba4b755bd50df01a053c262d354e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.430 | 1.535 | 1.555 |
| h2m-parser with readability | 15.028 | 20.052 | 20.150 |
| turndown | 6.562 | 8.106 | 8.217 |
| node html markdown | 3.377 | 3.665 | 3.697 |
| mdream | 1.348 | 1.467 | 1.494 |

### file_72

- Size: 95344 bytes
- File: 8a1eb64f950f2f43097577c244fb38a35660f50a88c4305b23a8f24f254da8cb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.084 | 1.187 | 1.200 |
| h2m-parser with readability | 7.137 | 7.425 | 14.930 |
| turndown | 6.390 | 7.761 | 7.896 |
| node html markdown | 3.470 | 3.719 | 3.731 |
| mdream | 1.996 | 2.117 | 2.125 |

### file_73

- Size: 79924 bytes
- File: 8a701b6ec1c56e2c37357030da0b4b10af4187f069a988e12c2f91d2ba40cdc1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.747 | 0.808 | 0.829 |
| h2m-parser with readability | 7.532 | 7.805 | 10.075 |
| turndown | 3.181 | 3.441 | 3.548 |
| node html markdown | 1.424 | 1.572 | 1.757 |
| mdream | 1.054 | 1.117 | 1.130 |

### file_74

- Size: 167983 bytes
- File: 8a82ce22fec5e3656dad3d55e585727c88c94808ad92e37a0f6e99dcb3888800.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.116 | 2.244 | 2.256 |
| h2m-parser with readability | 12.953 | 20.709 | 21.084 |
| turndown | 10.224 | 12.168 | 12.246 |
| node html markdown | 10.519 | 10.729 | 10.759 |
| mdream | 0.047 | 0.051 | 0.053 |

### file_75

- Size: 101361 bytes
- File: 8a9d17a1e5b1866abc7b9263fabbc428e5299c7443ecad6cc56c0076287fe11a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.803 | 0.871 | 0.881 |
| h2m-parser with readability | 3.417 | 3.688 | 3.723 |
| turndown | 3.244 | 3.650 | 3.732 |
| node html markdown | 1.864 | 2.194 | 2.212 |
| mdream | 1.368 | 1.448 | 1.476 |

### file_76

- Size: 32087 bytes
- File: 8bd6d9bcba689408767f770d69f12b59c3f092e73cffcc9332261fbab4aa16e1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.297 | 0.339 | 0.349 |
| h2m-parser with readability | 2.297 | 2.477 | 2.534 |
| turndown | 1.685 | 1.854 | 1.867 |
| node html markdown | 0.415 | 0.460 | 0.477 |
| mdream | 0.456 | 0.507 | 0.525 |

### file_77

- Size: 80418 bytes
- File: 8c0dd0456453aeff3f66d053710f18adc1a2fc0f1f3a0c95a3e166e41ffb737d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.797 | 0.864 | 0.883 |
| h2m-parser with readability | 7.576 | 7.992 | 10.904 |
| turndown | 4.352 | 4.880 | 5.639 |
| node html markdown | 2.389 | 2.738 | 2.754 |
| mdream | 0.317 | 0.336 | 0.342 |

### file_78

- Size: 171100 bytes
- File: 8c1a780dec8c1a5ea0344514524f53b2b580ce87083e0a756ade3d83627d5653.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.157 | 2.302 | 2.335 |
| h2m-parser with readability | 9.791 | 14.730 | 19.683 |
| turndown | 10.267 | 12.210 | 12.423 |
| node html markdown | 10.748 | 11.013 | 11.022 |
| mdream | 0.047 | 0.051 | 0.052 |

### file_79

- Size: 152242 bytes
- File: 8cbf3b144736ffc4adda5fe7105e7fd1413dcc1955110829d849a658aa722bea.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.580 | 1.734 | 1.759 |
| h2m-parser with readability | 7.228 | 7.725 | 11.027 |
| turndown | 6.270 | 7.344 | 7.421 |
| node html markdown | 5.156 | 5.562 | 5.578 |
| mdream | 2.430 | 2.554 | 2.575 |

### file_80

- Size: 69248 bytes
- File: 8cfa9d30e2b66b991461423012906121661cd9c8809f564eabb660149577864d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.623 | 0.716 | 0.727 |
| h2m-parser with readability | 3.533 | 3.779 | 3.830 |
| turndown | 3.595 | 4.297 | 4.605 |
| node html markdown | 1.548 | 1.944 | 1.965 |
| mdream | 0.921 | 0.979 | 0.999 |

### file_81

- Size: 100091 bytes
- File: 8d612a03fa42a2fb014b59534c46c9590da90fbeb91ac50938cdfa36dd274e23.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.451 | 1.560 | 1.575 |
| h2m-parser with readability | 14.788 | 20.809 | 21.242 |
| turndown | 8.354 | 9.267 | 9.299 |
| node html markdown | 6.896 | 7.208 | 7.245 |
| mdream | 2.234 | 2.358 | 2.364 |

### file_82

- Size: 158892 bytes
- File: 8faa3156452fa9d0667617c406eb9b6458b48d7b8c36cf2bf804fba290b302f5.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.632 | 1.764 | 1.796 |
| h2m-parser with readability | 7.816 | 10.981 | 15.405 |
| turndown | 6.647 | 7.594 | 7.624 |
| node html markdown | 5.241 | 5.499 | 5.554 |
| mdream | 2.579 | 2.705 | 2.750 |

### file_83

- Size: 37644 bytes
- File: 9c947bc9fbcb4e2eb0296d858fe193f580e869db7869358af822d7d2d4c0388e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.587 | 0.661 | 0.683 |
| h2m-parser with readability | 3.447 | 3.763 | 3.880 |
| turndown | 2.226 | 2.349 | 2.370 |
| node html markdown | 1.995 | 2.233 | 2.242 |
| mdream | 0.683 | 0.787 | 0.798 |

### file_84

- Size: 81258 bytes
- File: 9e04cb267a9b128369a11c7f6e5486d43644955dee7f73cc004b9cf1693a11c1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.836 | 0.938 | 0.949 |
| h2m-parser with readability | 9.861 | 13.048 | 15.480 |
| turndown | 4.361 | 5.255 | 5.650 |
| node html markdown | 2.571 | 2.875 | 2.928 |
| mdream | 0.322 | 0.341 | 0.345 |

### file_85

- Size: 82762 bytes
- File: 9e3c6d40690c1302613f203db178b23f9f18494d2653a1b547086a3973fff93c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.873 | 0.950 | 0.967 |
| h2m-parser with readability | 6.885 | 7.373 | 8.116 |
| turndown | 4.430 | 5.656 | 5.699 |
| node html markdown | 2.607 | 2.871 | 2.895 |
| mdream | 0.338 | 0.373 | 0.374 |

### file_86

- Size: 141136 bytes
- File: 9f2031ee45a11919452ca2efbc3498672324cda5f76314d7ea10913f63cf3545.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.395 | 1.497 | 1.511 |
| h2m-parser with readability | 6.333 | 6.743 | 9.785 |
| turndown | 5.784 | 7.264 | 7.307 |
| node html markdown | 4.142 | 4.361 | 4.378 |
| mdream | 0.178 | 0.202 | 0.207 |

### file_87

- Size: 80201 bytes
- File: 9fba51a14308353194c537f494ded0ccb27d9f908f252690b083d48db64ea15a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.805 | 0.897 | 0.915 |
| h2m-parser with readability | 7.679 | 8.196 | 12.054 |
| turndown | 4.381 | 5.267 | 5.842 |
| node html markdown | 2.370 | 2.719 | 2.746 |
| mdream | 0.304 | 0.329 | 0.338 |

### file_88

- Size: 587 bytes
- File: simple.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.017 | 0.018 | 0.018 |
| h2m-parser with readability | 0.626 | 0.731 | 0.802 |
| turndown | 0.076 | 0.092 | 0.105 |
| node html markdown | 0.033 | 0.038 | 0.039 |
| mdream | 0.031 | 0.047 | 0.048 |

### file_89

- Size: 1813514 bytes
- File: wikipedia-largest.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 31.259 | 32.395 | 32.627 |
| h2m-parser with readability | 773.690 | 1022.269 | 1025.088 |
| turndown | 194.083 | 200.565 | 201.472 |
| node html markdown | 13272.156 | 13570.330 | 13586.638 |
| mdream | 49.983 | 50.678 | 50.773 |

### file_90

- Size: 166054 bytes
- File: wikipedia-small.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.130 | 2.269 | 2.325 |
| h2m-parser with readability | 19.027 | 24.829 | 25.086 |
| turndown | 9.232 | 10.559 | 10.639 |
| node html markdown | 8.798 | 9.058 | 9.074 |
| mdream | 2.880 | 3.012 | 3.020 |

