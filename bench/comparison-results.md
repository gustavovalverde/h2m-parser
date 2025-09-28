# h2m-parser Benchmark Results

Generated: 2025-09-28T15:53:58.311Z

## Test Configuration

- Iterations: 100
- Dataset: /Users/gustavovalverde/dev/personal/hgtm/tests/fixtures
- Readability tested: Yes

## Results by File

### tiny

- Size: 18 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.021 | 0.032 | 0.034 |
| h2m-parser with readability | 0.264 | 0.416 | 0.456 |
| turndown | 0.023 | 0.043 | 0.049 |
| node html markdown | 0.011 | 0.017 | 0.020 |
| mdream | 0.005 | 0.010 | 0.014 |

### small

- Size: 84 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.016 | 0.025 | 0.027 |
| h2m-parser with readability | 0.195 | 0.279 | 0.295 |
| turndown | 0.039 | 0.051 | 0.057 |
| node html markdown | 0.021 | 0.028 | 0.030 |
| mdream | 0.013 | 0.016 | 0.017 |

### medium

- Size: 369 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.013 | 0.016 | 0.017 |
| h2m-parser with readability | 0.233 | 0.266 | 0.274 |
| turndown | 0.048 | 0.055 | 0.055 |
| node html markdown | 0.022 | 0.026 | 0.026 |
| mdream | 0.022 | 0.041 | 0.041 |

### file_1

- Size: 89721 bytes
- File: 039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.113 | 1.247 | 1.292 |
| h2m-parser with readability | 6.413 | 8.190 | 12.025 |
| turndown | 5.750 | 7.072 | 7.150 |
| node html markdown | 3.144 | 3.524 | 3.724 |
| mdream | 1.710 | 1.811 | 1.911 |

### file_2

- Size: 70337 bytes
- File: 06ed0a833361190536a4f61888354e07dccaa501bd9a1c0f1c545533bde1650b.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.821 | 0.911 | 0.921 |
| h2m-parser with readability | 5.210 | 6.684 | 7.578 |
| turndown | 4.144 | 4.475 | 5.525 |
| node html markdown | 2.033 | 2.265 | 2.276 |
| mdream | 0.139 | 0.145 | 0.147 |

### file_3

- Size: 160839 bytes
- File: 078cdb456d1beb698aeed86e0f2161e442e9431c4580295f1ba4ece22741068c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.568 | 1.691 | 1.714 |
| h2m-parser with readability | 12.451 | 16.677 | 17.304 |
| turndown | 9.080 | 11.063 | 11.175 |
| node html markdown | 3.861 | 4.052 | 4.059 |
| mdream | 0.255 | 0.266 | 0.269 |

### file_4

- Size: 99724 bytes
- File: 0a8c510c3691d8e68ccc749559680257a382fe792a3d4d8531fb285cd74c3492.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.963 | 1.049 | 1.091 |
| h2m-parser with readability | 6.092 | 6.426 | 8.835 |
| turndown | 4.419 | 4.819 | 5.815 |
| node html markdown | 2.325 | 2.576 | 2.590 |
| mdream | 1.007 | 1.028 | 1.032 |

### file_5

- Size: 105057 bytes
- File: 0e55dcdbeb54c88ee87942b9fef7ea5398fa9a1e83493d55844b479506a80fd8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.337 | 1.462 | 1.493 |
| h2m-parser with readability | 7.230 | 9.009 | 12.970 |
| turndown | 6.131 | 7.446 | 7.582 |
| node html markdown | 3.239 | 3.483 | 3.567 |
| mdream | 0.521 | 0.571 | 0.650 |

### file_6

- Size: 94725 bytes
- File: 17ca85324662023ba21666b3ca5d5d37a92b2806bf7a88b906c28b90a635f82a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.382 | 1.486 | 1.523 |
| h2m-parser with readability | 7.168 | 7.594 | 14.377 |
| turndown | 7.969 | 9.340 | 9.377 |
| node html markdown | 4.605 | 4.903 | 4.977 |
| mdream | 1.180 | 1.244 | 1.321 |

### file_7

- Size: 62759 bytes
- File: 19fe8f574b7420277862728929d83dd74d7aa9c742688ca4c386b75693547bd3.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.914 | 1.052 | 1.090 |
| h2m-parser with readability | 4.959 | 5.318 | 5.574 |
| turndown | 4.169 | 4.547 | 5.495 |
| node html markdown | 2.150 | 2.410 | 2.443 |
| mdream | 0.509 | 0.584 | 0.597 |

### file_8

- Size: 41355 bytes
- File: 1a2c2f9fe410c836bb94e85c85625dbe8174f6e57f0b0316644cefd30979f096.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.486 | 0.552 | 0.568 |
| h2m-parser with readability | 3.130 | 3.362 | 3.433 |
| turndown | 2.170 | 2.406 | 2.454 |
| node html markdown | 0.611 | 0.689 | 0.706 |
| mdream | 0.629 | 0.724 | 0.743 |

### file_9

- Size: 61437 bytes
- File: 1bbc7f62e80e44afd533e896c0168c3b18f1e934530d05cb1f579ad3347d135c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.765 | 0.841 | 0.870 |
| h2m-parser with readability | 4.888 | 5.155 | 5.297 |
| turndown | 3.445 | 3.890 | 3.999 |
| node html markdown | 1.957 | 2.281 | 2.393 |
| mdream | 1.056 | 1.156 | 1.177 |

### file_10

- Size: 177823 bytes
- File: 1d43b4816bdba5825165dc21558d9eafb9f650c67ba048411b04dc77a745dc39.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.007 | 1.085 | 1.133 |
| h2m-parser with readability | 6.721 | 7.194 | 10.310 |
| turndown | 7.614 | 9.780 | 9.890 |
| node html markdown | 2.741 | 3.065 | 3.108 |
| mdream | 0.018 | 0.018 | 0.018 |

### file_11

- Size: 139469 bytes
- File: 1de0efed4d661163ff8414e8ca69f45a49efd7edca19dc896ca0983a4bf41485.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.782 | 1.933 | 1.952 |
| h2m-parser with readability | 21.455 | 27.161 | 27.340 |
| turndown | 9.340 | 11.042 | 11.237 |
| node html markdown | 6.660 | 7.024 | 7.075 |
| mdream | 0.150 | 0.167 | 0.171 |

### file_12

- Size: 48447 bytes
- File: 1e62a223bca12adda6410b1789072a2ad755566bd4a6bc17d10dc95a51d74d65.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.567 | 0.641 | 0.652 |
| h2m-parser with readability | 3.185 | 3.498 | 3.586 |
| turndown | 2.541 | 2.731 | 2.817 |
| node html markdown | 1.058 | 1.214 | 1.280 |
| mdream | 0.687 | 0.707 | 0.716 |

### file_13

- Size: 94912 bytes
- File: 20f1955819dc2b50d2d10788f73adc72bceb491a03ed608debb72a90bce65c50.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.190 | 1.292 | 1.312 |
| h2m-parser with readability | 5.223 | 5.590 | 5.687 |
| turndown | 4.828 | 5.829 | 5.866 |
| node html markdown | 3.243 | 3.449 | 3.482 |
| mdream | 1.578 | 1.651 | 1.667 |

### file_14

- Size: 67227 bytes
- File: 22c0f41ae560968de5e6b0ef9ecffffeae3f409aa73d9b82853f65535116f68f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.720 | 0.786 | 0.822 |
| h2m-parser with readability | 4.178 | 4.420 | 4.563 |
| turndown | 3.468 | 3.715 | 3.987 |
| node html markdown | 2.177 | 2.411 | 2.436 |
| mdream | 0.721 | 0.768 | 0.846 |

### file_15

- Size: 69850 bytes
- File: 22c3886e7116464c04c2332c20a013a5837992e7bcdb1f6cacd7d475f9784273.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.880 | 0.989 | 1.013 |
| h2m-parser with readability | 4.446 | 4.809 | 4.922 |
| turndown | 3.805 | 4.125 | 5.023 |
| node html markdown | 2.259 | 2.481 | 2.499 |
| mdream | 1.002 | 1.021 | 1.048 |

### file_16

- Size: 95103 bytes
- File: 22c4be85802e9602a344fc2cc704093362b9193523c6e35cfb7dc086c8ef8648.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.100 | 1.201 | 1.220 |
| h2m-parser with readability | 6.648 | 7.109 | 9.993 |
| turndown | 6.082 | 7.133 | 7.291 |
| node html markdown | 3.023 | 3.340 | 3.373 |
| mdream | 2.012 | 2.107 | 2.140 |

### file_17

- Size: 91296 bytes
- File: 26c3b98f33bb6902f32535235fd7d32792df87779bdf1f86c3b21e15fbf3161d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.198 | 1.329 | 1.379 |
| h2m-parser with readability | 6.310 | 6.970 | 8.592 |
| turndown | 5.395 | 6.491 | 7.044 |
| node html markdown | 2.875 | 3.141 | 3.164 |
| mdream | 0.518 | 0.551 | 0.646 |

### file_18

- Size: 74095 bytes
- File: 2dbf7cd4444617cc60f0e2d2c95b20a535979a32972f5005e2af577b37980e48.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.838 | 0.920 | 0.952 |
| h2m-parser with readability | 4.099 | 4.331 | 4.388 |
| turndown | 3.668 | 4.144 | 4.795 |
| node html markdown | 1.986 | 2.248 | 2.255 |
| mdream | 1.436 | 1.482 | 1.485 |

### file_19

- Size: 141461 bytes
- File: 2fd71e2969106342bab6862bb212ae16ba592b426dd4141da8a383b183aa3a37.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.846 | 1.982 | 1.994 |
| h2m-parser with readability | 10.914 | 17.181 | 17.425 |
| turndown | 7.971 | 9.579 | 9.722 |
| node html markdown | 6.285 | 6.589 | 6.615 |
| mdream | 1.502 | 1.568 | 1.570 |

### file_20

- Size: 78203 bytes
- File: 35f536ef8c8eba0616f2dc78e6653e1d7d68e3af927b09efad3dae7ce2080567.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.265 | 1.387 | 1.403 |
| h2m-parser with readability | 7.641 | 8.135 | 11.404 |
| turndown | 5.298 | 6.377 | 6.670 |
| node html markdown | 4.523 | 4.679 | 4.703 |
| mdream | 1.369 | 1.425 | 1.435 |

### file_21

- Size: 78530 bytes
- File: 3b27831099c75b36d5978864ec89575c675c963e949cda52147a044bbfa77559.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.009 | 1.136 | 1.159 |
| h2m-parser with readability | 5.505 | 5.981 | 6.177 |
| turndown | 5.394 | 6.842 | 6.929 |
| node html markdown | 3.488 | 3.640 | 3.683 |
| mdream | 1.140 | 1.254 | 1.267 |

### file_22

- Size: 50858 bytes
- File: 3f6413c32bffc73b64cb1a2adb237cd19ffc75494c9172755f1a961ba32e75dd.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.650 | 0.733 | 0.769 |
| h2m-parser with readability | 4.236 | 4.548 | 4.601 |
| turndown | 3.324 | 3.518 | 3.734 |
| node html markdown | 1.427 | 1.648 | 1.663 |
| mdream | 0.892 | 0.949 | 0.953 |

### file_23

- Size: 160633 bytes
- File: 40d4e50472a8f0d30d68613051be510ed098087679df7e0e564d6dd32152d679.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.357 | 1.547 | 1.578 |
| h2m-parser with readability | 9.893 | 15.171 | 15.364 |
| turndown | 6.937 | 8.864 | 8.996 |
| node html markdown | 3.385 | 3.614 | 3.654 |
| mdream | 0.698 | 0.853 | 0.899 |

### file_24

- Size: 184834 bytes
- File: 42b43887c6dd91353249924745e030eac3a6d818966d91c67b406431ff9bdf05.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.912 | 2.043 | 2.089 |
| h2m-parser with readability | 8.273 | 8.995 | 15.498 |
| turndown | 7.064 | 8.188 | 8.216 |
| node html markdown | 5.849 | 6.219 | 6.268 |
| mdream | 0.191 | 0.223 | 0.228 |

### file_25

- Size: 98648 bytes
- File: 44b21071ae6feede3c36d2ab032cd422eb0c6a0fdfe4da79531931ad93dd4940.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.985 | 1.075 | 1.107 |
| h2m-parser with readability | 6.936 | 7.313 | 10.191 |
| turndown | 4.899 | 5.333 | 6.378 |
| node html markdown | 2.438 | 2.764 | 2.796 |
| mdream | 1.013 | 1.053 | 1.071 |

### file_26

- Size: 85583 bytes
- File: 44f750fab67bb9f54f5b5cc90bc34d55cff06260a3e63245856a6e57fcda5906.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.189 | 1.277 | 1.311 |
| h2m-parser with readability | 6.200 | 6.745 | 6.842 |
| turndown | 5.341 | 6.679 | 6.772 |
| node html markdown | 5.760 | 5.984 | 6.002 |
| mdream | 1.760 | 1.819 | 1.854 |

### file_27

- Size: 65639 bytes
- File: 45b6063ac2016db7b2fb1f995f0b54ee054fb561022e169c8fdbe321dcf672db.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.070 | 1.179 | 1.193 |
| h2m-parser with readability | 4.773 | 5.107 | 5.156 |
| turndown | 4.424 | 5.629 | 6.113 |
| node html markdown | 4.375 | 4.657 | 4.718 |
| mdream | 1.439 | 1.503 | 1.511 |

### file_28

- Size: 53725 bytes
- File: 45efaba666da241d9d069b550890530b65f2a6b61a5e529e1d3664630d4897ee.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.677 | 0.774 | 0.793 |
| h2m-parser with readability | 3.601 | 3.842 | 3.944 |
| turndown | 3.103 | 3.294 | 3.357 |
| node html markdown | 1.580 | 1.828 | 1.885 |
| mdream | 1.002 | 1.084 | 1.186 |

### file_29

- Size: 88224 bytes
- File: 46ab324348ca339dba58238e193f794c3309e52c018a8156ef9aedfedf0572e7.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.011 | 1.111 | 1.126 |
| h2m-parser with readability | 11.175 | 14.940 | 15.242 |
| turndown | 4.943 | 5.954 | 6.250 |
| node html markdown | 3.038 | 3.295 | 3.329 |
| mdream | 0.337 | 0.367 | 0.371 |

### file_30

- Size: 52935 bytes
- File: 46ed10778ec7c1292e624e1a72a2a0899f8ab6d8d4db1aa57fa4418b8b7e0a5d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.673 | 0.758 | 0.770 |
| h2m-parser with readability | 3.492 | 3.771 | 3.858 |
| turndown | 2.938 | 3.235 | 3.355 |
| node html markdown | 2.031 | 2.282 | 2.289 |
| mdream | 0.856 | 0.928 | 1.006 |

### file_31

- Size: 166944 bytes
- File: 4b8debc51d3d9598ad4552cc7a591d200a6c7d545fed2454916bedbb0f666086.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.321 | 1.444 | 1.448 |
| h2m-parser with readability | 8.670 | 11.671 | 14.470 |
| turndown | 7.066 | 9.012 | 9.317 |
| node html markdown | 3.321 | 3.583 | 3.611 |
| mdream | 0.677 | 0.729 | 0.749 |

### file_32

- Size: 97808 bytes
- File: 4bf8e536214f987f4a0bf6ca7d233619d30bde1e80a816c78d00358eb61e353c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.144 | 1.239 | 1.311 |
| h2m-parser with readability | 7.052 | 7.514 | 11.529 |
| turndown | 6.227 | 7.391 | 7.519 |
| node html markdown | 3.394 | 3.696 | 3.762 |
| mdream | 2.038 | 2.145 | 2.184 |

### file_33

- Size: 90241 bytes
- File: 4e0e399d24fe145def4817facccb0ff79e305dedb9ece5f8ec66396ea378f723.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.042 | 1.155 | 1.168 |
| h2m-parser with readability | 5.941 | 6.381 | 8.880 |
| turndown | 5.847 | 7.082 | 7.125 |
| node html markdown | 3.068 | 3.367 | 3.436 |
| mdream | 1.904 | 1.973 | 2.011 |

### file_34

- Size: 166420 bytes
- File: 4f454cb97e9b77d94c10ed8a6a35cd2eff1671de9d3d27852a38abd76a95be83.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.779 | 1.906 | 1.932 |
| h2m-parser with readability | 7.672 | 8.023 | 14.017 |
| turndown | 6.800 | 8.122 | 8.167 |
| node html markdown | 5.552 | 5.872 | 5.896 |
| mdream | 0.180 | 0.198 | 0.199 |

### file_35

- Size: 68778 bytes
- File: 4f83531b9fc91fd1e0062e43200669cd82cc36a518caa7f66fc6ba5be4ac545b.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.637 | 0.714 | 0.756 |
| h2m-parser with readability | 3.352 | 3.643 | 3.683 |
| turndown | 3.360 | 3.977 | 4.492 |
| node html markdown | 1.470 | 1.759 | 1.782 |
| mdream | 0.926 | 1.011 | 1.048 |

### file_36

- Size: 167544 bytes
- File: 4fe5472ba89db38e20daef6025108310c52121fd382c06314d5b33d7f47c1e94.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.392 | 2.586 | 2.643 |
| h2m-parser with readability | 16.100 | 21.574 | 21.891 |
| turndown | 10.183 | 11.838 | 11.882 |
| node html markdown | 9.427 | 9.856 | 10.010 |
| mdream | 0.398 | 0.423 | 0.431 |

### file_37

- Size: 84444 bytes
- File: 5a012f66c2bf0c70a0744c7483478aaa0c1a2b5b5920a72223f3a090e39df8be.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.349 | 1.510 | 1.539 |
| h2m-parser with readability | 6.831 | 7.220 | 10.459 |
| turndown | 6.044 | 7.261 | 7.372 |
| node html markdown | 6.622 | 6.932 | 6.965 |
| mdream | 1.703 | 1.852 | 1.893 |

### file_38

- Size: 69828 bytes
- File: 5bc9df3a36efb57a22edf862cec6a28eb112e535559c194d7976fb664c922c13.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.892 | 1.022 | 1.046 |
| h2m-parser with readability | 8.163 | 11.356 | 13.037 |
| turndown | 5.005 | 6.101 | 6.419 |
| node html markdown | 2.437 | 2.714 | 2.754 |
| mdream | 1.320 | 1.403 | 1.430 |

### file_39

- Size: 66504 bytes
- File: 5c83c2d71f97e2b5a979f197fbae6773dee6844e28889ae66ccb8d7458a9c5bb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.330 | 2.611 | 3.163 |
| h2m-parser with readability | 5.469 | 5.839 | 5.961 |
| turndown | 4.515 | 5.753 | 5.873 |
| node html markdown | 2.968 | 3.235 | 3.241 |
| mdream | 1.304 | 1.380 | 1.397 |

### file_40

- Size: 76713 bytes
- File: 5de3db78f95172797a51b3b3b2cdc4caeb63a4d7b709e4441510d2c1967e0e6f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.725 | 0.790 | 0.808 |
| h2m-parser with readability | 9.370 | 11.906 | 13.530 |
| turndown | 4.060 | 4.492 | 5.286 |
| node html markdown | 2.028 | 2.295 | 2.335 |
| mdream | 0.342 | 0.371 | 0.380 |

### file_41

- Size: 157066 bytes
- File: 5f081a0a9d1a1ce3b0e53603ecd8bde78947841c8fd1ff3c36efa95ee84681f6.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.647 | 1.740 | 1.765 |
| h2m-parser with readability | 8.996 | 9.603 | 14.877 |
| turndown | 7.892 | 9.537 | 9.615 |
| node html markdown | 5.546 | 5.913 | 5.956 |
| mdream | 1.053 | 1.127 | 1.177 |

### file_42

- Size: 21734 bytes
- File: 5f8b89390d3fc01c6a80728ba2aee597fea1dbfc8399d61015956db71e5336c7.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.271 | 0.298 | 0.313 |
| h2m-parser with readability | 1.802 | 1.928 | 1.972 |
| turndown | 1.391 | 1.494 | 1.545 |
| node html markdown | 0.405 | 0.431 | 0.444 |
| mdream | 0.350 | 0.411 | 0.413 |

### file_43

- Size: 91883 bytes
- File: 5f8c9f60be2250f694094ee1ca5deb9df10479e29fc92ff07c77c4cb9d2c3f21.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.194 | 1.320 | 1.331 |
| h2m-parser with readability | 6.944 | 7.435 | 12.079 |
| turndown | 5.768 | 7.350 | 7.442 |
| node html markdown | 3.872 | 4.108 | 4.118 |
| mdream | 1.243 | 1.290 | 1.298 |

### file_44

- Size: 124858 bytes
- File: 5fbfe3905c71925b1b3a875a3111073e5d0996d3f250a697398477d3642db321.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.211 | 1.306 | 1.318 |
| h2m-parser with readability | 6.809 | 7.268 | 7.984 |
| turndown | 5.108 | 6.202 | 6.399 |
| node html markdown | 4.090 | 4.308 | 4.317 |
| mdream | 0.526 | 0.616 | 0.619 |

### file_45

- Size: 185748 bytes
- File: 60b8aff17382f2fd02584645ef66e517b41f764d5b4ca404c1ceff3fe22bdda8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.740 | 1.869 | 1.886 |
| h2m-parser with readability | 10.950 | 16.321 | 17.992 |
| turndown | 8.592 | 10.386 | 10.418 |
| node html markdown | 5.884 | 6.222 | 6.273 |
| mdream | 0.388 | 0.418 | 0.426 |

### file_46

- Size: 172926 bytes
- File: 60bccec4069d54a6889bfcda785c0f3066a70cb5fadeea81f28d371681a2dee8.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.428 | 2.580 | 2.667 |
| h2m-parser with readability | 13.392 | 19.035 | 19.243 |
| turndown | 13.864 | 15.063 | 15.125 |
| node html markdown | 7.420 | 8.180 | 8.230 |
| mdream | 3.029 | 3.129 | 3.145 |

### file_47

- Size: 42840 bytes
- File: 60cc80fb25f0b2ebdb2e6835ab7bfd3d26362971e39fe8838e7ac548ba323cf0.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.487 | 0.508 | 0.510 |
| h2m-parser with readability | 3.303 | 3.630 | 3.657 |
| turndown | 2.410 | 2.675 | 2.787 |
| node html markdown | 0.675 | 0.772 | 0.784 |
| mdream | 0.639 | 0.707 | 0.755 |

### file_48

- Size: 137969 bytes
- File: 61adb9c208d9c67253b4413ef7ec2d010edae448b8c832bff2254125e4b51d5f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.012 | 1.073 | 1.079 |
| h2m-parser with readability | 10.044 | 18.380 | 19.322 |
| turndown | 5.822 | 7.379 | 7.469 |
| node html markdown | 3.244 | 3.530 | 3.556 |
| mdream | 1.437 | 1.502 | 1.509 |

### file_49

- Size: 120011 bytes
- File: 61d8052b19ed9885651ed1110ddcccc001f9ec2e3b7a77926d350762bcd02400.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.102 | 1.191 | 1.259 |
| h2m-parser with readability | 7.223 | 7.632 | 11.825 |
| turndown | 4.772 | 6.001 | 6.054 |
| node html markdown | 3.961 | 4.246 | 4.287 |
| mdream | 0.522 | 0.603 | 0.612 |

### file_50

- Size: 66809 bytes
- File: 63c6d5256b8ce1098b5688eb5fafa747e9467692d099a3e9e42246e7af29748f.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.807 | 0.916 | 0.925 |
| h2m-parser with readability | 4.752 | 6.407 | 7.659 |
| turndown | 3.967 | 4.483 | 5.141 |
| node html markdown | 1.681 | 1.947 | 1.968 |
| mdream | 0.659 | 0.669 | 0.670 |

### file_51

- Size: 82725 bytes
- File: 64bf40da8348d808ef103cc5529fd268fec46fbefa40b486d288d2a07871a527.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.867 | 0.906 | 0.933 |
| h2m-parser with readability | 4.559 | 4.835 | 4.867 |
| turndown | 4.796 | 5.376 | 6.127 |
| node html markdown | 2.361 | 2.588 | 2.620 |
| mdream | 0.759 | 0.777 | 0.841 |

### file_52

- Size: 46587 bytes
- File: 6a59bd96489c98226c72f0245bac98a4b09aa0516ebfe4982233a6c33d129691.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.558 | 0.580 | 0.585 |
| h2m-parser with readability | 3.707 | 3.976 | 4.051 |
| turndown | 2.705 | 2.947 | 3.025 |
| node html markdown | 1.739 | 1.991 | 2.035 |
| mdream | 0.802 | 0.903 | 0.958 |

### file_53

- Size: 59176 bytes
- File: 6b095375a53dfc7994a032e2efac70f43a4fac9303d549256d88b8f7cecadd50.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.598 | 0.633 | 0.673 |
| h2m-parser with readability | 4.471 | 4.733 | 4.756 |
| turndown | 2.776 | 2.967 | 3.794 |
| node html markdown | 1.219 | 1.454 | 1.468 |
| mdream | 0.235 | 0.242 | 0.243 |

### file_54

- Size: 227057 bytes
- File: 6b817bedb8d6402bab160ed6d2b99256163bd3aef20deae3015f74e5bb253e55.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.354 | 1.468 | 1.476 |
| h2m-parser with readability | 9.374 | 14.160 | 17.012 |
| turndown | 8.365 | 11.394 | 11.674 |
| node html markdown | 3.523 | 3.938 | 3.986 |
| mdream | 0.707 | 0.768 | 0.803 |

### file_55

- Size: 75425 bytes
- File: 6d30abed88489774017024b17cdb1928d9a2b45bb79767515383b8444e9601b2.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.888 | 0.998 | 1.016 |
| h2m-parser with readability | 2.787 | 3.053 | 3.101 |
| turndown | 3.730 | 4.829 | 4.982 |
| node html markdown | 3.428 | 3.653 | 3.669 |
| mdream | 1.399 | 1.465 | 1.510 |

### file_56

- Size: 123582 bytes
- File: 71bf3c23c5d3fff9cec67606fde6547c8866ae8aa95f5991651d94c68df4ad1d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.538 | 1.662 | 1.700 |
| h2m-parser with readability | 8.764 | 13.617 | 15.359 |
| turndown | 6.707 | 8.013 | 8.166 |
| node html markdown | 5.367 | 5.728 | 5.753 |
| mdream | 1.263 | 1.354 | 1.394 |

### file_57

- Size: 90590 bytes
- File: 71cb773c42c94b75d41c059a27dd10b763443a71dbb6dd202402843de8a5e331.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.858 | 1.001 | 1.020 |
| h2m-parser with readability | 5.788 | 6.081 | 6.248 |
| turndown | 4.133 | 5.137 | 5.266 |
| node html markdown | 2.122 | 2.337 | 2.372 |
| mdream | 1.078 | 1.100 | 1.113 |

### file_58

- Size: 139105 bytes
- File: 72e78dee157bdf3e8a9a9f07e54a98a3714ea2998e2c2e2a94c46dbe92176feb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.117 | 2.287 | 2.336 |
| h2m-parser with readability | 9.850 | 15.003 | 18.717 |
| turndown | 6.283 | 8.239 | 8.368 |
| node html markdown | 11.116 | 11.907 | 12.157 |
| mdream | 1.255 | 1.319 | 1.350 |

### file_59

- Size: 99162 bytes
- File: 72ecfb3f60f4e8a6103916f2041ce9a55c4ef1e31477f9a8ffb7f4d3bba8c559.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.486 | 1.582 | 1.620 |
| h2m-parser with readability | 14.791 | 21.016 | 21.516 |
| turndown | 8.080 | 9.007 | 9.099 |
| node html markdown | 6.591 | 6.898 | 6.916 |
| mdream | 0.188 | 0.194 | 0.198 |

### file_60

- Size: 100264 bytes
- File: 73c175cdf9d5e065351ecf2220510088904adb77b49211cdd99e43e5870e06c2.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.088 | 1.162 | 1.194 |
| h2m-parser with readability | 13.121 | 16.728 | 16.940 |
| turndown | 4.417 | 5.242 | 6.004 |
| node html markdown | 2.546 | 2.915 | 2.944 |
| mdream | 1.398 | 1.434 | 1.447 |

### file_61

- Size: 388826 bytes
- File: 74e8bc94abea7c60f022d8d3f672f80e59e3e126735fae0b5ee5914ff2fce48e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 4.701 | 4.943 | 5.136 |
| h2m-parser with readability | 25.850 | 33.382 | 34.064 |
| turndown | 30.367 | 31.658 | 32.156 |
| node html markdown | 15.399 | 15.705 | 15.823 |
| mdream | 6.477 | 6.610 | 6.774 |

### file_62

- Size: 41388 bytes
- File: 7a426de207434e419a65eead0f4b46c8a479429d8429c36dc03b033d7e4891df.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.455 | 0.481 | 0.491 |
| h2m-parser with readability | 4.051 | 4.400 | 4.414 |
| turndown | 2.790 | 3.033 | 3.092 |
| node html markdown | 0.824 | 0.982 | 1.095 |
| mdream | 0.068 | 0.070 | 0.070 |

### file_63

- Size: 180017 bytes
- File: 7b7ffca82db8f721d6e5a8e4e65e60885af5eee4b9f28beb6b8363bb70c820f9.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.453 | 2.639 | 2.683 |
| h2m-parser with readability | 11.225 | 20.561 | 21.217 |
| turndown | 11.217 | 13.210 | 13.325 |
| node html markdown | 11.753 | 12.181 | 12.243 |
| mdream | 0.045 | 0.049 | 0.050 |

### file_64

- Size: 89817 bytes
- File: 7e26f2e426fef3c1a370382e7827ef2e530a2ff0c2cea7641ebb596a4a1b8008.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.990 | 1.121 | 1.160 |
| h2m-parser with readability | 5.822 | 6.131 | 6.532 |
| turndown | 5.924 | 7.344 | 7.379 |
| node html markdown | 2.930 | 3.259 | 3.292 |
| mdream | 1.818 | 1.925 | 1.930 |

### file_65

- Size: 103236 bytes
- File: 7e2d19ccbb3b4029dddf26557555278babdac18bb78a742052fd946001c28e4e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.584 | 1.717 | 1.749 |
| h2m-parser with readability | 15.219 | 20.907 | 21.355 |
| turndown | 8.372 | 9.293 | 9.443 |
| node html markdown | 6.796 | 7.128 | 7.163 |
| mdream | 2.196 | 2.304 | 2.337 |

### file_66

- Size: 78718 bytes
- File: 7e54e701ac39a9046d6eeb0ae75d2138733b66b30b5211e7f3245dd6dc3ca36c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.819 | 0.896 | 0.948 |
| h2m-parser with readability | 9.685 | 12.231 | 15.523 |
| turndown | 4.334 | 5.367 | 5.656 |
| node html markdown | 2.418 | 2.783 | 2.838 |
| mdream | 0.331 | 0.359 | 0.362 |

### file_67

- Size: 65198 bytes
- File: 7e91eb56692c91312a3dc3e7b769a2916029ef3d9e431d056d5f548c0f771d16.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.746 | 0.808 | 0.860 |
| h2m-parser with readability | 5.457 | 9.008 | 11.160 |
| turndown | 3.580 | 4.190 | 4.866 |
| node html markdown | 2.213 | 2.490 | 2.542 |
| mdream | 1.032 | 1.095 | 1.167 |

### file_68

- Size: 83251 bytes
- File: 7fc58a2d32d5b8d5fa9b918453a284acc71703ccfa0f0c89ec292b4245fd0521.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.039 | 1.178 | 1.203 |
| h2m-parser with readability | 5.287 | 5.711 | 5.849 |
| turndown | 7.703 | 9.161 | 9.328 |
| node html markdown | 3.666 | 3.958 | 3.988 |
| mdream | 1.397 | 1.451 | 1.520 |

### file_69

- Size: 66855 bytes
- File: 81d304541f62a6aaf29494766718ab8e58e95a8e784613e75f106cdef17868d6.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.878 | 0.979 | 1.007 |
| h2m-parser with readability | 5.636 | 6.132 | 6.438 |
| turndown | 3.847 | 4.176 | 5.169 |
| node html markdown | 2.452 | 2.662 | 2.708 |
| mdream | 1.085 | 1.174 | 1.210 |

### file_70

- Size: 42437 bytes
- File: 83c362b1373f55d45fdad0edee4d2885cafd0da3f2afb146cf2822448c3c4104.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.482 | 0.536 | 0.558 |
| h2m-parser with readability | 3.122 | 3.328 | 3.368 |
| turndown | 2.205 | 2.455 | 2.521 |
| node html markdown | 0.634 | 0.684 | 0.705 |
| mdream | 0.660 | 0.741 | 0.796 |

### file_71

- Size: 126437 bytes
- File: 84a7e7d5f61c90050a326bb74ac3a57899fdba4b755bd50df01a053c262d354e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.466 | 1.582 | 1.596 |
| h2m-parser with readability | 14.776 | 19.717 | 19.993 |
| turndown | 6.534 | 8.076 | 8.144 |
| node html markdown | 3.437 | 3.761 | 3.802 |
| mdream | 1.345 | 1.483 | 1.506 |

### file_72

- Size: 95344 bytes
- File: 8a1eb64f950f2f43097577c244fb38a35660f50a88c4305b23a8f24f254da8cb.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.143 | 1.264 | 1.307 |
| h2m-parser with readability | 7.111 | 7.540 | 13.233 |
| turndown | 6.239 | 7.693 | 7.769 |
| node html markdown | 3.468 | 3.701 | 3.742 |
| mdream | 1.979 | 2.085 | 2.109 |

### file_73

- Size: 79924 bytes
- File: 8a701b6ec1c56e2c37357030da0b4b10af4187f069a988e12c2f91d2ba40cdc1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.750 | 0.801 | 0.828 |
| h2m-parser with readability | 7.337 | 7.764 | 11.507 |
| turndown | 3.272 | 3.547 | 4.121 |
| node html markdown | 1.458 | 1.625 | 1.674 |
| mdream | 1.073 | 1.131 | 1.174 |

### file_74

- Size: 167983 bytes
- File: 8a82ce22fec5e3656dad3d55e585727c88c94808ad92e37a0f6e99dcb3888800.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.205 | 2.415 | 2.454 |
| h2m-parser with readability | 13.386 | 20.495 | 20.904 |
| turndown | 10.537 | 12.655 | 12.904 |
| node html markdown | 10.084 | 10.314 | 10.356 |
| mdream | 0.047 | 0.049 | 0.050 |

### file_75

- Size: 101361 bytes
- File: 8a9d17a1e5b1866abc7b9263fabbc428e5299c7443ecad6cc56c0076287fe11a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.827 | 0.932 | 0.948 |
| h2m-parser with readability | 3.293 | 3.530 | 3.639 |
| turndown | 3.195 | 3.564 | 3.610 |
| node html markdown | 1.817 | 2.107 | 2.117 |
| mdream | 1.257 | 1.276 | 1.285 |

### file_76

- Size: 32087 bytes
- File: 8bd6d9bcba689408767f770d69f12b59c3f092e73cffcc9332261fbab4aa16e1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.292 | 0.300 | 0.307 |
| h2m-parser with readability | 2.162 | 2.305 | 2.396 |
| turndown | 1.632 | 1.730 | 1.774 |
| node html markdown | 0.409 | 0.425 | 0.433 |
| mdream | 0.447 | 0.537 | 0.537 |

### file_77

- Size: 80418 bytes
- File: 8c0dd0456453aeff3f66d053710f18adc1a2fc0f1f3a0c95a3e166e41ffb737d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.798 | 0.822 | 0.827 |
| h2m-parser with readability | 7.071 | 7.310 | 10.724 |
| turndown | 4.126 | 5.409 | 5.483 |
| node html markdown | 2.301 | 2.584 | 2.603 |
| mdream | 0.316 | 0.333 | 0.334 |

### file_78

- Size: 171100 bytes
- File: 8c1a780dec8c1a5ea0344514524f53b2b580ce87083e0a756ade3d83627d5653.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.180 | 2.291 | 2.345 |
| h2m-parser with readability | 9.463 | 15.076 | 19.082 |
| turndown | 9.912 | 11.749 | 11.808 |
| node html markdown | 10.141 | 10.426 | 10.464 |
| mdream | 0.047 | 0.048 | 0.048 |

### file_79

- Size: 152242 bytes
- File: 8cbf3b144736ffc4adda5fe7105e7fd1413dcc1955110829d849a658aa722bea.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.572 | 1.674 | 1.738 |
| h2m-parser with readability | 6.821 | 7.299 | 10.435 |
| turndown | 6.064 | 7.083 | 7.120 |
| node html markdown | 4.941 | 5.216 | 5.263 |
| mdream | 2.403 | 2.463 | 2.515 |

### file_80

- Size: 69248 bytes
- File: 8cfa9d30e2b66b991461423012906121661cd9c8809f564eabb660149577864d.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.620 | 0.657 | 0.666 |
| h2m-parser with readability | 3.349 | 3.519 | 3.551 |
| turndown | 3.369 | 3.793 | 4.557 |
| node html markdown | 1.546 | 1.846 | 1.907 |
| mdream | 0.900 | 0.947 | 0.963 |

### file_81

- Size: 100091 bytes
- File: 8d612a03fa42a2fb014b59534c46c9590da90fbeb91ac50938cdfa36dd274e23.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.553 | 1.722 | 1.740 |
| h2m-parser with readability | 14.384 | 20.166 | 20.401 |
| turndown | 8.495 | 9.551 | 9.613 |
| node html markdown | 7.189 | 7.969 | 8.287 |
| mdream | 2.228 | 2.340 | 2.355 |

### file_82

- Size: 158892 bytes
- File: 8faa3156452fa9d0667617c406eb9b6458b48d7b8c36cf2bf804fba290b302f5.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.652 | 1.818 | 1.858 |
| h2m-parser with readability | 7.583 | 8.148 | 15.622 |
| turndown | 6.600 | 7.466 | 7.552 |
| node html markdown | 4.945 | 5.138 | 5.187 |
| mdream | 2.480 | 2.547 | 2.555 |

### file_83

- Size: 37644 bytes
- File: 9c947bc9fbcb4e2eb0296d858fe193f580e869db7869358af822d7d2d4c0388e.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.576 | 0.602 | 0.610 |
| h2m-parser with readability | 3.207 | 3.414 | 3.448 |
| turndown | 2.155 | 2.314 | 2.392 |
| node html markdown | 1.955 | 2.178 | 2.267 |
| mdream | 0.676 | 0.789 | 0.814 |

### file_84

- Size: 81258 bytes
- File: 9e04cb267a9b128369a11c7f6e5486d43644955dee7f73cc004b9cf1693a11c1.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.885 | 1.024 | 1.039 |
| h2m-parser with readability | 9.993 | 14.978 | 15.711 |
| turndown | 4.426 | 5.683 | 5.785 |
| node html markdown | 2.533 | 2.877 | 2.922 |
| mdream | 0.334 | 0.358 | 0.361 |

### file_85

- Size: 82762 bytes
- File: 9e3c6d40690c1302613f203db178b23f9f18494d2653a1b547086a3973fff93c.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.899 | 0.990 | 1.005 |
| h2m-parser with readability | 7.001 | 7.373 | 10.898 |
| turndown | 4.620 | 5.776 | 5.969 |
| node html markdown | 2.578 | 2.883 | 2.913 |
| mdream | 0.333 | 0.352 | 0.355 |

### file_86

- Size: 141136 bytes
- File: 9f2031ee45a11919452ca2efbc3498672324cda5f76314d7ea10913f63cf3545.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.698 | 2.577 | 2.740 |
| h2m-parser with readability | 6.279 | 6.728 | 11.245 |
| turndown | 5.774 | 7.125 | 7.457 |
| node html markdown | 4.278 | 4.548 | 4.617 |
| mdream | 0.183 | 0.209 | 0.211 |

### file_87

- Size: 80201 bytes
- File: 9fba51a14308353194c537f494ded0ccb27d9f908f252690b083d48db64ea15a.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.827 | 0.907 | 0.910 |
| h2m-parser with readability | 7.519 | 8.091 | 11.866 |
| turndown | 4.372 | 5.491 | 5.646 |
| node html markdown | 2.285 | 2.640 | 2.673 |
| mdream | 0.293 | 0.307 | 0.312 |

### file_88

- Size: 587 bytes
- File: simple.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.018 | 0.019 | 0.019 |
| h2m-parser with readability | 0.609 | 0.653 | 0.667 |
| turndown | 0.072 | 0.084 | 0.085 |
| node html markdown | 0.035 | 0.040 | 0.042 |
| mdream | 0.032 | 0.049 | 0.051 |

### file_89

- Size: 1813514 bytes
- File: wikipedia-largest.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 33.908 | 37.195 | 38.000 |
| h2m-parser with readability | 645.631 | 916.483 | 938.031 |
| turndown | 192.002 | 198.932 | 199.174 |
| node html markdown | 14049.153 | 14410.806 | 14431.159 |
| mdream | 49.764 | 50.351 | 50.357 |

### file_90

- Size: 166054 bytes
- File: wikipedia-small.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.182 | 2.329 | 2.338 |
| h2m-parser with readability | 18.984 | 25.264 | 25.878 |
| turndown | 9.786 | 11.381 | 11.589 |
| node html markdown | 9.053 | 9.373 | 9.401 |
| mdream | 2.894 | 2.989 | 3.018 |

