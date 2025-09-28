# h2m-parser Benchmark Results

Generated: 2025-09-28T12:07:06.880Z

## Test Configuration

- Iterations: 100
- Dataset: /Users/gustavovalverde/dev/personal/hgtm/tests/fixtures
- Readability tested: Yes

## Results by File

### tiny

- Size: 18 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.013 | 0.017 | 0.019 |
| h2m-parser with readability | 0.192 | 0.257 | 0.286 |
| turndown | 0.022 | 0.041 | 0.044 |
| node html markdown | 0.010 | 0.014 | 0.016 |
| mdream | 0.004 | 0.005 | 0.006 |

### small

- Size: 84 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.014 | 0.021 | 0.022 |
| h2m-parser with readability | 0.176 | 0.212 | 0.227 |
| turndown | 0.044 | 0.062 | 0.066 |
| node html markdown | 0.025 | 0.038 | 0.044 |
| mdream | 0.012 | 0.015 | 0.016 |

### medium

- Size: 369 bytes

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.014 | 0.016 | 0.018 |
| h2m-parser with readability | 0.227 | 0.291 | 0.301 |
| turndown | 0.045 | 0.052 | 0.053 |
| node html markdown | 0.020 | 0.022 | 0.022 |
| mdream | 0.019 | 0.030 | 0.033 |

### file_1

- Size: 89721 bytes
- File: 039c4b966d1f2a0c589ac0aad211fe65500ad...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.461 | 1.635 | 1.643 |
| h2m-parser with readability | 6.650 | 7.309 | 13.460 |
| turndown | 6.020 | 7.390 | 7.497 |
| node html markdown | 3.103 | 3.442 | 3.509 |
| mdream | 1.693 | 1.829 | 1.885 |

### file_2

- Size: 70337 bytes
- File: 06ed0a833361190536a4f61888354e07dccaa...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.202 | 1.314 | 1.332 |
| h2m-parser with readability | 5.094 | 5.330 | 5.426 |
| turndown | 4.337 | 4.680 | 5.691 |
| node html markdown | 2.103 | 2.346 | 2.386 |
| mdream | 0.175 | 0.413 | 0.414 |

### file_3

- Size: 160839 bytes
- File: 078cdb456d1beb698aeed86e0f2161e442e94...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 3.136 | 3.348 | 3.393 |
| h2m-parser with readability | 12.587 | 17.373 | 17.899 |
| turndown | 9.244 | 11.204 | 11.337 |
| node html markdown | 4.034 | 4.219 | 4.245 |
| mdream | 0.265 | 0.279 | 0.281 |

### file_4

- Size: 99724 bytes
- File: 0a8c510c3691d8e68ccc749559680257a382f...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.119 | 1.210 | 1.217 |
| h2m-parser with readability | 6.266 | 6.619 | 10.081 |
| turndown | 4.513 | 4.904 | 6.049 |
| node html markdown | 2.406 | 2.710 | 2.739 |
| mdream | 1.044 | 1.111 | 1.117 |

### file_5

- Size: 105057 bytes
- File: 0e55dcdbeb54c88ee87942b9fef7ea5398fa9...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.633 | 1.743 | 1.753 |
| h2m-parser with readability | 7.583 | 7.894 | 13.949 |
| turndown | 6.520 | 7.875 | 8.089 |
| node html markdown | 3.319 | 3.644 | 3.675 |
| mdream | 0.531 | 0.564 | 0.570 |

### file_6

- Size: 94725 bytes
- File: 17ca85324662023ba21666b3ca5d5d37a92b2...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.754 | 1.868 | 1.876 |
| h2m-parser with readability | 7.492 | 8.532 | 14.668 |
| turndown | 8.098 | 9.488 | 9.501 |
| node html markdown | 4.577 | 4.782 | 4.840 |
| mdream | 1.227 | 1.306 | 1.314 |

### file_7

- Size: 62759 bytes
- File: 19fe8f574b7420277862728929d83dd74d7aa...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.965 | 1.040 | 1.049 |
| h2m-parser with readability | 5.102 | 5.428 | 5.493 |
| turndown | 4.309 | 4.584 | 5.882 |
| node html markdown | 2.198 | 2.474 | 2.506 |
| mdream | 0.517 | 0.590 | 0.605 |

### file_8

- Size: 41355 bytes
- File: 1a2c2f9fe410c836bb94e85c85625dbe8174f...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.519 | 0.571 | 0.586 |
| h2m-parser with readability | 3.234 | 3.421 | 3.430 |
| turndown | 2.169 | 2.340 | 2.379 |
| node html markdown | 0.607 | 0.684 | 0.693 |
| mdream | 0.621 | 0.650 | 0.659 |

### file_9

- Size: 61437 bytes
- File: 1bbc7f62e80e44afd533e896c0168c3b18f1e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.917 | 1.027 | 1.048 |
| h2m-parser with readability | 4.938 | 5.283 | 5.353 |
| turndown | 3.334 | 3.536 | 3.590 |
| node html markdown | 1.903 | 2.136 | 2.188 |
| mdream | 1.068 | 1.119 | 1.133 |

### file_10

- Size: 177823 bytes
- File: 1d43b4816bdba5825165dc21558d9eafb9f65...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 3.042 | 3.186 | 3.234 |
| h2m-parser with readability | 6.577 | 6.917 | 6.969 |
| turndown | 7.978 | 10.158 | 10.260 |
| node html markdown | 2.676 | 2.943 | 2.965 |
| mdream | 0.017 | 0.018 | 0.018 |

### file_11

- Size: 139469 bytes
- File: 1de0efed4d661163ff8414e8ca69f45a49efd...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.542 | 2.689 | 2.699 |
| h2m-parser with readability | 21.540 | 28.027 | 28.251 |
| turndown | 9.487 | 11.177 | 11.255 |
| node html markdown | 6.479 | 6.828 | 6.867 |
| mdream | 0.141 | 0.169 | 0.170 |

### file_12

- Size: 48447 bytes
- File: 1e62a223bca12adda6410b1789072a2ad7555...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.727 | 0.782 | 0.812 |
| h2m-parser with readability | 3.193 | 3.387 | 3.457 |
| turndown | 2.534 | 2.751 | 2.791 |
| node html markdown | 1.054 | 1.164 | 1.322 |
| mdream | 0.700 | 0.730 | 0.742 |

### file_13

- Size: 94912 bytes
- File: 20f1955819dc2b50d2d10788f73adc72bceb4...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.509 | 1.629 | 1.634 |
| h2m-parser with readability | 5.275 | 5.513 | 5.566 |
| turndown | 4.929 | 6.148 | 6.192 |
| node html markdown | 3.412 | 3.666 | 3.677 |
| mdream | 1.620 | 1.711 | 1.727 |

### file_14

- Size: 67227 bytes
- File: 22c0f41ae560968de5e6b0ef9ecffffeae3f4...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.816 | 0.895 | 0.933 |
| h2m-parser with readability | 4.298 | 4.656 | 4.785 |
| turndown | 3.497 | 3.771 | 3.843 |
| node html markdown | 2.283 | 2.556 | 2.584 |
| mdream | 0.730 | 0.787 | 0.791 |

### file_15

- Size: 69850 bytes
- File: 22c3886e7116464c04c2332c20a013a583799...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.132 | 1.231 | 1.252 |
| h2m-parser with readability | 4.565 | 4.805 | 4.875 |
| turndown | 3.896 | 4.211 | 5.079 |
| node html markdown | 2.378 | 2.697 | 2.729 |
| mdream | 1.016 | 1.070 | 1.080 |

### file_16

- Size: 95103 bytes
- File: 22c4be85802e9602a344fc2cc704093362b91...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.330 | 1.449 | 1.467 |
| h2m-parser with readability | 6.644 | 7.030 | 12.415 |
| turndown | 6.204 | 7.450 | 7.496 |
| node html markdown | 3.106 | 3.405 | 3.451 |
| mdream | 2.044 | 2.130 | 2.148 |

### file_17

- Size: 91296 bytes
- File: 26c3b98f33bb6902f32535235fd7d32792df8...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.307 | 1.401 | 1.414 |
| h2m-parser with readability | 6.507 | 6.955 | 8.358 |
| turndown | 5.415 | 5.770 | 7.116 |
| node html markdown | 3.029 | 3.337 | 3.365 |
| mdream | 0.530 | 0.576 | 0.586 |

### file_18

- Size: 74095 bytes
- File: 2dbf7cd4444617cc60f0e2d2c95b20a535979...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.283 | 1.398 | 1.411 |
| h2m-parser with readability | 4.101 | 4.351 | 4.398 |
| turndown | 3.764 | 4.200 | 4.851 |
| node html markdown | 2.049 | 2.342 | 2.371 |
| mdream | 1.442 | 1.493 | 1.504 |

### file_19

- Size: 141461 bytes
- File: 2fd71e2969106342bab6862bb212ae16ba592...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.156 | 2.268 | 2.306 |
| h2m-parser with readability | 11.001 | 17.885 | 18.458 |
| turndown | 8.302 | 9.981 | 10.031 |
| node html markdown | 6.340 | 6.620 | 6.653 |
| mdream | 1.487 | 1.540 | 1.548 |

### file_20

- Size: 78203 bytes
- File: 35f536ef8c8eba0616f2dc78e6653e1d7d68e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.283 | 1.402 | 1.423 |
| h2m-parser with readability | 7.986 | 8.613 | 14.374 |
| turndown | 5.431 | 6.819 | 6.899 |
| node html markdown | 4.767 | 4.896 | 4.927 |
| mdream | 1.447 | 1.526 | 1.539 |

### file_21

- Size: 78530 bytes
- File: 3b27831099c75b36d5978864ec89575c675c9...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.179 | 1.286 | 1.308 |
| h2m-parser with readability | 5.631 | 5.909 | 5.936 |
| turndown | 5.385 | 6.928 | 7.049 |
| node html markdown | 3.589 | 3.784 | 3.792 |
| mdream | 1.139 | 1.193 | 1.204 |

### file_22

- Size: 50858 bytes
- File: 3f6413c32bffc73b64cb1a2adb237cd19ffc7...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.727 | 0.805 | 0.814 |
| h2m-parser with readability | 4.231 | 4.404 | 4.515 |
| turndown | 3.449 | 3.672 | 4.931 |
| node html markdown | 1.487 | 1.766 | 1.789 |
| mdream | 0.903 | 0.954 | 0.974 |

### file_23

- Size: 160633 bytes
- File: 40d4e50472a8f0d30d68613051be510ed0980...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.278 | 2.443 | 2.477 |
| h2m-parser with readability | 9.806 | 15.623 | 16.045 |
| turndown | 6.913 | 8.972 | 9.003 |
| node html markdown | 3.472 | 3.733 | 3.773 |
| mdream | 0.689 | 0.733 | 0.749 |

### file_24

- Size: 184834 bytes
- File: 42b43887c6dd91353249924745e030eac3a6d...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.312 | 2.447 | 2.472 |
| h2m-parser with readability | 8.705 | 9.109 | 17.214 |
| turndown | 7.292 | 8.570 | 8.598 |
| node html markdown | 6.124 | 6.442 | 6.499 |
| mdream | 0.193 | 0.219 | 0.225 |

### file_25

- Size: 98648 bytes
- File: 44b21071ae6feede3c36d2ab032cd422eb0c6...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.099 | 1.209 | 1.220 |
| h2m-parser with readability | 7.135 | 7.446 | 12.349 |
| turndown | 5.006 | 5.410 | 6.509 |
| node html markdown | 2.472 | 2.755 | 2.787 |
| mdream | 1.056 | 1.144 | 1.161 |

### file_26

- Size: 85583 bytes
- File: 44f750fab67bb9f54f5b5cc90bc34d55cff06...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.377 | 1.492 | 1.508 |
| h2m-parser with readability | 6.199 | 6.552 | 6.868 |
| turndown | 5.515 | 7.014 | 7.088 |
| node html markdown | 5.968 | 6.153 | 6.193 |
| mdream | 1.816 | 1.932 | 1.947 |

### file_27

- Size: 65639 bytes
- File: 45b6063ac2016db7b2fb1f995f0b54ee054fb...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.187 | 1.302 | 1.333 |
| h2m-parser with readability | 5.040 | 5.451 | 5.483 |
| turndown | 4.473 | 4.709 | 6.137 |
| node html markdown | 4.606 | 4.936 | 4.954 |
| mdream | 1.481 | 1.561 | 1.576 |

### file_28

- Size: 53725 bytes
- File: 45efaba666da241d9d069b550890530b65f2a...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.772 | 0.858 | 0.896 |
| h2m-parser with readability | 3.740 | 3.988 | 4.034 |
| turndown | 3.162 | 3.362 | 3.382 |
| node html markdown | 1.598 | 1.882 | 1.904 |
| mdream | 1.035 | 1.083 | 1.095 |

### file_29

- Size: 88224 bytes
- File: 46ab324348ca339dba58238e193f794c3309e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.415 | 1.544 | 1.554 |
| h2m-parser with readability | 11.616 | 15.933 | 16.056 |
| turndown | 4.801 | 5.881 | 6.025 |
| node html markdown | 2.928 | 3.160 | 3.164 |
| mdream | 0.350 | 0.378 | 0.381 |

### file_30

- Size: 52935 bytes
- File: 46ed10778ec7c1292e624e1a72a2a0899f8ab...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.829 | 0.900 | 0.919 |
| h2m-parser with readability | 3.689 | 3.897 | 3.945 |
| turndown | 2.957 | 3.166 | 3.235 |
| node html markdown | 2.022 | 2.310 | 2.351 |
| mdream | 0.887 | 0.945 | 0.953 |

### file_31

- Size: 166944 bytes
- File: 4b8debc51d3d9598ad4552cc7a591d200a6c7...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.383 | 2.539 | 2.593 |
| h2m-parser with readability | 8.921 | 9.771 | 15.861 |
| turndown | 7.331 | 9.370 | 9.534 |
| node html markdown | 3.436 | 3.753 | 3.768 |
| mdream | 0.694 | 0.740 | 0.750 |

### file_32

- Size: 97808 bytes
- File: 4bf8e536214f987f4a0bf6ca7d233619d30bd...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.445 | 1.561 | 1.593 |
| h2m-parser with readability | 7.324 | 7.705 | 11.866 |
| turndown | 6.553 | 7.770 | 7.782 |
| node html markdown | 3.489 | 3.803 | 3.817 |
| mdream | 2.086 | 2.179 | 2.222 |

### file_33

- Size: 90241 bytes
- File: 4e0e399d24fe145def4817facccb0ff79e305...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.339 | 1.478 | 1.502 |
| h2m-parser with readability | 6.160 | 6.449 | 6.907 |
| turndown | 6.034 | 7.414 | 7.548 |
| node html markdown | 3.082 | 3.434 | 3.446 |
| mdream | 1.923 | 2.018 | 2.034 |

### file_34

- Size: 166420 bytes
- File: 4f454cb97e9b77d94c10ed8a6a35cd2eff167...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.015 | 2.124 | 2.142 |
| h2m-parser with readability | 8.156 | 8.450 | 16.636 |
| turndown | 6.986 | 8.376 | 8.441 |
| node html markdown | 5.895 | 6.272 | 6.318 |
| mdream | 0.192 | 0.220 | 0.221 |

### file_35

- Size: 68778 bytes
- File: 4f83531b9fc91fd1e0062e43200669cd82cc3...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.174 | 1.281 | 1.284 |
| h2m-parser with readability | 3.432 | 3.644 | 3.659 |
| turndown | 3.481 | 3.803 | 4.728 |
| node html markdown | 1.509 | 1.830 | 1.957 |
| mdream | 0.952 | 1.018 | 1.030 |

### file_36

- Size: 167544 bytes
- File: 4fe5472ba89db38e20daef6025108310c5212...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.887 | 3.037 | 3.053 |
| h2m-parser with readability | 16.241 | 22.314 | 22.580 |
| turndown | 10.653 | 12.391 | 12.531 |
| node html markdown | 9.550 | 9.765 | 9.793 |
| mdream | 0.401 | 0.438 | 0.450 |

### file_37

- Size: 84444 bytes
- File: 5a012f66c2bf0c70a0744c7483478aaa0c1a2...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.483 | 1.611 | 1.639 |
| h2m-parser with readability | 7.018 | 7.563 | 11.633 |
| turndown | 6.126 | 7.336 | 7.530 |
| node html markdown | 6.615 | 6.921 | 7.032 |
| mdream | 1.719 | 1.787 | 1.816 |

### file_38

- Size: 69828 bytes
- File: 5bc9df3a36efb57a22edf862cec6a28eb112e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.984 | 1.074 | 1.089 |
| h2m-parser with readability | 8.233 | 8.501 | 13.333 |
| turndown | 5.030 | 5.465 | 6.360 |
| node html markdown | 2.493 | 2.733 | 2.778 |
| mdream | 1.337 | 1.397 | 1.430 |

### file_39

- Size: 66504 bytes
- File: 5c83c2d71f97e2b5a979f197fbae6773dee68...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.128 | 1.238 | 1.263 |
| h2m-parser with readability | 5.401 | 5.647 | 5.726 |
| turndown | 4.384 | 4.754 | 5.799 |
| node html markdown | 2.957 | 3.167 | 3.180 |
| mdream | 1.338 | 1.387 | 1.403 |

### file_40

- Size: 76713 bytes
- File: 5de3db78f95172797a51b3b3b2cdc4caeb63a...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.122 | 1.205 | 1.216 |
| h2m-parser with readability | 9.654 | 13.839 | 14.463 |
| turndown | 4.096 | 4.281 | 5.476 |
| node html markdown | 2.086 | 2.375 | 2.392 |
| mdream | 0.346 | 0.370 | 0.378 |

### file_41

- Size: 157066 bytes
- File: 5f081a0a9d1a1ce3b0e53603ecd8bde789478...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.281 | 2.409 | 2.432 |
| h2m-parser with readability | 9.404 | 14.217 | 16.451 |
| turndown | 8.041 | 9.775 | 9.834 |
| node html markdown | 5.533 | 5.870 | 5.919 |
| mdream | 1.084 | 1.145 | 1.151 |

### file_42

- Size: 21734 bytes
- File: 5f8b89390d3fc01c6a80728ba2aee597fea1d...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.299 | 0.325 | 0.349 |
| h2m-parser with readability | 1.842 | 1.962 | 1.974 |
| turndown | 1.443 | 1.579 | 1.599 |
| node html markdown | 0.411 | 0.442 | 0.456 |
| mdream | 0.350 | 0.361 | 0.363 |

### file_43

- Size: 91883 bytes
- File: 5f8c9f60be2250f694094ee1ca5deb9df1047...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.372 | 1.496 | 1.520 |
| h2m-parser with readability | 7.322 | 7.730 | 13.763 |
| turndown | 5.609 | 7.055 | 7.325 |
| node html markdown | 4.239 | 4.723 | 4.797 |
| mdream | 1.271 | 1.339 | 1.356 |

### file_44

- Size: 124858 bytes
- File: 5fbfe3905c71925b1b3a875a3111073e5d099...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.582 | 1.717 | 1.736 |
| h2m-parser with readability | 6.865 | 7.122 | 10.838 |
| turndown | 5.146 | 6.352 | 6.520 |
| node html markdown | 4.166 | 4.354 | 4.369 |
| mdream | 0.530 | 0.582 | 0.586 |

### file_45

- Size: 185748 bytes
- File: 60b8aff17382f2fd02584645ef66e517b41f7...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.199 | 2.340 | 2.355 |
| h2m-parser with readability | 11.154 | 18.227 | 18.987 |
| turndown | 8.786 | 10.599 | 10.723 |
| node html markdown | 6.139 | 6.473 | 6.516 |
| mdream | 0.395 | 0.433 | 0.444 |

### file_46

- Size: 172926 bytes
- File: 60bccec4069d54a6889bfcda785c0f3066a70...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.855 | 3.022 | 3.078 |
| h2m-parser with readability | 13.500 | 20.341 | 20.418 |
| turndown | 14.242 | 15.327 | 15.446 |
| node html markdown | 7.344 | 7.599 | 7.611 |
| mdream | 3.083 | 3.198 | 3.225 |

### file_47

- Size: 42840 bytes
- File: 60cc80fb25f0b2ebdb2e6835ab7bfd3d26362...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.823 | 1.631 | 1.808 |
| h2m-parser with readability | 3.277 | 3.452 | 3.570 |
| turndown | 2.252 | 2.385 | 2.410 |
| node html markdown | 0.649 | 0.690 | 0.706 |
| mdream | 0.652 | 0.687 | 0.690 |

### file_48

- Size: 137969 bytes
- File: 61adb9c208d9c67253b4413ef7ec2d010edae...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.069 | 2.225 | 2.253 |
| h2m-parser with readability | 10.309 | 18.722 | 19.342 |
| turndown | 5.906 | 7.681 | 7.791 |
| node html markdown | 3.373 | 3.701 | 3.709 |
| mdream | 1.489 | 1.565 | 1.570 |

### file_49

- Size: 120011 bytes
- File: 61d8052b19ed9885651ed1110ddcccc001f9e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.513 | 1.656 | 1.662 |
| h2m-parser with readability | 7.361 | 7.603 | 11.662 |
| turndown | 4.905 | 6.221 | 6.318 |
| node html markdown | 3.923 | 4.162 | 4.202 |
| mdream | 0.511 | 0.587 | 0.603 |

### file_50

- Size: 66809 bytes
- File: 63c6d5256b8ce1098b5688eb5fafa747e9467...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.057 | 1.181 | 1.219 |
| h2m-parser with readability | 4.636 | 4.876 | 4.923 |
| turndown | 3.987 | 4.485 | 5.299 |
| node html markdown | 1.757 | 2.080 | 2.100 |
| mdream | 0.694 | 0.757 | 0.773 |

### file_51

- Size: 82725 bytes
- File: 64bf40da8348d808ef103cc5529fd268fec46...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.308 | 1.432 | 1.460 |
| h2m-parser with readability | 4.701 | 4.992 | 5.040 |
| turndown | 4.814 | 6.142 | 6.273 |
| node html markdown | 2.443 | 2.756 | 2.764 |
| mdream | 0.793 | 0.844 | 0.856 |

### file_52

- Size: 46587 bytes
- File: 6a59bd96489c98226c72f0245bac98a4b09aa...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.643 | 0.688 | 0.724 |
| h2m-parser with readability | 3.806 | 4.009 | 4.055 |
| turndown | 2.720 | 2.905 | 3.031 |
| node html markdown | 1.779 | 2.089 | 2.118 |
| mdream | 0.802 | 0.842 | 0.860 |

### file_53

- Size: 59176 bytes
- File: 6b095375a53dfc7994a032e2efac70f43a4fa...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.938 | 1.010 | 1.044 |
| h2m-parser with readability | 4.642 | 4.949 | 4.956 |
| turndown | 2.833 | 3.114 | 3.890 |
| node html markdown | 1.236 | 1.463 | 1.509 |
| mdream | 0.265 | 0.304 | 0.311 |

### file_54

- Size: 227057 bytes
- File: 6b817bedb8d6402bab160ed6d2b99256163bd...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 3.082 | 3.270 | 3.326 |
| h2m-parser with readability | 9.991 | 17.674 | 18.262 |
| turndown | 8.423 | 11.365 | 11.521 |
| node html markdown | 3.507 | 3.885 | 3.924 |
| mdream | 0.713 | 0.763 | 0.797 |

### file_55

- Size: 75425 bytes
- File: 6d30abed88489774017024b17cdb1928d9a2b...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.254 | 1.369 | 1.390 |
| h2m-parser with readability | 2.687 | 2.868 | 2.914 |
| turndown | 3.642 | 3.877 | 4.781 |
| node html markdown | 3.492 | 3.664 | 3.737 |
| mdream | 1.470 | 1.561 | 1.576 |

### file_56

- Size: 123582 bytes
- File: 71bf3c23c5d3fff9cec67606fde6547c8866a...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.751 | 1.859 | 1.865 |
| h2m-parser with readability | 8.901 | 16.089 | 16.318 |
| turndown | 6.690 | 8.042 | 8.163 |
| node html markdown | 5.343 | 5.662 | 5.692 |
| mdream | 1.274 | 1.342 | 1.350 |

### file_57

- Size: 90590 bytes
- File: 71cb773c42c94b75d41c059a27dd10b763443...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.368 | 1.476 | 1.498 |
| h2m-parser with readability | 5.833 | 6.226 | 6.657 |
| turndown | 4.151 | 5.165 | 5.312 |
| node html markdown | 2.157 | 2.435 | 2.455 |
| mdream | 1.110 | 1.185 | 1.225 |

### file_58

- Size: 139105 bytes
- File: 72e78dee157bdf3e8a9a9f07e54a98a3714ea...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.278 | 2.412 | 2.442 |
| h2m-parser with readability | 10.065 | 14.323 | 19.067 |
| turndown | 6.344 | 8.306 | 8.505 |
| node html markdown | 11.098 | 11.448 | 11.508 |
| mdream | 1.329 | 1.385 | 1.404 |

### file_59

- Size: 99162 bytes
- File: 72ecfb3f60f4e8a6103916f2041ce9a55c4ef...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.580 | 1.687 | 1.702 |
| h2m-parser with readability | 14.991 | 21.274 | 21.485 |
| turndown | 8.255 | 9.186 | 9.249 |
| node html markdown | 6.765 | 7.015 | 7.047 |
| mdream | 0.200 | 0.217 | 0.222 |

### file_60

- Size: 100264 bytes
- File: 73c175cdf9d5e065351ecf2220510088904ad...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.188 | 1.263 | 1.276 |
| h2m-parser with readability | 13.645 | 17.300 | 17.438 |
| turndown | 4.332 | 5.812 | 5.984 |
| node html markdown | 2.522 | 2.833 | 2.888 |
| mdream | 1.429 | 1.519 | 1.537 |

### file_61

- Size: 388826 bytes
- File: 74e8bc94abea7c60f022d8d3f672f80e59e3e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 5.018 | 5.179 | 5.181 |
| h2m-parser with readability | 26.009 | 34.578 | 34.788 |
| turndown | 30.743 | 32.012 | 32.199 |
| node html markdown | 15.965 | 16.210 | 16.249 |
| mdream | 6.806 | 7.184 | 7.194 |

### file_62

- Size: 41388 bytes
- File: 7a426de207434e419a65eead0f4b46c8a4794...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.626 | 0.700 | 0.713 |
| h2m-parser with readability | 4.251 | 4.440 | 4.561 |
| turndown | 2.849 | 3.141 | 3.209 |
| node html markdown | 0.822 | 0.954 | 0.999 |
| mdream | 0.065 | 0.068 | 0.070 |

### file_63

- Size: 180017 bytes
- File: 7b7ffca82db8f721d6e5a8e4e65e60885af5e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 3.095 | 3.277 | 3.290 |
| h2m-parser with readability | 10.925 | 20.060 | 20.460 |
| turndown | 11.155 | 12.982 | 13.079 |
| node html markdown | 11.584 | 12.253 | 12.350 |
| mdream | 0.046 | 0.051 | 0.051 |

### file_64

- Size: 89817 bytes
- File: 7e26f2e426fef3c1a370382e7827ef2e530a2...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.236 | 1.399 | 1.421 |
| h2m-parser with readability | 6.000 | 6.274 | 6.366 |
| turndown | 6.098 | 7.518 | 7.651 |
| node html markdown | 2.945 | 3.296 | 3.323 |
| mdream | 1.865 | 1.937 | 1.942 |

### file_65

- Size: 103236 bytes
- File: 7e2d19ccbb3b4029dddf26557555278babdac...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.652 | 1.773 | 1.785 |
| h2m-parser with readability | 15.395 | 21.284 | 21.589 |
| turndown | 8.498 | 9.332 | 9.398 |
| node html markdown | 7.458 | 8.052 | 8.086 |
| mdream | 2.269 | 2.365 | 2.384 |

### file_66

- Size: 78718 bytes
- File: 7e54e701ac39a9046d6eeb0ae75d2138733b6...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.297 | 1.442 | 1.468 |
| h2m-parser with readability | 9.820 | 15.248 | 15.510 |
| turndown | 4.318 | 5.499 | 5.663 |
| node html markdown | 2.371 | 2.728 | 2.753 |
| mdream | 0.341 | 0.363 | 0.367 |

### file_67

- Size: 65198 bytes
- File: 7e91eb56692c91312a3dc3e7b769a2916029e...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.001 | 1.107 | 1.121 |
| h2m-parser with readability | 4.947 | 5.154 | 5.198 |
| turndown | 3.415 | 3.736 | 4.725 |
| node html markdown | 2.229 | 2.479 | 2.520 |
| mdream | 1.059 | 1.116 | 1.123 |

### file_68

- Size: 83251 bytes
- File: 7fc58a2d32d5b8d5fa9b918453a284acc7170...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.220 | 1.331 | 1.382 |
| h2m-parser with readability | 5.353 | 5.657 | 5.778 |
| turndown | 7.688 | 9.127 | 9.174 |
| node html markdown | 3.510 | 3.805 | 3.833 |
| mdream | 1.427 | 1.490 | 1.498 |

### file_69

- Size: 66855 bytes
- File: 81d304541f62a6aaf29494766718ab8e58e95...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.036 | 1.136 | 1.155 |
| h2m-parser with readability | 5.527 | 5.810 | 5.888 |
| turndown | 3.890 | 4.263 | 4.502 |
| node html markdown | 2.665 | 2.965 | 2.995 |
| mdream | 1.118 | 1.206 | 1.218 |

### file_70

- Size: 42437 bytes
- File: 83c362b1373f55d45fdad0edee4d2885cafd0...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.559 | 0.659 | 0.701 |
| h2m-parser with readability | 3.245 | 3.468 | 3.534 |
| turndown | 2.160 | 2.297 | 2.357 |
| node html markdown | 0.649 | 0.725 | 0.739 |
| mdream | 0.686 | 0.731 | 0.744 |

### file_71

- Size: 126437 bytes
- File: 84a7e7d5f61c90050a326bb74ac3a57899fdb...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.512 | 1.624 | 1.647 |
| h2m-parser with readability | 15.078 | 19.936 | 20.182 |
| turndown | 6.562 | 8.154 | 8.188 |
| node html markdown | 3.400 | 3.720 | 3.742 |
| mdream | 1.365 | 1.478 | 1.485 |

### file_72

- Size: 95344 bytes
- File: 8a1eb64f950f2f43097577c244fb38a35660f...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.413 | 1.545 | 1.576 |
| h2m-parser with readability | 7.191 | 7.403 | 15.694 |
| turndown | 6.386 | 7.831 | 7.864 |
| node html markdown | 3.510 | 3.819 | 3.929 |
| mdream | 1.997 | 2.084 | 2.104 |

### file_73

- Size: 79924 bytes
- File: 8a701b6ec1c56e2c37357030da0b4b10af418...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.798 | 0.852 | 0.868 |
| h2m-parser with readability | 7.580 | 7.763 | 11.951 |
| turndown | 3.203 | 3.444 | 4.706 |
| node html markdown | 1.407 | 1.533 | 1.620 |
| mdream | 1.105 | 1.167 | 1.181 |

### file_74

- Size: 167983 bytes
- File: 8a82ce22fec5e3656dad3d55e585727c88c94...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.939 | 3.125 | 3.166 |
| h2m-parser with readability | 13.141 | 20.820 | 21.071 |
| turndown | 10.243 | 12.135 | 12.158 |
| node html markdown | 10.339 | 10.528 | 10.592 |
| mdream | 0.047 | 0.050 | 0.050 |

### file_75

- Size: 101361 bytes
- File: 8a9d17a1e5b1866abc7b9263fabbc428e5299...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.040 | 1.115 | 1.125 |
| h2m-parser with readability | 3.421 | 3.662 | 3.779 |
| turndown | 3.189 | 3.420 | 3.497 |
| node html markdown | 1.882 | 2.226 | 2.255 |
| mdream | 1.344 | 1.442 | 1.458 |

### file_76

- Size: 32087 bytes
- File: 8bd6d9bcba689408767f770d69f12b59c3f09...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.335 | 0.379 | 0.395 |
| h2m-parser with readability | 2.304 | 2.460 | 2.515 |
| turndown | 1.659 | 1.781 | 1.812 |
| node html markdown | 0.409 | 0.457 | 0.462 |
| mdream | 0.455 | 0.494 | 0.512 |

### file_77

- Size: 80418 bytes
- File: 8c0dd0456453aeff3f66d053710f18adc1a2f...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.229 | 1.335 | 1.353 |
| h2m-parser with readability | 7.680 | 8.015 | 14.030 |
| turndown | 4.324 | 4.694 | 5.689 |
| node html markdown | 2.399 | 2.761 | 2.802 |
| mdream | 0.320 | 0.346 | 0.350 |

### file_78

- Size: 171100 bytes
- File: 8c1a780dec8c1a5ea0344514524f53b2b580c...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.990 | 3.163 | 3.206 |
| h2m-parser with readability | 10.045 | 19.621 | 19.970 |
| turndown | 10.301 | 12.194 | 12.226 |
| node html markdown | 10.536 | 10.770 | 10.790 |
| mdream | 0.048 | 0.049 | 0.050 |

### file_79

- Size: 152242 bytes
- File: 8cbf3b144736ffc4adda5fe7105e7fd1413dc...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.126 | 2.244 | 2.282 |
| h2m-parser with readability | 7.387 | 8.417 | 14.670 |
| turndown | 6.317 | 7.360 | 7.417 |
| node html markdown | 5.065 | 5.308 | 5.339 |
| mdream | 2.457 | 2.584 | 2.596 |

### file_80

- Size: 69248 bytes
- File: 8cfa9d30e2b66b991461423012906121661cd...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.164 | 1.252 | 1.291 |
| h2m-parser with readability | 3.547 | 3.824 | 3.890 |
| turndown | 3.494 | 3.732 | 4.708 |
| node html markdown | 1.553 | 1.903 | 1.962 |
| mdream | 0.955 | 1.008 | 1.011 |

### file_81

- Size: 100091 bytes
- File: 8d612a03fa42a2fb014b59534c46c9590da90...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.611 | 1.736 | 1.743 |
| h2m-parser with readability | 14.831 | 21.094 | 21.188 |
| turndown | 8.323 | 9.225 | 9.253 |
| node html markdown | 6.786 | 6.957 | 6.992 |
| mdream | 2.243 | 2.354 | 2.376 |

### file_82

- Size: 158892 bytes
- File: 8faa3156452fa9d0667617c406eb9b6458b48...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.209 | 2.358 | 2.386 |
| h2m-parser with readability | 7.571 | 8.827 | 15.720 |
| turndown | 6.659 | 7.716 | 7.758 |
| node html markdown | 5.139 | 5.370 | 5.394 |
| mdream | 2.545 | 2.663 | 2.700 |

### file_83

- Size: 37644 bytes
- File: 9c947bc9fbcb4e2eb0296d858fe193f580e86...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.616 | 0.655 | 0.674 |
| h2m-parser with readability | 3.343 | 3.552 | 3.659 |
| turndown | 2.252 | 2.479 | 2.499 |
| node html markdown | 1.969 | 2.261 | 2.274 |
| mdream | 0.675 | 0.729 | 0.735 |

### file_84

- Size: 81258 bytes
- File: 9e04cb267a9b128369a11c7f6e5486d436449...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.278 | 1.376 | 1.402 |
| h2m-parser with readability | 10.029 | 15.304 | 15.561 |
| turndown | 4.481 | 5.768 | 5.805 |
| node html markdown | 2.547 | 2.843 | 2.850 |
| mdream | 0.345 | 0.379 | 0.385 |

### file_85

- Size: 82762 bytes
- File: 9e3c6d40690c1302613f203db178b23f9f184...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.344 | 1.434 | 1.466 |
| h2m-parser with readability | 6.958 | 7.264 | 10.716 |
| turndown | 4.371 | 5.494 | 5.665 |
| node html markdown | 2.596 | 2.899 | 2.914 |
| mdream | 0.340 | 0.373 | 0.385 |

### file_86

- Size: 141136 bytes
- File: 9f2031ee45a11919452ca2efbc3498672324c...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.676 | 1.825 | 1.836 |
| h2m-parser with readability | 6.362 | 6.704 | 13.568 |
| turndown | 5.828 | 7.218 | 7.273 |
| node html markdown | 4.091 | 4.272 | 4.281 |
| mdream | 0.176 | 0.194 | 0.196 |

### file_87

- Size: 80201 bytes
- File: 9fba51a14308353194c537f494ded0ccb27d9...

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 1.237 | 1.366 | 1.385 |
| h2m-parser with readability | 7.626 | 7.862 | 13.854 |
| turndown | 4.320 | 4.580 | 5.640 |
| node html markdown | 2.379 | 2.752 | 2.773 |
| mdream | 0.312 | 0.327 | 0.336 |

### file_88

- Size: 587 bytes
- File: simple.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 0.017 | 0.017 | 0.017 |
| h2m-parser with readability | 0.620 | 0.715 | 0.763 |
| turndown | 0.072 | 0.078 | 0.081 |
| node html markdown | 0.036 | 0.043 | 0.046 |
| mdream | 0.030 | 0.049 | 0.049 |

### file_89

- Size: 1813514 bytes
- File: wikipedia-largest.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 35.230 | 37.290 | 37.356 |
| h2m-parser with readability | 748.785 | 904.152 | 904.607 |
| turndown | 192.583 | 199.360 | 204.423 |
| node html markdown | 12832.591 | 13832.623 | 13897.367 |
| mdream | 51.222 | 51.806 | 52.104 |

### file_90

- Size: 166054 bytes
- File: wikipedia-small.html

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser no readability | 2.477 | 2.639 | 2.679 |
| h2m-parser with readability | 19.436 | 25.952 | 26.087 |
| turndown | 9.512 | 11.101 | 11.169 |
| node html markdown | 9.339 | 9.563 | 9.568 |
| mdream | 2.943 | 3.107 | 3.120 |


---

          "samples": 1
        },
        "turndown": {
          "mean": 13.561208999999508,
          "median": 13.561208999999508,
          "p95": 13.561208999999508,
          "p99": 13.561208999999508,
          "min": 13.561208999999508,
          "max": 13.561208999999508,
          "samples": 1
        },
        "node_html_markdown": {
          "mean": 13.324416999999812,
          "median": 13.324416999999812,
          "p95": 13.324416999999812,
          "p99": 13.324416999999812,
          "min": 13.324416999999812,
          "max": 13.324416999999812,
          "samples": 1
        },
        "mdream": {
          "mean": 4.206583999999566,
          "median": 4.206583999999566,
          "p95": 4.206583999999566,
          "p99": 4.206583999999566,
          "min": 4.206583999999566,
          "max": 4.206583999999566,
          "samples": 1
        }
      }
    }
  ],
  "summary": {
    "averages": {
      "h2mParserNoReadability": 12.18850840000023,
      "h2mParserWithReadability": 131.42214180000002,
      "turndown": 44.825408399999915,
      "nodeHtmlMarkdown": 2466.3085664,
      "mdream": 11.625600200000246,
      "readabilityOverhead": 119.23363339999979
    },
    "comparisons": {
      "vsTurndown": 3.6776779347339223,
      "vsNodeHtmlMarkdown": 202.3470375095244,
      "vsMdream": 0.9538164817608056
    },
    "verdict": "competitive"
  },
  "totalTime": "13.3"
}