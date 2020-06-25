import * as React from 'react';
import {action} from '@storybook/addon-actions';

import Button from './Button';

export default {
    title: 'Button',
    component: Button
};

export const Active = () => (
    <Button text="Click" action={action('clicked')} type="primary" />
);

export const Disable = () => (
    <Button
        text="Click"
        action={action('clicked')}
        type="primary"
        disable={true}
    />
);

export const stylesButton = () => (
    <div id="group-buttons">
        <div className="p-b-lg">
            <div className="size-5">Small</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="primary"
                typeButton="small"
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">Text</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="primary"
                typeButton="text"
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">Border</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="primary"
                typeButton="border"
            />
        </div>
    </div>
);

export const typesButton = () => (
    <div id="group-buttons">
        <div className="p-b-lg">
            <div className="size-5">Primary</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="primary"
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">Danger</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="danger"
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">Info</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="info"
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">White</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="white"
            />
        </div>
    </div>
);

export const withIcon = () => (
    <Button
        text="Click"
        action={action('clicked')}
        type="primary"
        // icon={ICONS.PLUS}
    />
);

export const withIconDisable = () => (
    <Button
        text="Click"
        action={action('clicked')}
        type="primary"
        // icon={ICONS.PLUS}
        disable={true}
    />
);

export const withIconStylesButton = () => (
    <div id="group-buttons">
        <div className="p-b-lg">
            <div className="size-5">Small with icon</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="primary"
                typeButton="small"
                // icon={ICONS.PLUS}
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">Text with icon</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="primary"
                typeButton="text"
                // icon={ICONS.PLUS}
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">Border with icon</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="primary"
                typeButton="border"
                // icon={ICONS.PLUS}
            />
        </div>
    </div>
);

export const withIconTypesButton = () => (
    <div id="group-buttons">
        <div className="p-b-lg">
            <div className="size-5">Primary</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="primary"
                // icon={ICONS.PLUS}
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">Danger</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="danger"
                // icon={ICONS.PLUS}
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">Info</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="info"
                // icon={ICONS.PLUS}
            />
        </div>
        <div className="p-b-lg">
            <div className="size-5">White</div>
            <Button
                text="Click"
                action={action('clicked')}
                type="white"
                // icon={ICONS.PLUS}
            />
        </div>
    </div>
);
