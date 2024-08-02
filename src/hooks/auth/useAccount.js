/**
 * 账号与安全 hooks
 */

import { reactive, ref, onMounted } from 'vue'

const useAccount = () => {
  // 所显示卡片类型 main updatePwd
  const cardType = ref('main')
  // const cardType = reactive({
  //   value: 'main'
  // })
  // 切换表单类型
  const handleCardType = (type) => {
    console.log(`%c>> $type`, 'color:yellow', type)
    cardType.value = type
    console.log(`%c>> $cardType.value`, 'color:yellow', cardType.value)
  }

  return { cardType, handleCardType }
}

export default useAccount
