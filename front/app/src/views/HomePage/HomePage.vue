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
                        {{ errors['ROW'] }}
                    </template>
                </FieldWrapper>

                <FieldWrapper class="home-page__form-field">
                    <template #label>
                        num
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
                        {{ errors['NUM'] }}
                    </template>
                </FieldWrapper>

                <div class="home-page__btn-wrapper">
                    <div ref="animated" class="home-page__animated">
                        <div class="home-page__animated-btn">
                            <button class="btn btn--first" type="submit" :disabled="requested">
                                get pressure
                            </button>
                        </div>

                        <span class="home-page__answer">
                            {{ pressure }}
                        </span>
                    </div>
                </div>

                <transition name="fade">
                    <div v-if="requested" class="home-page__try-again">
                        <button class="btn btn--second" type="button" @click="tryAgain">
                            try again
                        </button>
                    </div>
                </transition>
            </form>
        </main>
    </section>
</template>

<script>
    import FieldWrapper from '@/components/Form/FieldWrapper.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { ERROR_TEXTS } from '@/validation';

    export default {
        components: {
            FieldWrapper,
        },
        data() {
            return {
                row: '',
                num: '',
                requested: false,
                errors: {},
            }
        },
        computed: {
            ...mapGetters('HomePageStore', ['pressure']),
            isValid() {
                return this.isRowNotEmpty && this.isNumNotEmpty && this.isValidNum;
            },
            isRowNotEmpty() {
                return this.row.length > 0;
            },
            isNumNotEmpty() {
                return this.num.length > 0;
            },
            isValidNum() {
                return parseInt(this.num, 10) <= parseInt(this.row, 10);
            },
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
                this.errors = {};

                if (!this.isValid) {
                    this.showErrors();
                    return;
                }

                return this.fetchPressure({ row: this.row, num: this.num })
                    .then(() => {
                        this.requested = true;
                    });
            },
            playAnimation() {
                if (this.requested) {
                    this.$refs.animated.classList.remove('rotate-from')
                    this.$refs.animated.classList.add('rotate-to')
                } else {
                    this.$refs.animated.classList.remove('rotate-to')
                    this.$refs.animated.classList.add('rotate-from')
                }
            },
            tryAgain() {
                this.row = '';
                this.num = '';
                this.requested = false;
            },
            showErrors() {
                this.errors = {};

                if (!this.isRowNotEmpty) {
                    this.errors['ROW'] = ERROR_TEXTS['ROW']['EMPTY'];
                }

                if (!this.isNumNotEmpty) {
                    this.errors['NUM'] = ERROR_TEXTS['NUM']['EMPTY']
                }

                if (!this.isValidNum && this.isNumNotEmpty) {
                    this.errors['NUM'] = ERROR_TEXTS['NUM']['INVALID_VALUE'];
                }
            }
        },
        watch: {
            requested(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.playAnimation();
                }
            }
        }
    }
</script>