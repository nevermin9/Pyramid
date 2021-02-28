<template functional>
    <div class="field-wrapper" :class="data.staticClass || ''">
        <label class="field-wrapper__label">
            <slot name="label"></slot>

            <div class="field-wrapper__input-slot">
                <slot name="input-slot"></slot>
            </div>
        </label>

        <span class="field-wrapper__error-text">
            <slot name="error-text"></slot>
        </span>
    </div>
</template>