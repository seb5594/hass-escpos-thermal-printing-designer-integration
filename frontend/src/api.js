/** Thin wrapper around the integration's websocket commands. */
export class DesignerApi {
  /** @param {() => object} getHass returns the current Home Assistant `hass` object */
  constructor(getHass) {
    this._getHass = getHass;
  }

  _call(command, payload = {}) {
    const hass = this._getHass();
    return hass.callWS({
      type: `escpos_designer/${command}`,
      language: hass.language,
      ...payload,
    });
  }

  status = () => this._call("status");
  library = () => this._call("library");
  getTemplate = (templateId) => this._call("get_template", { template_id: templateId });
  saveTemplate = (template, templateId) =>
    this._call("save_template", { template, ...(templateId ? { template_id: templateId } : {}) });
  deleteTemplate = (templateId) => this._call("delete_template", { template_id: templateId });
  toggleFavorite = (templateId) => this._call("toggle_favorite", { template_id: templateId });
  preview = (document, variables, fit) =>
    this._call("preview", { document, variables, ...(fit ? { fit } : {}) });
  thumbnails = (templateIds) => this._call("thumbnails", { template_ids: templateIds });
  print = (payload) => this._call("print", payload);
}

/** The human-readable message of a failed websocket call. */
export function errorMessage(error) {
  return error?.message || error?.code || String(error);
}
