import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Main,
  Aside,
  Header,
  Message,
  Menu,
  Submenu,
  MenuItem,
  breadcrumb,
  breadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  tooltip,
  pagination,
  dialog,
  MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(breadcrumb)
Vue.use(breadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(tooltip)
Vue.use(pagination)
Vue.use(dialog)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
