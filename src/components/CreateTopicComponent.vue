<script setup>
import { reactive, defineEmits, defineProps, watch, ref, nextTick } from 'vue';

const emit = defineEmits(['close', 'submit']);
const closeModalButton = ref(null);
const props = defineProps(['show']);

const state = reactive({
  title: '',
});

const closeModal = () => {
  emit('close');
};

const submitForm = () => {
  if (state.title.trim()) {
    console.log('Submitting form with title:', state.title);
    emit('submit', state.title);
    state.title = ''; // Reset the form
    emit('close');
  } else {
    alert('Title cannot be empty');
  }
};

// Focus on the input field when the modal is shown
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        closeModalButton.value.focus();
      });
    }
  }
);
</script>

<template>
    <div v-if="props.show" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crear Tópico</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control"
              v-model="state.title"
              placeholder="Introduce el nombre del tópico"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="submitForm">Confirmar</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.modal.fade.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
</style>