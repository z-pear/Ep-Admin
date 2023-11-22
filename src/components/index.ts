import { App } from 'vue'
import SvgIcon from './SvgIcon.vue'
import { IconifyOffline, IconifyOnline } from './Icon'

import ChooseArea from './ChooseArea/index.vue'
import Progress from './Progress.vue'
import Tabs from './Tabs/Tabs.vue'
import TabItem from './Tabs/TabItem'
import Dialog from './Dialog/Dialog.vue'
import { openDialog } from './Dialog/openDialog'
import Upload from './Upload/Upload.vue'
import Charts from './Charts'
import Collapse from './Collapse/Collapse.vue'
import CollapseItem from './Collapse/CollapseItem.vue'

const components = {
  SvgIcon,
  IconifyOffline,
  IconifyOnline
}

export function registerGlobComp(app: App) {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, component)
  }
}

export { ChooseArea, Progress, Tabs, TabItem, Dialog, openDialog, Upload, Charts, Collapse, CollapseItem }
