/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseType, easeBackIn, Transition, transition } from "./d3";

export const fastTransition: Transition<BaseType, any, any, any> = (() =>
    transition<BaseType>().duration(5000).ease(easeBackIn)) as unknown as Transition<
    BaseType,
    any,
    any,
    any
>;
