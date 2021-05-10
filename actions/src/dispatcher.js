// Copyright 2020 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Handles dispatching events and actions to different handlers.
 */

const core = require('@actions/core');
const issueLabelsModule = require('./issues/checkIssueLabels');
const { checkAssignees } = require('./issues/checkIssueAssigned');
const  prLabelsModule = require('./pull_requests/labelCheck');

const EVENTS = {
  ISSUES: 'issues',
  PULL_REQUEST: 'pull_request'
};
const ACTIONS = {
  LABELED: 'labeled',
  ASSIGNED: 'assigned',
  UNLABELED: 'unlabeled',
};
module.exports = {
  async dispatch(event, action) {
    core.info(`Received Event:${event} Action:${action}.`);
    if (event === EVENTS.ISSUES) {
      switch (action) {
        case ACTIONS.ASSIGNED:
          await checkAssignees();
          break;
        case ACTIONS.LABELLED:
          await issueLabelsModule.checkLabels();
          break;
      }
    } else if(event === EVENTS.PULL_REQUEST) {
      switch(action) {
        case ACTIONS.LABELLED:
          await prLabelsModule.checkLabels();
          break;
        case ACTIONS.UNLABELED:
          await prLabelsModule.checkUnLabeled();
          break;
      }
    }

  },
};
