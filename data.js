window.SALVAGE_DATA = {
  "title": "The Next Plan Is Already Halfway There: Adaptive Inference with SALVAGE",
  "authors": [
    {
      "name": "He Yang",
      "affiliations": [
        1,
        2
      ],
      "notes": [
        "note-1"
      ]
    },
    {
      "name": "Yuxuan Hou",
      "affiliations": [
        1
      ],
      "notes": []
    },
    {
      "name": "Jianrong Zhang",
      "affiliations": [
        1
      ],
      "notes": []
    },
    {
      "name": "Weijian Deng",
      "affiliations": [
        3
      ],
      "notes": []
    },
    {
      "name": "Zhihua Wang",
      "affiliations": [
        4
      ],
      "notes": []
    },
    {
      "name": "Hehe Fan",
      "affiliations": [
        1
      ],
      "notes": [
        "note-2"
      ]
    }
  ],
  "affiliations": [
    {
      "id": 1,
      "name": "College of Artificial Intelligence, Zhejiang University"
    },
    {
      "id": 2,
      "name": "School of Information and Communication Engineering, University of Electronic Science and Technology of China"
    },
    {
      "id": 3,
      "name": "Tsinghua Shenzhen International Graduate School, Tsinghua University"
    },
    {
      "id": 4,
      "name": "Shanghai Institute for Advanced Study, Zhejiang University"
    }
  ],
  "authorNotes": [
    {
      "id": "note-1",
      "symbol": "*",
      "text": "Work done during internship at Zhejiang University"
    },
    {
      "id": "note-2",
      "symbol": "†",
      "text": "Corresponding author"
    }
  ],
  "abstract": "World action models (WAMs) and vision-language-action (VLA) models predict action chunks but execute only part before replanning. They discard the remaining actions despite their potential usefulness and recompute a new chunk. This raises a question: how much new inference is actually needed? We introduce SALVAGE, a training-free framework that adapts inference using execution feedback. At each replan, SALVAGE selects action reuse, few-step inference, or full inference using displacement error. Interfaces with uninformative motion feedback instead use absolute frame difference. Simulation thresholds are calibrated in one pass per model and suite. Phase overrides and a consecutive-reuse limit constrain cheaper inference. Our results show that SALVAGE substantially accelerates inference while largely preserving task performance. In the seven-model LIBERO evaluation, SALVAGE achieves up to a 2.30× inference speedup, with five models staying within one percentage point of their average full-inference success rates. It also achieves a 2.15× speedup on RoboTwin 2.0 and 1.28–1.58× speedups across four real-robot tasks on the SO-100 and RealMan ECO65 arms. Combining SALVAGE with C³ache further increases the speedup on RoboTwin 2.0 to 3.26×. Our analysis identifies few-step inference as the main source of savings, with execution feedback guiding the choice of computation level.",
  "featured": [
    {
      "id": "featured-rm1",
      "title": "RealMan: pick and place",
      "benchmark": "Real robot",
      "model": "RealMan ECO65",
      "video": "assets/featured-rm1.mp4",
      "poster": "assets/featured-rm1.jpg",
      "hasTiming": true,
      "timingKind": "camera_phase",
      "baselineSeconds": 88.45343333300116,
      "salvageSeconds": 57.09716666700115,
      "speedup": "1.55",
      "playbackRate": 4,
      "phase": "Visible motion to stable placement",
      "progressEnds": [
        22.11335833325029,
        14.274291666750287
      ],
      "contentOnly": true,
      "presentationNote": "Camera clock · 4× playback"
    },
    {
      "id": "featured-rm2",
      "title": "RealMan: ordered stacking",
      "benchmark": "Real robot",
      "model": "RealMan ECO65",
      "video": "assets/featured-rm2.mp4",
      "poster": "assets/featured-rm2.jpg",
      "hasTiming": true,
      "timingKind": "camera_phase",
      "baselineSeconds": 192.06853333300387,
      "salvageSeconds": 149.3993000000046,
      "speedup": "1.29",
      "playbackRate": 6,
      "phase": "Visible motion to stable two-block stack",
      "progressEnds": [
        32.01142222216731,
        24.8998833333341
      ],
      "contentOnly": true,
      "presentationNote": "Camera clock · 6× playback"
    },
    {
      "id": "so1",
      "title": "SO-100: pick and place",
      "benchmark": "Real robot",
      "model": "SO-100",
      "video": "assets/featured-so1.mp4",
      "poster": "assets/featured-so1.jpg",
      "hasTiming": false,
      "timingKind": "frame_replay",
      "progressEnds": [
        7.2,
        7.2
      ],
      "contentOnly": true,
      "presentationNote": "Frame-sequence replay"
    },
    {
      "id": "so2",
      "title": "SO-100: pouring",
      "benchmark": "Real robot",
      "model": "SO-100",
      "video": "assets/featured-so2.mp4",
      "poster": "assets/featured-so2.jpg",
      "hasTiming": false,
      "timingKind": "frame_replay",
      "progressEnds": [
        13.6,
        13.6
      ],
      "contentOnly": true,
      "presentationNote": "Frame-sequence replay"
    }
  ],
  "realRobot": [
    {
      "id": "real-stage-2",
      "title": "Pick and place: transfer the box",
      "benchmark": "Real robot",
      "model": "RealMan ECO65",
      "video": "assets/real-stage-2.mp4",
      "poster": "assets/real-stage-2.jpg",
      "hasTiming": true,
      "timingKind": "camera_phase",
      "baselineSeconds": 33.120766666001145,
      "salvageSeconds": 17.603766667001764,
      "speedup": "1.88",
      "playbackRate": 4,
      "phase": "Transfer, place and release",
      "progressEnds": [
        8.280191666500286,
        4.400941666750441
      ],
      "contentOnly": true,
      "presentationNote": "Camera clock · 4× playback"
    },
    {
      "id": "real-stage-4",
      "title": "Ordered stacking: finish the stack",
      "benchmark": "Real robot",
      "model": "RealMan ECO65",
      "video": "assets/real-stage-4.mp4",
      "poster": "assets/real-stage-4.jpg",
      "hasTiming": true,
      "timingKind": "camera_phase",
      "baselineSeconds": 74.97950000000128,
      "salvageSeconds": 41.541933333006455,
      "speedup": "1.80",
      "playbackRate": 4,
      "phase": "Transfer the light block, stack and release",
      "progressEnds": [
        18.74487500000032,
        10.385483333251614
      ],
      "contentOnly": true,
      "presentationNote": "Camera clock · 4× playback"
    },
    {
      "id": "real-stage-1",
      "title": "Pick and place: acquire the box",
      "benchmark": "Real robot",
      "model": "RealMan ECO65",
      "video": "assets/real-stage-1.mp4",
      "poster": "assets/real-stage-1.jpg",
      "hasTiming": true,
      "timingKind": "camera_phase",
      "baselineSeconds": 55.33266666700001,
      "salvageSeconds": 39.49339999999938,
      "speedup": "1.40",
      "playbackRate": 4,
      "phase": "Approach, grasp and lift",
      "progressEnds": [
        13.833166666750003,
        9.873349999999846
      ],
      "contentOnly": true,
      "presentationNote": "Camera clock · 4× playback"
    },
    {
      "id": "real-stage-3",
      "title": "Ordered stacking: acquire the light block",
      "benchmark": "Real robot",
      "model": "RealMan ECO65",
      "video": "assets/real-stage-3.mp4",
      "poster": "assets/real-stage-3.jpg",
      "hasTiming": true,
      "timingKind": "camera_phase",
      "baselineSeconds": 36.490200000000186,
      "salvageSeconds": 31.676299999991897,
      "speedup": "1.15",
      "playbackRate": 4,
      "phase": "Leave the first placement, grasp and lift the light block",
      "progressEnds": [
        9.122550000000047,
        7.919074999997974
      ],
      "contentOnly": true,
      "presentationNote": "Camera clock · 4× playback"
    }
  ],
  "simulation": [
    {
      "id": "sim-01",
      "title": "Milk into the basket",
      "benchmark": "LIBERO",
      "model": "Fast-WAM",
      "video": "assets/sim-01.mp4",
      "poster": "assets/sim-01.jpg",
      "note": "Matched task and trial; both rollouts succeed.",
      "playbackNote": "Common 1× log-reconstructed rollout time; frame times interpolated between sparse log anchors.",
      "hasTiming": true,
      "approximateTiming": true,
      "baselineSeconds": 9.620253,
      "salvageSeconds": 4.637769,
      "speedup": "2.07",
      "timingKind": "log_reconstruction",
      "progressEnds": [
        9.620253,
        4.637769
      ],
      "contentOnly": true,
      "presentationNote": "Approx. log clock · 1× playback"
    },
    {
      "id": "sim-02",
      "title": "Chocolate pudding into the basket",
      "benchmark": "LIBERO",
      "model": "Fast-WAM",
      "video": "assets/sim-02.mp4",
      "poster": "assets/sim-02.jpg",
      "note": "Matched task and trial; both rollouts succeed.",
      "playbackNote": "Common 1× log-reconstructed rollout time; frame times interpolated between sparse log anchors.",
      "hasTiming": true,
      "approximateTiming": true,
      "baselineSeconds": 10.095012,
      "salvageSeconds": 6.163164,
      "speedup": "1.64",
      "timingKind": "log_reconstruction",
      "progressEnds": [
        10.095012,
        6.163164
      ],
      "contentOnly": true,
      "presentationNote": "Approx. log clock · 1× playback"
    },
    {
      "id": "sim-03",
      "title": "Pick up two bottles",
      "benchmark": "RoboTwin",
      "model": "ImageWAM",
      "video": "assets/sim-03-smoothed.mp4",
      "poster": "assets/sim-03-smoothed.jpg",
      "methodLabels": [
        "Full inference",
        "SALVAGE"
      ],
      "hasTiming": false,
      "timingKind": "frame_replay",
      "displayInterpolation": true,
      "userSuppliedInterpolation": true,
      "playbackNote": "User-supplied smoothed observation replay at 1×; no end-to-end timing.",
      "progressEnds": [
        11.9,
        10.3
      ],
      "contentOnly": true,
      "presentationNote": "Smoothed observation replay · 1×"
    },
    {
      "id": "sim-04",
      "title": "Hand over the block",
      "benchmark": "RoboTwin",
      "model": "ImageWAM",
      "video": "assets/sim-04-smoothed.mp4",
      "poster": "assets/sim-04-smoothed.jpg",
      "methodLabels": [
        "Full inference",
        "SALVAGE"
      ],
      "hasTiming": false,
      "timingKind": "frame_replay",
      "displayInterpolation": true,
      "userSuppliedInterpolation": true,
      "playbackNote": "User-supplied smoothed observation replay at 1×; no end-to-end timing.",
      "progressEnds": [
        29.8,
        25.400000000000002
      ],
      "contentOnly": true,
      "presentationNote": "Smoothed observation replay · 1×"
    }
  ],
  "failures": [
    {
      "id": "failure-real-01",
      "title": "RealMan · Wrong first object",
      "benchmark": "Real robot",
      "model": "π0.5 · RealMan ECO65",
      "video": "assets/failure-real-01.mp4",
      "poster": "assets/failure-real-01.jpg",
      "playbackNote": "Common 4× original camera time; earlier-ended phase freezes. No failure-time speedup asserted.",
      "timingKind": "camera_phase",
      "hasTiming": false,
      "sharedFailure": true,
      "failureReason": "Both policies select the light box first despite the dark-first instruction.",
      "progressEnds": [
        9.020558333249937,
        6.515224999999191
      ],
      "contentOnly": true,
      "presentationNote": "Camera clock · 4× playback"
    },
    {
      "id": "failure-real-02",
      "title": "RealMan · Final stacking failure",
      "benchmark": "Real robot",
      "model": "π0.5 · RealMan ECO65",
      "video": "assets/failure-real-02.mp4",
      "poster": "assets/failure-real-02.jpg",
      "playbackNote": "Common 4× original camera time; earlier-ended phase freezes. No failure-time speedup asserted.",
      "timingKind": "camera_phase",
      "hasTiming": false,
      "sharedFailure": true,
      "failureReason": "Both policies complete the first three stages but fail at the final stack.",
      "progressEnds": [
        19.72776666675054,
        17.032216666499153
      ],
      "contentOnly": true,
      "presentationNote": "Camera clock · 4× playback"
    }
  ],
  "composition": [
    {
      "id": "composition-full-inference",
      "title": "Full inference",
      "benchmark": "LIBERO",
      "model": "Fast-WAM",
      "video": "assets/composition-full-inference.mp4",
      "poster": "assets/composition-full-inference.jpg",
      "methodLabels": [
        "Full inference"
      ],
      "hasTiming": false,
      "timingKind": "log_reconstruction",
      "approximateTiming": true,
      "approxSeconds": 10.095012,
      "ratioAgainstFull": 1.0,
      "syncGroup": "composition",
      "progressEnds": [
        10.095012
      ],
      "contentOnly": true,
      "presentationNote": "Approx. log clock · 1× playback"
    },
    {
      "id": "composition-salvage",
      "title": "SALVAGE",
      "benchmark": "LIBERO",
      "model": "Fast-WAM",
      "video": "assets/composition-salvage.mp4",
      "poster": "assets/composition-salvage.jpg",
      "methodLabels": [
        "SALVAGE"
      ],
      "hasTiming": false,
      "timingKind": "log_reconstruction",
      "approximateTiming": true,
      "approxSeconds": 6.163164,
      "ratioAgainstFull": 1.637959333874614,
      "syncGroup": "composition",
      "progressEnds": [
        6.163164
      ],
      "contentOnly": true,
      "presentationNote": "Approx. log clock · 1× playback"
    },
    {
      "id": "composition-c3ache",
      "title": "C³ache",
      "benchmark": "LIBERO",
      "model": "Fast-WAM",
      "video": "assets/composition-c3ache.mp4",
      "poster": "assets/composition-c3ache.jpg",
      "methodLabels": [
        "C³ache"
      ],
      "hasTiming": false,
      "timingKind": "log_reconstruction",
      "approximateTiming": true,
      "approxSeconds": 7.128056361375881,
      "ratioAgainstFull": 1.4162362765116279,
      "syncGroup": "composition",
      "progressEnds": [
        7.128056361375881
      ],
      "contentOnly": true,
      "presentationNote": "Approx. log clock · 1× playback"
    },
    {
      "id": "composition-salvage-c3ache",
      "title": "SALVAGE + C³ache",
      "benchmark": "LIBERO",
      "model": "Fast-WAM",
      "video": "assets/composition-salvage-c3ache.mp4",
      "poster": "assets/composition-salvage-c3ache.jpg",
      "methodLabels": [
        "SALVAGE + C³ache"
      ],
      "hasTiming": false,
      "timingKind": "log_reconstruction",
      "approximateTiming": true,
      "approxSeconds": 5.349412492269635,
      "ratioAgainstFull": 1.8871253646242776,
      "syncGroup": "composition",
      "progressEnds": [
        5.349412492269635
      ],
      "contentOnly": true,
      "presentationNote": "Approx. log clock · 1× playback"
    }
  ],
  "comparisonFigures": [
    {
      "id": "composition",
      "target": "composition-table",
      "kind": "table",
      "title": "Original Table 5: C³ache composition on LIBERO and RoboTwin, relative to full inference.",
      "image": "assets/composition-original-table.svg",
      "pdf": "assets/composition-original-table.pdf"
    }
  ],
  "citation": "@misc{yang_salvage,\n  title = {The Next Plan Is Already Halfway There: Adaptive Inference with SALVAGE},\n  author = {Yang, He and Hou, Yuxuan and Zhang, Jianrong and Deng, Weijian and Wang, Zhihua and Fan, Hehe},\n  note = {Research manuscript}\n}"
};
