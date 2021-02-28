<template>
    <section class="home-page">
        <header class="home-page__header">
            <h1 class="home-page__title">
                Calculate the pressure on the brick from its position inside the pyramid
            </h1>
        </header>

        <main class="home-page__main">
            <form @submit.prevent="getPressure" class="home-page__form">
                <FieldWrapper class="home-page__form-field">
                    <template #label>
                        row
                    </template>

                    <template #input-slot>
                        <input v-model="row"
                               class="simple-input"
                               type="text"
                               maxlength="4"
                               @keydown="onlyNumber"
                        />
                    </template>

                    <template #error-text>

                    </template>
                </FieldWrapper>

                <FieldWrapper class="home-page__form-field">
                    <template #label>
                        num of the brick
                    </template>

                    <template #input-slot>
                        <input v-model="num"
                               class="simple-input"
                               type="text"
                               maxlength="4"
                               @keydown="onlyNumber"
                        />
                    </template>

                    <template #error-text>

                    </template>
                </FieldWrapper>

                <div class="home-page__btn-wrapper">
                    <button class="btn" type="submit">
                        get pressure
                    </button>
                </div>
                <div>
                    {{ pressure }}
                </div>
            </form>
        </main>
    </section>
</template>

<script>
    import FieldWrapper from '@/components/Form/FieldWrapper.vue';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        components: {
            FieldWrapper,
        },
        data() {
            return {
                row: '',
                num: '',
            }
        },
        computed: {
            ...mapGetters('HomePageStore', ['pressure']),
            isNegativeValues() {
            }
        },
        methods: {
            ...mapActions('HomePageStore', ['fetchPressure']),
            onlyNumber(e) {
                const charCode = e.which || e.keyCode;

                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    e.preventDefault();;
                } else {
                    return true;
                }
            },
            getPressure() {
                return this.fetchPressure({ row: this.row, num: this.num });
            },
        },
    }
</script>