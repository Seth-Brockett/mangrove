const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');

const AciJob = require('../models/aciJob');
const AdiJob = require('../models/adiJob');
const AeiJob = require('../models/aeiJob');
const BiJob = require('../models/biJob');
const NdsiJob = require('../models/ndsiJob');
const RmsJob = require('../models/rmsJob');

// Create Job
router.put('/', (req, res) => {
  var jobModel = null;
  switch (req.body.type) {
    case "aci":
      jobModel = AciJob;
      break;
    case "adi":
      jobModel = AdiJob;
      break;
    case "aei":
      jobModel = AeiJob;
      break;
    case "bi":
      jobModel = BiJob;
      break;
    case "ndsi":
      jobModel = NdsiJob;
      break;
    case "rms":
      jobModel = RmsJob;
      break;
  }

  jobModel.find({
    input: req.body.inputId,
    type: req.body.type,
    jobSpec: req.body.jobSpecId,
  })
    .exec()
    .then((searchResult) => {
      console.log(searchResult);
      if (searchResult.length /* === 1 */) {
        res.status(200).json({
          jobId: searchResult[0]._id,
          type: searchResult[0].type,
          input: searchResult[0].input,
          jobSpec: searchResult[0].jobSpec,
          author: searchResult[0].author,
          creationTimeMs: searchResult[0].creationTimeMs,
          status: searchResult[0].status,
        });
      } else {
        const job = new jobModel({
          _id: new mongoose.Types.ObjectId(),
          type: req.body.type,
          input: req.body.inputId,
          jobSpec: req.body.jobSpecId,
          author: 'Test Author', // TODO: Implement user authentication
          creationTimeMs: moment().valueOf(),
          status: 'queued', // TODO: Implement job queueing
        });

        job
          .save()
          .then((createResult) => {
            console.log(createResult);
            res.status(201).json({
              jobId: createResult._id,
              type: createResult.type,
              input: createResult.input,
              jobSpec: createResult.jobSpec,
              author: createResult.author,
              creationTimeMs: createResult.creationTimeMs,
              status: createResult.status,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Get Job
router.get('/:jobId', (req, res) => {
  const { jobId } = req.params;

  Job.findById(jobId)
    .select('_id input jobSpec author creationTimeMs status')
    .exec()
    .then((searchResult) => {
      console.log(searchResult);
      if (searchResult) {
        res.status(200).json({
          jobId: searchResult._id,
          input: searchResult.input,
          jobSpec: searchResult.jobSpec,
          author: searchResult.author,
          creationTimeMs: searchResult.creationTimeMs,
          status: searchResult.status,
        });
      } else {
        res.status(404).json({
          message: `No valid entry found for jobId: ${jobId}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Get All Jobs
router.get('/', (req, res) => {
  Job.find()
    .select('_id input jobSpec author creationTimeMs status')
    .exec()
    .then((searchResult) => {
      res.status(200).json({
        count: searchResult.length,
        jobs: searchResult.map(job => ({
          jobId: job._id,
          input: job.input,
          jobSpec: job.jobSpec,
          author: job.author,
          creationTimeMs: job.creationTimeMs,
          status: job.status,
        })),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Delete Job
router.delete('/:jobId', (req, res) => {
  const { jobId } = req.params;

  Job.remove({ _id: jobId })
    .exec()
    .then((deleteResult) => {
      console.log(deleteResult);
      res.status(200).json({
        success: true,
        message: (
          deleteResult.n > 0
            ? `Successfully deleted Job with jobId: ${jobId}.`
            : `No valid entry found for jobId: ${jobId}.`
        ),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
