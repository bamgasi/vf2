<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Application</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-group
        v-for="(item, index) in items"
        :key="index"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
              >{{ item.title }}
              <v-btn @click="openDialogItem(index)" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="moveItem(items, index, -1)" v-if="index > 0"
                ><v-icon>mdi-chevron-double-up</v-icon></v-btn
              >
              <v-btn
                icon
                @click="moveItem(items, index, 1)"
                v-if="index < items.length - 1"
                ><v-icon>mdi-chevron-double-down</v-icon></v-btn
              >
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="(subItem, j) in item.subItems" :key="j" :to="null">
          <v-list-item-content>
            <v-list-item-title>
              {{ subItem.title }}
              <span>
                <v-btn @click="openDialogSubItem(index, j)" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="moveItem(item.subItems, j, -1)" v-if="j > 0"
                  ><v-icon>mdi-chevron-double-up</v-icon></v-btn
                >
                <v-btn
                  icon
                  @click="moveItem(item.subItems, j, 1)"
                  v-if="j < item.subItems.length - 1"
                  ><v-icon>mdi-chevron-double-down</v-icon></v-btn
                >
              </span>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon :to="subItem.to" exact
              ><v-icon>mdi-arrow-right-bold-circle-outline</v-icon></v-btn
            >
          </v-list-item-action>
        </v-list-item>
        <v-list-item @click="openDialogSubItem(index, -1)">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>서브추가하기</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item @click="openDialogItem(-1)">
        <v-list-item-icon>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>추가하기</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialogItem" max-width="400">
      <v-card>
        <v-card-title>
          메인 메뉴 수정
          <v-spacer></v-spacer>
          <v-btn icon @click="saveItem">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
          <v-btn icon @click="dialogItem = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-icon>{{ formItem.icon }}</v-icon>
          <v-text-field
            label="메뉴아이콘"
            v-model="formItem.icon"
          ></v-text-field>
          <v-text-field
            label="메뉴명"
            v-model="formItem.title"
            @keypress.enter="saveItem"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSubItem" max-width="400">
      <v-card>
        <v-card-title>
          서브 메뉴 수정
          <v-spacer></v-spacer>
          <v-btn icon @click="saveSubItem">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
          <v-btn icon @click="dialogSubItem = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="메뉴명"
            v-model="formSubItem.title"
          ></v-text-field>
          <v-text-field
            label="연결경로"
            v-model="formSubItem.to"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialogItem: false,
      dialogSubItem: false,
      formItem: {
        icon: 'mdi-crosshairs-question',
        title: '',
      },
      selectedItemIndex: -1,
      selectedSubItemIndex: -1,
      formSubItem: {
        title: '',
        to: '',
      },
    }
  },
  methods: {
    openDialogItem(index) {
      this.dialogItem = true
      this.selectedItemIndex = index
      if (index < 0) {
        this.formItem.title = ''
        this.formItem.icon = 'mdi-crosshairs-question'
      } else {
        this.formItem.title = this.items[index].title
        this.formItem.icon = this.items[index].icon
      }
    },
    openDialogSubItem(index, subIndex) {
      this.selectedItemIndex = index
      this.selectedSubItemIndex = subIndex
      if (subIndex < 0) {
        this.formSubItem.title = ''
        this.formSubItem.to = '/'
      } else {
        this.formSubItem.title = this.items[index].subItems[subIndex].title
        this.formSubItem.to = this.items[index].subItems[subIndex].to
      }
      this.dialogSubItem = true
    },
    saveItem() {
      if (this.selectedItemIndex < 0) {
        this.items.push(this.formItem)
      } else {
        this.items[this.selectedItemIndex] = this.formItem
      }
      this.save()
      this.dialogItem = false
      this.dialogSubItem = false
    },
    saveSubItem() {
      console.log(this.formSubItem)
      if (this.selectedSubItemIndex < 0) {
        if (!this.items[this.selectedItemIndex].subItems) {
          this.items[this.selectedItemIndex].subItems = []
        }
        this.items[this.selectedItemIndex].subItems.push(this.formSubItem)
      } else {
        this.items[this.selectedItemIndex].subItems[
          this.selectedSubItemIndex
        ] = this.formSubItem
      }
      this.dialogSubItem = false
      this.save()
    },
    async save() {
      try {
        await this.$firebase
          .database()
          .ref()
          .child('site')
          .update({ menu: this.items })
      } finally {
        this.dialog = false
      }
    },
    moveItem(items, i, arrow) {
      // const item = items.splice(i, 1)[0]
      // items.splice(i + arrow, 0, item)
      items.splice(i + arrow, 0, ...items.splice(i, 1))
      this.save()
    },
  },
}
</script>
