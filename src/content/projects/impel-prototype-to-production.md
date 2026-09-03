---
title: 'IMPEL: from prototype to production inspection platform'
year: 2026
order: 1
tags: [System architecture, Defect detection, Edge deployment]
kind: Platform
detection: 'SYSTEM · ONLINE'
challenge: "IMPEL began as a lab tool written by BrightSpot's founding scientists — one power supply, a consumer camera, single shots of small samples. Ambitions had outgrown the software."
approach: 'Stabilize first, then re-architect: a multiprocessing pub/sub core of local services communicating over dedicated queues and shared memory, concurrent hardware control, and a CUDA-enabled ML pipeline — production-grade concurrency on ordinary line PCs, fully offline.'
draft: false
---

## Where it started

When I joined in 2023, IMPEL was a small PyQt application written by the
company's founding scientists: it drove a single power supply and a consumer
camera, did some basic image processing, and captured single images of small
samples. It had grown organically in the lab, the way lab software does —
brilliant instincts, no architecture.

The first six months were unglamorous: beating the application into shape
until it was a reliable, deployable product with basic capture automation.
No re-architecture yet — just making the thing trustworthy enough to build on.

## The constraint that shaped everything

IMPEL runs under a hard local-execution requirement. Many manufacturers won't
— or can't — let production data touch the cloud, so there is no remote
offload, no elastic compute, no phoning home. Everything has to happen on the
machine sitting at the line.

That constraint became the design's engine. You'd be surprised how much an
ordinary mid-range machine can do if you genuinely use every core and stay
disciplined about passive versus active resource consumption.

## The architecture

The rebuild centered on a multiprocessing pub/sub core, chosen for three
reasons: Python's GIL rules out real concurrency in one process; camera and
power-supply control need tight synchronization that can't wait on a busy
main loop; and I wanted to decouple the monolith into discrete local services
— communicating over dedicated queues and shared memory rather than REST —
that could evolve independently.

Around that core: concurrent control of industrial cameras and arrays of
power supplies, with processing offloaded to a pool of subprocesses, and a
CUDA-enabled machine learning pipeline running object detection on defects
plus instance segmentation of specific defect types — segmentation being what
turns "there's a defect" into measurements you can act on.

## Funded one system at a time

IMPEL isn't the product of a big top-down platform budget. It grew through a
series of custom systems, each built to a specific customer's requirements —
and each scoped strategically, so that delivering the customer's system also
built out the platform underneath. The customer gets their machine; IMPEL
gains a permanent capability; the next project starts further ahead than the
last one did.

That's the real shape of the timeline below: not phases of one big project,
but different systems for different customers, one building on top of the
other.

## The build-out, year by year

- **2023** — stabilization and refactor: from lab script to reliable product.
- **2024** — the multiprocessing core lands; multi-power-supply control and
  EL/PL capture orchestration; MES integration via PLC and REST API control
  for inline QC.
- **2025** — the big ML year: the CUDA pipeline, advanced image processing,
  and the first machine-vision calibration and measurement work.
- **2026** — larger multi-camera machine vision rigs, precise hardware
  synchronization, and constant LED intensity control over long exposures —
  maturing capture into a true metrological tool — plus production-level
  reliability work.

## Where it is now

IMPEL runs for hundreds of customers — from major aerospace manufacturers to
terrestrial energy companies across America, Europe, and Asia, along with
universities and O&M contractors. A system we built around it was selected as
an R&D 100 Award finalist.

Several of the capabilities woven into the platform are stories of their own:
the EL/PL capture orchestration with actively stabilized illumination, the
multi-camera calibration behind stitching and measurement, and the MES/PLC
integration that makes inspection a first-class step in the line.

<!-- TODO: hyperlink the three companion writeups above once they're out of draft. -->
<!-- TODO: hero imagery pending Richard's check on approved visuals. -->
