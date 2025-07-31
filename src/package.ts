/* Do not change these import lines to match external modules in webpack configuration */
import * as grok from 'datagrok-api/grok';
import * as ui from 'datagrok-api/ui';
import * as DG from 'datagrok-api/dg';
import type { PipelineConfiguration } from '@datagrok-libraries/compute-api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const _package = new DG.Package();

//name: Wine quality analysis demo workflow
//tags: model, demo
//editor: Compute2:TreeWizardEditor
//input: object params
//output: object result
export async function WineQualityWf(params: any) {
  const c: PipelineConfiguration = {
    id: 'winequalitywf',
    nqName: 'winequalitywf:WineQualityWf',
    version: '1.0',
    type: 'static',
    steps: [
        {
          id: 'fetchdata',
          friendlyName: 'Fetch data',
          nqName: 'winequalitywf:fetchwinedata',
        },
        {
          id: 'clusterwinedata',
          friendlyName: 'Clustering',
          nqName: 'winequalitywf:clusterwinedata',
        },
        {
          id: 'trainregression',
          friendlyName: 'Train Regression Model',
          nqName: 'winequalitywf:trainregression',
        },
        {
          id: 'mergepredictions',
          friendlyName: 'Merge predictions of two models',
          nqName: 'winequalitywf:mergepredictions',
        }
        ],
  links: [
      {
        id: 'winedatatoclustering',
        type: 'data',
        from: [
          'value_in:fetchdata/df_wine',
        ],
        to: [
          'value_out:clusterwinedata/df_wine',
        ],
      },
      {
        id: 'winedatatoregression',
        type: 'data',
        from: [
          'value_in:fetchdata/df_wine',
        ],
        to: [
          'value_out:trainregression/df_wine',
        ],
      },
      {
        id: 'regressindatatomerge',
        type: 'data',
        from: [
          'value_in:trainregression/df_regression',
        ],
        to: [
          'value_out:mergepredictions/df_regression',
        ],
      },
      {
        id: 'clusteringtomerge',
        type: 'data',
        from: [
          'value_in:clusterwinedata/df_clustering',
        ],
        to: [
          'value_out:mergepredictions/df_clustering',
        ],
      }
     ]
  };
  return c;
}

