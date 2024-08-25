import Joi from "joi";

// Regular expression for checking the hexidecimal colour
const hexColourRegex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");

// Graph schema for checking the the graph imported by the user follows this structure
export const graphDataSchema = Joi.object({
    nodes: Joi.array().items(
        Joi.object({
            id: Joi.number().required(),
        }).required()
    ).required(),
    links: Joi.array().items(
        Joi.object({
            source: Joi.number().required(),
            target: Joi.number().required()
        }).required()
    ).required(),
    isDirected: Joi.boolean().required(),
    networkName: Joi.string().required(),
    showParticles: Joi.boolean().required(),
    zoomToFit: Joi.boolean().required(),
    nodeType: Joi.string().valid("Integer", "String").required(),
    styles: Joi.object().pattern(
        Joi.number(),
        Joi.object({
            fillStyle: Joi.string().pattern(hexColourRegex).required(),
            strokeStyle: Joi.string().pattern(hexColourRegex).required(),
            textStyle: Joi.string().pattern(hexColourRegex).required(),
            size: Joi.number().required(),
        })
    ).required(),
    isConnected: Joi.boolean().required(),
    isDAG: Joi.boolean().required(),
    dagMode: Joi.string().valid("Top-Down", "Bottom-Up", "Left-Right", "Right-Left", "Radial-In", "Radial-Out", "None"),
});