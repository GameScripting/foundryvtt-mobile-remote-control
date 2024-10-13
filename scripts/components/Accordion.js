export default {
    name: 'Accordion',
    template: `
      <div class="accordion">
        <div v-for="(slotName, index) in slotKeys" :key="index" class="accordion-item">
          <div class="accordion-header" @click="toggle(index)">
            <slot :name="slotName.header"></slot>
          </div>
          <div v-if="activeIndex === index" class="accordion-content">
            <slot :name="slotName.content"></slot>
          </div>
        </div>
      </div>
    `,
    data() {
        return {
            activeIndex: null,
            slotKeys: []
        };
    },
    mounted() {
        this.slotKeys = this.generateSlotKeys();
    },
    methods: {
        toggle(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
        },
        generateSlotKeys() {
            const slotKeys = [];
            let index = 0;

            while (this.$slots[`header-${index}`] && this.$slots[`content-${index}`]) {
                slotKeys.push({ header: `header-${index}`, content: `content-${index}` });
                index++;
            }

            return slotKeys;
        }
    }
}