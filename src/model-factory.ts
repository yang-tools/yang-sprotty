/*
 * Copyright (C) 2017-2020 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { SGraphFactory, SModelElementSchema, SParentElement, SChildElement, getSubType, SEdge } from "sprotty";

export class YangModelFactory extends SGraphFactory {

    readonly SQRT_5 = Math.sqrt(5)

    readonly SQRT_7_5 = Math.sqrt(1 * 1 + 2.5 * 2.5)

    createElement(schema: SModelElementSchema, parent?: SParentElement): SChildElement {
        const element = super.createElement(schema, parent)
        if (element instanceof SEdge) {
            switch (getSubType(schema)) {
                case 'composition':
                    element.sourceAnchorCorrection = this.SQRT_5
                    break
                case 'import':
                    element.sourceAnchorCorrection = this.SQRT_7_5
                    break
                case 'uses':
                case 'augments':
                    element.targetAnchorCorrection = this.SQRT_7_5
                    break
            }
        }
        return element
    }
}