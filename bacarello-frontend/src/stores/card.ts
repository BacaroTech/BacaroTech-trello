import { defineStore } from 'pinia'
import { ref } from 'vue'
export interface CheckList {
  label: string
  lists?: ListItem[]
}
export interface ListItem {
  id?: number
  label: string
  checked?: boolean
}
export const useCardCheckList = defineStore('checkList', () => {
  const items = ref<CheckList[]>([
    {
      label: 'prova',
      lists: [
        { id: 1, label: 'First task', checked: false },
        { id: 2, label: 'Second task', checked: true },
        { id: 3, label: 'Third task', checked: false },
      ],
    },
  ])
  function addItem(itemLabel: CheckList): void {
    if (itemLabel && itemLabel.label != '') {
      items.value.push({ label: itemLabel.label, lists: [] })
    }
  }
  function addNewListItem(listItem: ListItem, labelId: CheckList):void {
    if (listItem && labelId) {
      const checklist = items.value.find((c) => c.label === labelId.label)
      if (checklist && checklist != undefined) {
        checklist.lists?.push({
          id: Date.now(),
          label: listItem.label,
          checked: false,
        })
      }
    }
  }
  function updateItem(label: ListItem, labelId: CheckList):void{
    
  }
  return { items, addItem,addNewListItem }
})
