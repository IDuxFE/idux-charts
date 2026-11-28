import { $ as SymbolDraw, $t as quadraticSubdivide, At as createBoxLayoutReference, B as getAlphaColor, Bt as getECData, Cn as noop, D as mergeNativePlotOptions, Dt as createTooltipMarkup, E as createPlotTooltipFormatter, En as __extends, Et as defaultSeriesFormatTooltip, F as getTooltipsColor, G as createSeriesData, Gt as linearMap, Ht as createSimpleOverallStageHandler, It as Model, Jt as fromPoints, K as installLabelLayout, Kt as ZRText, Mt as CoordinateSystemManager, Nt as injectCoordSysByOption, O as mergePlotOptions, Ot as tokens, P as useReactiveAttrs, Qt as quadraticAt$1, R as convertArray, Sn as mixin, St as registerVisual, Tn as retrieve3, Tt as SeriesModel, U as LegendVisualProvider, Ut as defaultEmphasis, V as withChartProps, Vt as convertOptionIdName, Wt as makeInner, X as LineDraw, Xt as lift, Yt as Group, Z as ECLinePath, _n as isArray, an as normalize$1, at as registerRoamActionSimply, bn as keys, bt as registerPostUpdate, cn as set, ct as SeriesData, dn as clone$1, dt as applyViewCoordSysTransToElement, en as clone, et as install$3, fn as createHashMap, ft as calcCompensationScaleToPreserveNodeSize, gn as indexOf, hn as extend, ht as viewCoordSysCopyOverallMatrix, in as len, it as isRoamPayloadHasZoom, j as usePlotDark, jt as getLayoutRect, kt as applyPreserveAspect, ln as sub, lt as prepareSeriesDataSchema, mn as each, mt as isViewCoordSys, nn as create, nt as install$1, on as scale, ot as updateRoamControllerSimply, pn as curry, pt as getOwnRoamViewCoordSys, q as install$2, qt as Rect, rn as distSquare, rt as createViewCoordSysSimply, sn as scaleAndAdd$1, st as RoamController, tn as copy, tt as install$4, un as assert, ut as View, v as plotInstanceMethods, vn as isNumber, vt as PRIORITY, wn as retrieve, wt as ChartView, xn as map, y as usePlotRender, yn as isString, yt as registerLayout, z as createInstall, zt as COMPONENT_MAIN_TYPE_SERIES } from "./setup-1ooTVilH.js";
import { f as seerColors, ft as pick, jn as defineComponent, yt as cloneDeep, zn as onBeforeUnmount } from "./app-default-DalXtduk.js";
import { t as createTextStyle } from "./helper-VBZz7uCM.js";
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/component/helper/thumbnailBridge.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
/**
* @caveat Do not import other `src/component/thumbnail/*` files.
*  This file should be decoupled from them for sake of the size consideration.
*/
/**
* FIXME: This is a temporary implementation. May need refactor to decouple
*  the direct call from series.graph to thumbnail.
*/
var inner$1 = makeInner();
function getThumbnailBridge(model) {
	if (model) return inner$1(model).bridge;
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/data/helper/linkSeriesData.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
/**
* Link lists and struct (graph or tree)
*/
var inner = makeInner();
function linkSeriesData(opt) {
	var mainData = opt.mainData;
	var datas = opt.datas;
	if (!datas) {
		datas = { main: mainData };
		opt.datasAttr = { main: "data" };
	}
	opt.datas = opt.mainData = null;
	linkAll(mainData, datas, opt);
	each(datas, function(data) {
		each(mainData.TRANSFERABLE_METHODS, function(methodName) {
			data.wrapMethod(methodName, curry(transferInjection, opt));
		});
	});
	mainData.wrapMethod("cloneShallow", curry(cloneShallowInjection, opt));
	each(mainData.CHANGABLE_METHODS, function(methodName) {
		mainData.wrapMethod(methodName, curry(changeInjection, opt));
	});
	assert(datas[mainData.dataType] === mainData);
}
function transferInjection(opt, res) {
	if (isMainData(this)) {
		var datas = extend({}, inner(this).datas);
		datas[this.dataType] = res;
		linkAll(res, datas, opt);
	} else linkSingle(res, this.dataType, inner(this).mainData, opt);
	return res;
}
function changeInjection(opt, res) {
	opt.struct && opt.struct.update();
	return res;
}
function cloneShallowInjection(opt, res) {
	each(inner(res).datas, function(data, dataType) {
		data !== res && linkSingle(data.cloneShallow(), dataType, res, opt);
	});
	return res;
}
/**
* Supplement method to List.
*
* @public
* @param [dataType] If not specified, return mainData.
*/
function getLinkedData(dataType) {
	var mainData = inner(this).mainData;
	return dataType == null || mainData == null ? mainData : inner(mainData).datas[dataType];
}
/**
* Get list of all linked data
*/
function getLinkedDataAll() {
	var mainData = inner(this).mainData;
	return mainData == null ? [{ data: mainData }] : map(keys(inner(mainData).datas), function(type) {
		return {
			type,
			data: inner(mainData).datas[type]
		};
	});
}
function isMainData(data) {
	return inner(data).mainData === data;
}
function linkAll(mainData, datas, opt) {
	inner(mainData).datas = {};
	each(datas, function(data, dataType) {
		linkSingle(data, dataType, mainData, opt);
	});
}
function linkSingle(data, dataType, mainData, opt) {
	inner(mainData).datas[dataType] = data;
	inner(data).mainData = mainData;
	data.dataType = dataType;
	if (opt.struct) {
		data[opt.structAttr] = opt.struct;
		opt.struct[opt.datasAttr[dataType]] = data;
	}
	data.getLinkedData = getLinkedData;
	data.getLinkedDataAll = getLinkedDataAll;
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/data/Graph.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
function generateNodeKey(id) {
	return "_EC_" + id;
}
var Graph = function() {
	function Graph(directed) {
		this.type = "graph";
		this.nodes = [];
		this.edges = [];
		this._nodesMap = {};
		/**
		* @type {Object.<string, module:echarts/data/Graph.Edge>}
		* @private
		*/
		this._edgesMap = {};
		this._directed = directed || false;
	}
	/**
	* If is directed graph
	*/
	Graph.prototype.isDirected = function() {
		return this._directed;
	};
	/**
	* Add a new node
	*/
	Graph.prototype.addNode = function(id, dataIndex) {
		id = id == null ? "" + dataIndex : "" + id;
		var nodesMap = this._nodesMap;
		if (nodesMap[generateNodeKey(id)]) {
			console.error("Graph nodes have duplicate name or id");
			return;
		}
		var node = new GraphNode(id, dataIndex);
		node.hostGraph = this;
		this.nodes.push(node);
		nodesMap[generateNodeKey(id)] = node;
		return node;
	};
	/**
	* Get node by data index
	*/
	Graph.prototype.getNodeByIndex = function(dataIndex) {
		var rawIdx = this.data.getRawIndex(dataIndex);
		return this.nodes[rawIdx];
	};
	/**
	* Get node by id
	*/
	Graph.prototype.getNodeById = function(id) {
		return this._nodesMap[generateNodeKey(id)];
	};
	/**
	* Add a new edge
	*/
	Graph.prototype.addEdge = function(n1, n2, dataIndex) {
		var nodesMap = this._nodesMap;
		var edgesMap = this._edgesMap;
		if (isNumber(n1)) n1 = this.nodes[n1];
		if (isNumber(n2)) n2 = this.nodes[n2];
		if (!(n1 instanceof GraphNode)) n1 = nodesMap[generateNodeKey(n1)];
		if (!(n2 instanceof GraphNode)) n2 = nodesMap[generateNodeKey(n2)];
		if (!n1 || !n2) return;
		var key = n1.id + "-" + n2.id;
		var edge = new GraphEdge(n1, n2, dataIndex);
		edge.hostGraph = this;
		if (this._directed) {
			n1.outEdges.push(edge);
			n2.inEdges.push(edge);
		}
		n1.edges.push(edge);
		if (n1 !== n2) n2.edges.push(edge);
		this.edges.push(edge);
		edgesMap[key] = edge;
		return edge;
	};
	/**
	* Get edge by data index
	*/
	Graph.prototype.getEdgeByIndex = function(dataIndex) {
		var rawIdx = this.edgeData.getRawIndex(dataIndex);
		return this.edges[rawIdx];
	};
	/**
	* Get edge by two linked nodes
	*/
	Graph.prototype.getEdge = function(n1, n2) {
		if (n1 instanceof GraphNode) n1 = n1.id;
		if (n2 instanceof GraphNode) n2 = n2.id;
		var edgesMap = this._edgesMap;
		if (this._directed) return edgesMap[n1 + "-" + n2];
		else return edgesMap[n1 + "-" + n2] || edgesMap[n2 + "-" + n1];
	};
	/**
	* Iterate all nodes
	*/
	Graph.prototype.eachNode = function(cb, context) {
		var nodes = this.nodes;
		var len = nodes.length;
		for (var i = 0; i < len; i++) if (nodes[i].dataIndex >= 0) cb.call(context, nodes[i], i);
	};
	/**
	* Iterate all edges
	*/
	Graph.prototype.eachEdge = function(cb, context) {
		var edges = this.edges;
		var len = edges.length;
		for (var i = 0; i < len; i++) if (edges[i].dataIndex >= 0 && edges[i].node1.dataIndex >= 0 && edges[i].node2.dataIndex >= 0) cb.call(context, edges[i], i);
	};
	/**
	* Breadth first traverse
	* Return true to stop traversing
	*/
	Graph.prototype.breadthFirstTraverse = function(cb, startNode, direction, context) {
		if (!(startNode instanceof GraphNode)) startNode = this._nodesMap[generateNodeKey(startNode)];
		if (!startNode) return;
		var edgeType = direction === "out" ? "outEdges" : direction === "in" ? "inEdges" : "edges";
		for (var i = 0; i < this.nodes.length; i++) this.nodes[i].__visited = false;
		if (cb.call(context, startNode, null)) return;
		var queue = [startNode];
		while (queue.length) {
			var currentNode = queue.shift();
			var edges = currentNode[edgeType];
			for (var i = 0; i < edges.length; i++) {
				var e = edges[i];
				var otherNode = e.node1 === currentNode ? e.node2 : e.node1;
				if (!otherNode.__visited) {
					if (cb.call(context, otherNode, currentNode)) return;
					queue.push(otherNode);
					otherNode.__visited = true;
				}
			}
		}
	};
	Graph.prototype.update = function() {
		var data = this.data;
		var edgeData = this.edgeData;
		var nodes = this.nodes;
		var edges = this.edges;
		for (var i = 0, len = nodes.length; i < len; i++) nodes[i].dataIndex = -1;
		for (var i = 0, len = data.count(); i < len; i++) nodes[data.getRawIndex(i)].dataIndex = i;
		edgeData.filterSelf(function(idx) {
			var edge = edges[edgeData.getRawIndex(idx)];
			return edge.node1.dataIndex >= 0 && edge.node2.dataIndex >= 0;
		});
		for (var i = 0, len = edges.length; i < len; i++) edges[i].dataIndex = -1;
		for (var i = 0, len = edgeData.count(); i < len; i++) edges[edgeData.getRawIndex(i)].dataIndex = i;
	};
	/**
	* @return {module:echarts/data/Graph}
	*/
	Graph.prototype.clone = function() {
		var graph = new Graph(this._directed);
		var nodes = this.nodes;
		var edges = this.edges;
		for (var i = 0; i < nodes.length; i++) graph.addNode(nodes[i].id, nodes[i].dataIndex);
		for (var i = 0; i < edges.length; i++) {
			var e = edges[i];
			graph.addEdge(e.node1.id, e.node2.id, e.dataIndex);
		}
		return graph;
	};
	return Graph;
}();
var GraphNode = function() {
	function GraphNode(id, dataIndex) {
		this.inEdges = [];
		this.outEdges = [];
		this.edges = [];
		this.dataIndex = -1;
		this.id = id == null ? "" : id;
		this.dataIndex = dataIndex == null ? -1 : dataIndex;
	}
	/**
	* @return {number}
	*/
	GraphNode.prototype.degree = function() {
		return this.edges.length;
	};
	/**
	* @return {number}
	*/
	GraphNode.prototype.inDegree = function() {
		return this.inEdges.length;
	};
	/**
	* @return {number}
	*/
	GraphNode.prototype.outDegree = function() {
		return this.outEdges.length;
	};
	GraphNode.prototype.getModel = function(path) {
		if (this.dataIndex < 0) return;
		return this.hostGraph.data.getItemModel(this.dataIndex).getModel(path);
	};
	GraphNode.prototype.getAdjacentDataIndices = function() {
		var dataIndices = {
			edge: [],
			node: []
		};
		for (var i = 0; i < this.edges.length; i++) {
			var adjacentEdge = this.edges[i];
			if (adjacentEdge.dataIndex < 0) continue;
			dataIndices.edge.push(adjacentEdge.dataIndex);
			dataIndices.node.push(adjacentEdge.node1.dataIndex, adjacentEdge.node2.dataIndex);
		}
		return dataIndices;
	};
	GraphNode.prototype.getTrajectoryDataIndices = function() {
		var connectedEdgesMap = createHashMap();
		var connectedNodesMap = createHashMap();
		for (var i = 0, len = this.edges.length; i < len; i++) {
			var adjacentEdge = this.edges[i];
			if (adjacentEdge.dataIndex < 0) continue;
			connectedEdgesMap.set(adjacentEdge.dataIndex, true);
			var sourceNodesQueue = [adjacentEdge.node1];
			var targetNodesQueue = [adjacentEdge.node2];
			var nodeIteratorIndex = 0;
			while (nodeIteratorIndex < sourceNodesQueue.length) {
				var sourceNode = sourceNodesQueue[nodeIteratorIndex];
				nodeIteratorIndex++;
				connectedNodesMap.set(sourceNode.dataIndex, true);
				var sourceNodeInEdges = sourceNode.inEdges;
				for (var j = 0, len_1 = sourceNodeInEdges.length, inEdge = void 0, inEdgeDataIndex = void 0; j < len_1; j++) {
					inEdge = sourceNodeInEdges[j];
					inEdgeDataIndex = inEdge.dataIndex;
					if (inEdgeDataIndex >= 0 && !connectedEdgesMap.hasKey(inEdgeDataIndex)) {
						connectedEdgesMap.set(inEdgeDataIndex, true);
						sourceNodesQueue.push(inEdge.node1);
					}
				}
			}
			nodeIteratorIndex = 0;
			while (nodeIteratorIndex < targetNodesQueue.length) {
				var targetNode = targetNodesQueue[nodeIteratorIndex];
				nodeIteratorIndex++;
				connectedNodesMap.set(targetNode.dataIndex, true);
				var targetNodeOutEdges = targetNode.outEdges;
				for (var j = 0, len_2 = targetNodeOutEdges.length, outEdge = void 0, outEdgeDataIndex = void 0; j < len_2; j++) {
					outEdge = targetNodeOutEdges[j];
					outEdgeDataIndex = outEdge.dataIndex;
					if (outEdgeDataIndex >= 0 && !connectedEdgesMap.hasKey(outEdgeDataIndex)) {
						connectedEdgesMap.set(outEdgeDataIndex, true);
						targetNodesQueue.push(outEdge.node2);
					}
				}
			}
		}
		return {
			edge: connectedEdgesMap.keys(),
			node: connectedNodesMap.keys()
		};
	};
	return GraphNode;
}();
var GraphEdge = function() {
	function GraphEdge(n1, n2, dataIndex) {
		this.dataIndex = -1;
		this.node1 = n1;
		this.node2 = n2;
		this.dataIndex = dataIndex == null ? -1 : dataIndex;
	}
	GraphEdge.prototype.getModel = function(path) {
		if (this.dataIndex < 0) return;
		return this.hostGraph.edgeData.getItemModel(this.dataIndex).getModel(path);
	};
	GraphEdge.prototype.getAdjacentDataIndices = function() {
		return {
			edge: [this.dataIndex],
			node: [this.node1.dataIndex, this.node2.dataIndex]
		};
	};
	GraphEdge.prototype.getTrajectoryDataIndices = function() {
		var connectedEdgesMap = createHashMap();
		var connectedNodesMap = createHashMap();
		connectedEdgesMap.set(this.dataIndex, true);
		var sourceNodes = [this.node1];
		var targetNodes = [this.node2];
		var nodeIteratorIndex = 0;
		while (nodeIteratorIndex < sourceNodes.length) {
			var sourceNode = sourceNodes[nodeIteratorIndex];
			nodeIteratorIndex++;
			connectedNodesMap.set(sourceNode.dataIndex, true);
			var sourceNodeInEdges = sourceNode.inEdges;
			for (var j = 0, len = sourceNodeInEdges.length, inEdge = void 0, inEdgeDataIndex = void 0; j < len; j++) {
				inEdge = sourceNode.inEdges[j];
				inEdgeDataIndex = inEdge.dataIndex;
				if (inEdgeDataIndex >= 0 && !connectedEdgesMap.hasKey(inEdgeDataIndex)) {
					connectedEdgesMap.set(inEdgeDataIndex, true);
					sourceNodes.push(inEdge.node1);
				}
			}
		}
		nodeIteratorIndex = 0;
		while (nodeIteratorIndex < targetNodes.length) {
			var targetNode = targetNodes[nodeIteratorIndex];
			nodeIteratorIndex++;
			connectedNodesMap.set(targetNode.dataIndex, true);
			var targetNodeOutEdges = targetNode.outEdges;
			for (var j = 0, len = targetNodeOutEdges.length, outEdge = void 0, outEdgeDataIndex = void 0; j < len; j++) {
				outEdge = targetNode.outEdges[j];
				outEdgeDataIndex = outEdge.dataIndex;
				if (outEdgeDataIndex >= 0 && !connectedEdgesMap.hasKey(outEdgeDataIndex)) {
					connectedEdgesMap.set(outEdgeDataIndex, true);
					targetNodes.push(outEdge.node2);
				}
			}
		}
		return {
			edge: connectedEdgesMap.keys(),
			node: connectedNodesMap.keys()
		};
	};
	return GraphEdge;
}();
function createGraphDataProxyMixin(hostName, dataName) {
	return {
		/**
		* @param Default 'value'. can be 'a', 'b', 'c', 'd', 'e'.
		*/
		getValue: function(dimension) {
			var data = this[hostName][dataName];
			return data.getStore().get(data.getDimensionIndex(dimension || "value"), this.dataIndex);
		},
		setVisual: function(key, value) {
			this.dataIndex >= 0 && this[hostName][dataName].setItemVisual(this.dataIndex, key, value);
		},
		getVisual: function(key) {
			return this[hostName][dataName].getItemVisual(this.dataIndex, key);
		},
		setLayout: function(layout, merge) {
			this.dataIndex >= 0 && this[hostName][dataName].setItemLayout(this.dataIndex, layout, merge);
		},
		getLayout: function() {
			return this[hostName][dataName].getItemLayout(this.dataIndex);
		},
		getGraphicEl: function() {
			return this[hostName][dataName].getItemGraphicEl(this.dataIndex);
		},
		getRawIndex: function() {
			return this[hostName][dataName].getRawIndex(this.dataIndex);
		}
	};
}
mixin(GraphNode, createGraphDataProxyMixin("hostGraph", "data"));
mixin(GraphEdge, createGraphDataProxyMixin("hostGraph", "edgeData"));
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/helper/createGraphFromNodeEdge.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
function createGraphFromNodeEdge(nodes, edges, seriesModel, directed, beforeLink) {
	var graph = new Graph(directed);
	for (var i = 0; i < nodes.length; i++) graph.addNode(retrieve(nodes[i].id, nodes[i].name, i), i);
	var linkNameList = [];
	var validEdges = [];
	var linkCount = 0;
	for (var i = 0; i < edges.length; i++) {
		var link = edges[i];
		var source = link.source;
		var target = link.target;
		if (graph.addEdge(source, target, linkCount)) {
			validEdges.push(link);
			linkNameList.push(retrieve(convertOptionIdName(link.id, null), source + " > " + target));
			linkCount++;
		}
	}
	var coordSys = seriesModel.get("coordinateSystem");
	var nodeData;
	if (coordSys === "cartesian2d" || coordSys === "polar" || coordSys === "matrix") nodeData = createSeriesData(nodes, seriesModel);
	else {
		var coordSysCtor = CoordinateSystemManager.get(coordSys);
		var coordDimensions = coordSysCtor ? coordSysCtor.dimensions || [] : [];
		if (indexOf(coordDimensions, "value") < 0) coordDimensions.concat(["value"]);
		var dimensions = prepareSeriesDataSchema(nodes, {
			coordDimensions,
			encodeDefine: seriesModel.getEncode()
		}).dimensions;
		nodeData = new SeriesData(dimensions, seriesModel);
		nodeData.initData(nodes);
	}
	var edgeData = new SeriesData(["value"], seriesModel);
	edgeData.initData(validEdges, linkNameList);
	beforeLink && beforeLink(nodeData, edgeData);
	linkSeriesData({
		mainData: nodeData,
		struct: graph,
		structAttr: "graph",
		datas: {
			node: nodeData,
			edge: edgeData
		},
		datasAttr: {
			node: "data",
			edge: "edgeData"
		}
	});
	graph.update();
	return graph;
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/helper/multipleGraphEdgeHelper.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var KEY_DELIMITER = "-->";
/**
* params handler
* @param {module:echarts/model/SeriesModel} seriesModel
* @returns {*}
*/
var getAutoCurvenessParams = function(seriesModel) {
	return seriesModel.get("autoCurveness") || null;
};
/**
* Generate a list of edge curvatures, 20 is the default
* @param {module:echarts/model/SeriesModel} seriesModel
* @param {number} appendLength
* @return  20 => [0, -0.2, 0.2, -0.4, 0.4, -0.6, 0.6, -0.8, 0.8, -1, 1, -1.2, 1.2, -1.4, 1.4, -1.6, 1.6, -1.8, 1.8, -2]
*/
var createCurveness = function(seriesModel, appendLength) {
	var autoCurvenessParmas = getAutoCurvenessParams(seriesModel);
	var length = 20;
	var curvenessList = [];
	if (isNumber(autoCurvenessParmas)) length = autoCurvenessParmas;
	else if (isArray(autoCurvenessParmas)) {
		seriesModel.__curvenessList = autoCurvenessParmas;
		return;
	}
	if (appendLength > length) length = appendLength;
	var len = length % 2 ? length + 2 : length + 3;
	curvenessList = [];
	for (var i = 0; i < len; i++) curvenessList.push((i % 2 ? i + 1 : i) / 10 * (i % 2 ? -1 : 1));
	seriesModel.__curvenessList = curvenessList;
};
/**
* Create different cache key data in the positive and negative directions, in order to set the curvature later
* @param {number|string|module:echarts/data/Graph.Node} n1
* @param {number|string|module:echarts/data/Graph.Node} n2
* @param {module:echarts/model/SeriesModel} seriesModel
* @returns {string} key
*/
var getKeyOfEdges = function(n1, n2, seriesModel) {
	var source = [n1.id, n1.dataIndex].join(".");
	var target = [n2.id, n2.dataIndex].join(".");
	return [
		seriesModel.uid,
		source,
		target
	].join(KEY_DELIMITER);
};
/**
* get opposite key
* @param {string} key
* @returns {string}
*/
var getOppositeKey = function(key) {
	var keys = key.split(KEY_DELIMITER);
	return [
		keys[0],
		keys[2],
		keys[1]
	].join(KEY_DELIMITER);
};
/**
* get edgeMap with key
* @param edge
* @param {module:echarts/model/SeriesModel} seriesModel
*/
var getEdgeFromMap = function(edge, seriesModel) {
	var key = getKeyOfEdges(edge.node1, edge.node2, seriesModel);
	return seriesModel.__edgeMap[key];
};
/**
* calculate all cases total length
* @param edge
* @param seriesModel
* @returns {number}
*/
var getTotalLengthBetweenNodes = function(edge, seriesModel) {
	return getEdgeMapLengthWithKey(getKeyOfEdges(edge.node1, edge.node2, seriesModel), seriesModel) + getEdgeMapLengthWithKey(getKeyOfEdges(edge.node2, edge.node1, seriesModel), seriesModel);
};
/**
*
* @param key
*/
var getEdgeMapLengthWithKey = function(key, seriesModel) {
	var edgeMap = seriesModel.__edgeMap;
	return edgeMap[key] ? edgeMap[key].length : 0;
};
/**
* Count the number of edges between the same two points, used to obtain the curvature table and the parity of the edge
* @see /graph/GraphSeries.js@getInitialData
* @param {module:echarts/model/SeriesModel} seriesModel
*/
function initCurvenessList(seriesModel) {
	if (!getAutoCurvenessParams(seriesModel)) return;
	seriesModel.__curvenessList = [];
	seriesModel.__edgeMap = {};
	createCurveness(seriesModel);
}
/**
* set edgeMap with key
* @param {number|string|module:echarts/data/Graph.Node} n1
* @param {number|string|module:echarts/data/Graph.Node} n2
* @param {module:echarts/model/SeriesModel} seriesModel
* @param {number} index
*/
function createEdgeMapForCurveness(n1, n2, seriesModel, index) {
	if (!getAutoCurvenessParams(seriesModel)) return;
	var key = getKeyOfEdges(n1, n2, seriesModel);
	var edgeMap = seriesModel.__edgeMap;
	var oppositeEdges = edgeMap[getOppositeKey(key)];
	if (edgeMap[key] && !oppositeEdges) edgeMap[key].isForward = true;
	else if (oppositeEdges && edgeMap[key]) {
		oppositeEdges.isForward = true;
		edgeMap[key].isForward = false;
	}
	edgeMap[key] = edgeMap[key] || [];
	edgeMap[key].push(index);
}
/**
* get curvature for edge
* @param edge
* @param {module:echarts/model/SeriesModel} seriesModel
* @param index
*/
function getCurvenessForEdge(edge, seriesModel, index, needReverse) {
	var autoCurvenessParams = getAutoCurvenessParams(seriesModel);
	var isArrayParam = isArray(autoCurvenessParams);
	if (!autoCurvenessParams) return null;
	var edgeArray = getEdgeFromMap(edge, seriesModel);
	if (!edgeArray) return null;
	var edgeIndex = -1;
	for (var i = 0; i < edgeArray.length; i++) if (edgeArray[i] === index) {
		edgeIndex = i;
		break;
	}
	var totalLen = getTotalLengthBetweenNodes(edge, seriesModel);
	createCurveness(seriesModel, totalLen);
	edge.lineStyle = edge.lineStyle || {};
	var curKey = getKeyOfEdges(edge.node1, edge.node2, seriesModel);
	var curvenessList = seriesModel.__curvenessList;
	var parityCorrection = isArrayParam ? 0 : totalLen % 2 ? 0 : 1;
	if (!edgeArray.isForward) {
		var len = getEdgeMapLengthWithKey(getOppositeKey(curKey), seriesModel);
		var resValue = curvenessList[edgeIndex + len + parityCorrection];
		if (needReverse) {
			if (isArrayParam) {
				if (autoCurvenessParams && autoCurvenessParams[0] === 0) return (len + parityCorrection) % 2 ? resValue : -resValue;
				else return ((len % 2 ? 0 : 1) + parityCorrection) % 2 ? resValue : -resValue;
			} else return (len + parityCorrection) % 2 ? resValue : -resValue;
		} else return curvenessList[edgeIndex + len + parityCorrection];
	} else return curvenessList[parityCorrection + edgeIndex];
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/GraphSeries.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var SERIES_TYPE_GRAPH = "graph";
var GraphSeriesModel = function(_super) {
	__extends(GraphSeriesModel, _super);
	function GraphSeriesModel() {
		var _this = _super !== null && _super.apply(this, arguments) || this;
		_this.type = GraphSeriesModel.type;
		_this.hasSymbolVisual = true;
		return _this;
	}
	GraphSeriesModel.prototype.init = function(option) {
		_super.prototype.init.apply(this, arguments);
		var self = this;
		function getCategoriesData() {
			return self._categoriesData;
		}
		this.legendVisualProvider = new LegendVisualProvider(getCategoriesData, getCategoriesData);
		this.fillDataTextStyle(option.edges || option.links);
		this._updateCategoriesData();
	};
	GraphSeriesModel.prototype.mergeOption = function(option) {
		_super.prototype.mergeOption.apply(this, arguments);
		this.fillDataTextStyle(option.edges || option.links);
		this._updateCategoriesData();
	};
	GraphSeriesModel.prototype.mergeDefaultAndTheme = function(option) {
		_super.prototype.mergeDefaultAndTheme.apply(this, arguments);
		defaultEmphasis(option, "edgeLabel", ["show"]);
	};
	GraphSeriesModel.prototype.getInitialData = function(option, ecModel) {
		var edges = option.edges || option.links || [];
		var nodes = option.data || option.nodes || [];
		var self = this;
		if (nodes && edges) {
			initCurvenessList(this);
			var graph = createGraphFromNodeEdge(nodes, edges, this, true, beforeLink);
			each(graph.edges, function(edge) {
				createEdgeMapForCurveness(edge.node1, edge.node2, this, edge.dataIndex);
			}, this);
			return graph.data;
		}
		function beforeLink(nodeData, edgeData) {
			nodeData.wrapMethod("getItemModel", function(model) {
				var categoryModel = self._categoriesModels[model.getShallow("category")];
				if (categoryModel) {
					categoryModel.parentModel = model.parentModel;
					model.parentModel = categoryModel;
				}
				return model;
			});
			var oldGetModel = Model.prototype.getModel;
			function newGetModel(path, parentModel) {
				var model = oldGetModel.call(this, path, parentModel);
				model.resolveParentPath = resolveParentPath;
				return model;
			}
			edgeData.wrapMethod("getItemModel", function(model) {
				model.resolveParentPath = resolveParentPath;
				model.getModel = newGetModel;
				return model;
			});
			function resolveParentPath(pathArr) {
				if (pathArr && (pathArr[0] === "label" || pathArr[1] === "label")) {
					var newPathArr = pathArr.slice();
					if (pathArr[0] === "label") newPathArr[0] = "edgeLabel";
					else if (pathArr[1] === "label") newPathArr[1] = "edgeLabel";
					return newPathArr;
				}
				return pathArr;
			}
		}
	};
	GraphSeriesModel.prototype.getGraph = function() {
		return this.getData().graph;
	};
	GraphSeriesModel.prototype.getEdgeData = function() {
		return this.getGraph().edgeData;
	};
	GraphSeriesModel.prototype.getCategoriesData = function() {
		return this._categoriesData;
	};
	GraphSeriesModel.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
		if (dataType === "edge") {
			var nodeData = this.getData();
			var params = this.getDataParams(dataIndex, dataType);
			var edge = nodeData.graph.getEdgeByIndex(dataIndex);
			var sourceName = nodeData.getName(edge.node1.dataIndex);
			var targetName = nodeData.getName(edge.node2.dataIndex);
			var nameArr = [];
			sourceName != null && nameArr.push(sourceName);
			targetName != null && nameArr.push(targetName);
			return createTooltipMarkup("nameValue", {
				name: nameArr.join(" > "),
				value: params.value,
				noValue: params.value == null
			});
		}
		return defaultSeriesFormatTooltip({
			series: this,
			dataIndex,
			multipleSeries
		});
	};
	GraphSeriesModel.prototype._updateCategoriesData = function() {
		var categories = map(this.option.categories || [], function(category) {
			return category.value != null ? category : extend({ value: 0 }, category);
		});
		var categoriesData = new SeriesData(["value"], this);
		categoriesData.initData(categories);
		this._categoriesData = categoriesData;
		this._categoriesModels = categoriesData.mapArray(function(idx) {
			return categoriesData.getItemModel(idx);
		});
	};
	GraphSeriesModel.prototype.isAnimationEnabled = function() {
		return _super.prototype.isAnimationEnabled.call(this) && !(this.get("layout") === "force" && this.get(["force", "layoutAnimation"]));
	};
	GraphSeriesModel.prototype.__ownRoamView = function() {
		var coordSys = this.coordinateSystem;
		return isViewCoordSys(coordSys) && coordSys;
	};
	GraphSeriesModel.type = "series." + SERIES_TYPE_GRAPH;
	GraphSeriesModel.dependencies = [
		"grid",
		"polar",
		"geo",
		"singleAxis",
		"calendar"
	];
	GraphSeriesModel.defaultOption = {
		z: 2,
		coordinateSystem: "view",
		legendHoverLink: true,
		layout: null,
		circular: { rotateLabel: false },
		force: {
			initLayout: null,
			repulsion: [0, 50],
			gravity: .1,
			friction: .6,
			edgeLength: 30,
			layoutAnimation: true
		},
		left: "center",
		top: "center",
		symbol: "circle",
		symbolSize: 10,
		edgeSymbol: ["none", "none"],
		edgeSymbolSize: 10,
		edgeLabel: {
			position: "middle",
			distance: 5
		},
		draggable: false,
		roam: false,
		center: null,
		zoom: 1,
		nodeScaleRatio: .6,
		label: {
			show: false,
			formatter: "{b}"
		},
		itemStyle: {},
		lineStyle: {
			color: tokens.color.neutral50,
			width: 1,
			opacity: .5
		},
		emphasis: {
			scale: true,
			label: { show: true }
		},
		select: { itemStyle: { borderColor: tokens.color.primary } }
	};
	return GraphSeriesModel;
}(SeriesModel);
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/edgeVisual.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
function normalize(a) {
	if (!(a instanceof Array)) a = [a, a];
	return a;
}
var graphEdgeVisualStageHandler = createSimpleOverallStageHandler(SERIES_TYPE_GRAPH, graphEdgeVisual);
function graphEdgeVisual(ecModel) {
	ecModel.eachSeriesByType(SERIES_TYPE_GRAPH, function(seriesModel) {
		var graph = seriesModel.getGraph();
		var edgeData = seriesModel.getEdgeData();
		var symbolType = normalize(seriesModel.get("edgeSymbol"));
		var symbolSize = normalize(seriesModel.get("edgeSymbolSize"));
		edgeData.setVisual("fromSymbol", symbolType && symbolType[0]);
		edgeData.setVisual("toSymbol", symbolType && symbolType[1]);
		edgeData.setVisual("fromSymbolSize", symbolSize && symbolSize[0]);
		edgeData.setVisual("toSymbolSize", symbolSize && symbolSize[1]);
		edgeData.setVisual("style", seriesModel.getModel("lineStyle").getLineStyle());
		edgeData.each(function(idx) {
			var itemModel = edgeData.getItemModel(idx);
			var edge = graph.getEdgeByIndex(idx);
			var symbolType = normalize(itemModel.getShallow("symbol", true));
			var symbolSize = normalize(itemModel.getShallow("symbolSize", true));
			var style = itemModel.getModel("lineStyle").getLineStyle();
			var existsStyle = edgeData.ensureUniqueItemVisual(idx, "style");
			extend(existsStyle, style);
			switch (existsStyle.stroke) {
				case "source":
					var nodeStyle = edge.node1.getVisual("style");
					existsStyle.stroke = nodeStyle && nodeStyle.fill;
					break;
				case "target":
					var nodeStyle = edge.node2.getVisual("style");
					existsStyle.stroke = nodeStyle && nodeStyle.fill;
			}
			symbolType[0] && edge.setVisual("fromSymbol", symbolType[0]);
			symbolType[1] && edge.setVisual("toSymbol", symbolType[1]);
			symbolSize[0] && edge.setVisual("fromSymbolSize", symbolSize[0]);
			symbolSize[1] && edge.setVisual("toSymbolSize", symbolSize[1]);
		});
	});
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/simpleLayoutHelper.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
function simpleLayout(seriesModel) {
	var coordSys = seriesModel.coordinateSystem;
	if (coordSys && coordSys.type !== "view") return;
	var graph = seriesModel.getGraph();
	graph.eachNode(function(node) {
		var model = node.getModel();
		node.setLayout([+model.get("x"), +model.get("y")]);
	});
	simpleLayoutEdge(graph, seriesModel);
}
function simpleLayoutEdge(graph, seriesModel) {
	graph.eachEdge(function(edge, index) {
		var curveness = retrieve3(edge.getModel().get(["lineStyle", "curveness"]), -getCurvenessForEdge(edge, seriesModel, index, true), 0);
		var p1 = clone(edge.node1.getLayout());
		var p2 = clone(edge.node2.getLayout());
		var points = [p1, p2];
		if (+curveness) points.push([(p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * curveness, (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * curveness]);
		edge.setLayout(points);
	});
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/simpleLayout.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var graphSimpleLayoutStageHandler = createSimpleOverallStageHandler(SERIES_TYPE_GRAPH, graphSimpleLayout);
function graphSimpleLayout(ecModel, api) {
	ecModel.eachSeriesByType(SERIES_TYPE_GRAPH, function(seriesModel) {
		var layout = seriesModel.get("layout");
		var coordSys = seriesModel.coordinateSystem;
		if (coordSys && coordSys.type !== "view") {
			var data_1 = seriesModel.getData();
			var dimensions_1 = [];
			each(coordSys.dimensions, function(coordDim) {
				dimensions_1 = dimensions_1.concat(data_1.mapDimensionsAll(coordDim));
			});
			for (var dataIndex = 0; dataIndex < data_1.count(); dataIndex++) {
				var value = [];
				var hasValue = false;
				for (var i = 0; i < dimensions_1.length; i++) {
					var val = data_1.get(dimensions_1[i], dataIndex);
					if (!isNaN(val)) hasValue = true;
					value.push(val);
				}
				if (hasValue) data_1.setItemLayout(dataIndex, coordSys.dataToPoint(value));
				else data_1.setItemLayout(dataIndex, [NaN, NaN]);
			}
			simpleLayoutEdge(data_1.graph, seriesModel);
		} else if (!layout || layout === "none") simpleLayout(seriesModel);
	});
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/graphHelper.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
function getNodeGlobalScale(seriesModel) {
	var coordSys = seriesModel.coordinateSystem;
	return isViewCoordSys(coordSys) ? calcCompensationScaleToPreserveNodeSize(coordSys, seriesModel) : 1;
}
function getSymbolSize(node) {
	var symbolSize = node.getVisual("symbolSize");
	if (symbolSize instanceof Array) symbolSize = (symbolSize[0] + symbolSize[1]) / 2;
	return +symbolSize;
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/circularLayoutHelper.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var PI = Math.PI;
var _symbolRadiansHalf = [];
/**
* `basedOn` can be:
* 'value':
*     This layout is not accurate and have same bad case. For example,
*     if the min value is very smaller than the max value, the nodes
*     with the min value probably overlap even though there is enough
*     space to layout them. So we only use this approach in the as the
*     init layout of the force layout.
*     FIXME
*     Probably we do not need this method any more but use
*     `basedOn: 'symbolSize'` in force layout if
*     delay its init operations to GraphView.
* 'symbolSize':
*     This approach work only if all of the symbol size calculated.
*     That is, the progressive rendering is not applied to graph.
*     FIXME
*     If progressive rendering is applied to graph some day,
*     probably we have to use `basedOn: 'value'`.
*/
function circularLayout(seriesModel, basedOn, draggingNode, pointer) {
	var coordSys = seriesModel.coordinateSystem;
	if (coordSys && coordSys.type !== "view") return;
	var rect = coordSys.getBoundingRect();
	var nodeData = seriesModel.getData();
	var graph = nodeData.graph;
	var cx = rect.width / 2 + rect.x;
	var cy = rect.height / 2 + rect.y;
	var r = Math.min(rect.width, rect.height) / 2;
	var count = nodeData.count();
	nodeData.setLayout({
		cx,
		cy
	});
	if (!count) return;
	if (draggingNode) {
		var _a = coordSys.pointToData(pointer), tempX = _a[0], tempY = _a[1];
		var v = [tempX - cx, tempY - cy];
		normalize$1(v, v);
		scale(v, v, r);
		draggingNode.setLayout([cx + v[0], cy + v[1]], true);
		rotateNodeLabel(draggingNode, seriesModel.get(["circular", "rotateLabel"]), cx, cy);
	}
	_layoutNodesBasedOn[basedOn](seriesModel, graph, nodeData, r, cx, cy, count);
	graph.eachEdge(function(edge, index) {
		var curveness = retrieve3(edge.getModel().get(["lineStyle", "curveness"]), getCurvenessForEdge(edge, seriesModel, index), 0);
		var p1 = clone(edge.node1.getLayout());
		var p2 = clone(edge.node2.getLayout());
		var cp1;
		var x12 = (p1[0] + p2[0]) / 2;
		var y12 = (p1[1] + p2[1]) / 2;
		if (+curveness) {
			curveness *= 3;
			cp1 = [cx * curveness + x12 * (1 - curveness), cy * curveness + y12 * (1 - curveness)];
		}
		edge.setLayout([
			p1,
			p2,
			cp1
		]);
	});
}
var _layoutNodesBasedOn = {
	value: function(seriesModel, graph, nodeData, r, cx, cy, count) {
		var angle = 0;
		var sum = nodeData.getSum("value");
		var unitAngle = Math.PI * 2 / (sum || count);
		graph.eachNode(function(node) {
			var value = node.getValue("value");
			var radianHalf = unitAngle * (sum ? value : 1) / 2;
			angle += radianHalf;
			node.setLayout([r * Math.cos(angle) + cx, r * Math.sin(angle) + cy]);
			angle += radianHalf;
		});
	},
	symbolSize: function(seriesModel, graph, nodeData, r, cx, cy, count) {
		var sumRadian = 0;
		_symbolRadiansHalf.length = count;
		var nodeScale = getNodeGlobalScale(seriesModel);
		graph.eachNode(function(node) {
			var symbolSize = getSymbolSize(node);
			isNaN(symbolSize) && (symbolSize = 2);
			symbolSize < 0 && (symbolSize = 0);
			symbolSize *= nodeScale;
			var symbolRadianHalf = Math.asin(symbolSize / 2 / r);
			isNaN(symbolRadianHalf) && (symbolRadianHalf = PI / 2);
			_symbolRadiansHalf[node.dataIndex] = symbolRadianHalf;
			sumRadian += symbolRadianHalf * 2;
		});
		var halfRemainRadian = (2 * PI - sumRadian) / count / 2;
		var angle = 0;
		graph.eachNode(function(node) {
			var radianHalf = halfRemainRadian + _symbolRadiansHalf[node.dataIndex];
			angle += radianHalf;
			(!node.getLayout() || !node.getLayout().fixed) && node.setLayout([r * Math.cos(angle) + cx, r * Math.sin(angle) + cy]);
			angle += radianHalf;
		});
	}
};
function rotateNodeLabel(node, circularRotateLabel, cx, cy) {
	var el = node.getGraphicEl();
	if (!el) return;
	var labelRotate = node.getModel().get(["label", "rotate"]) || 0;
	var symbolPath = el.getSymbolPath();
	if (circularRotateLabel) {
		var pos = node.getLayout();
		var rad = Math.atan2(pos[1] - cy, pos[0] - cx);
		if (rad < 0) rad = Math.PI * 2 + rad;
		var isLeft = pos[0] < cx;
		if (isLeft) rad = rad - Math.PI;
		var textPosition = isLeft ? "left" : "right";
		symbolPath.setTextConfig({
			rotation: -rad,
			position: textPosition,
			origin: "center"
		});
		var emphasisState = symbolPath.ensureState("emphasis");
		extend(emphasisState.textConfig || (emphasisState.textConfig = {}), { position: textPosition });
	} else symbolPath.setTextConfig({ rotation: labelRotate *= Math.PI / 180 });
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/circularLayout.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var graphCircularLayoutStageHandler = createSimpleOverallStageHandler(SERIES_TYPE_GRAPH, graphCircularLayout);
function graphCircularLayout(ecModel) {
	ecModel.eachSeriesByType("graph", function(seriesModel) {
		if (seriesModel.get("layout") === "circular") circularLayout(seriesModel, "symbolSize");
	});
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/forceHelper.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var scaleAndAdd = scaleAndAdd$1;
function forceLayout(inNodes, inEdges, opts) {
	var nodes = inNodes;
	var edges = inEdges;
	var rect = opts.rect;
	var width = rect.width;
	var height = rect.height;
	var center = [rect.x + width / 2, rect.y + height / 2];
	var gravity = opts.gravity == null ? .1 : opts.gravity;
	for (var i = 0; i < nodes.length; i++) {
		var n = nodes[i];
		if (!n.p) n.p = create(width * (Math.random() - .5) + center[0], height * (Math.random() - .5) + center[1]);
		n.pp = clone(n.p);
		n.edges = null;
	}
	var initialFriction = opts.friction == null ? .6 : opts.friction;
	var friction = initialFriction;
	var beforeStepCallback;
	var afterStepCallback;
	return {
		warmUp: function() {
			friction = initialFriction * .8;
		},
		setFixed: function(idx) {
			nodes[idx].fixed = true;
		},
		setUnfixed: function(idx) {
			nodes[idx].fixed = false;
		},
		/**
		* Before step hook
		*/
		beforeStep: function(cb) {
			beforeStepCallback = cb;
		},
		/**
		* After step hook
		*/
		afterStep: function(cb) {
			afterStepCallback = cb;
		},
		/**
		* Some formulas were originally copied from "d3.js"
		* https://github.com/d3/d3/blob/b516d77fb8566b576088e73410437494717ada26/src/layout/force.js
		* with some modifications made for this project.
		* See the license statement at the head of this file.
		*/
		step: function(cb) {
			beforeStepCallback && beforeStepCallback(nodes, edges);
			var v12 = [];
			var nLen = nodes.length;
			for (var i = 0; i < edges.length; i++) {
				var e = edges[i];
				if (e.ignoreForceLayout) continue;
				var n1 = e.n1;
				var n2 = e.n2;
				sub(v12, n2.p, n1.p);
				var d = len(v12) - e.d;
				var w = n2.w / (n1.w + n2.w);
				if (isNaN(w)) w = 0;
				normalize$1(v12, v12);
				!n1.fixed && scaleAndAdd(n1.p, n1.p, v12, w * d * friction);
				!n2.fixed && scaleAndAdd(n2.p, n2.p, v12, -(1 - w) * d * friction);
			}
			for (var i = 0; i < nLen; i++) {
				var n = nodes[i];
				if (!n.fixed) {
					sub(v12, center, n.p);
					scaleAndAdd(n.p, n.p, v12, gravity * friction);
				}
			}
			for (var i = 0; i < nLen; i++) {
				var n1 = nodes[i];
				for (var j = i + 1; j < nLen; j++) {
					var n2 = nodes[j];
					sub(v12, n2.p, n1.p);
					var d = len(v12);
					if (d === 0) {
						set(v12, Math.random() - .5, Math.random() - .5);
						d = 1;
					}
					var repFact = (n1.rep + n2.rep) / d / d;
					!n1.fixed && scaleAndAdd(n1.pp, n1.pp, v12, repFact);
					!n2.fixed && scaleAndAdd(n2.pp, n2.pp, v12, -repFact);
				}
			}
			var v = [];
			for (var i = 0; i < nLen; i++) {
				var n = nodes[i];
				if (!n.fixed) {
					sub(v, n.p, n.pp);
					scaleAndAdd(n.p, n.p, v, friction);
					copy(n.pp, n.p);
				}
			}
			friction = friction * .992;
			var finished = friction < .01;
			afterStepCallback && afterStepCallback(nodes, edges, finished);
			cb && cb(finished);
		}
	};
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/forceLayout.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var graphForceLayoutStageHandler = createSimpleOverallStageHandler(SERIES_TYPE_GRAPH, graphForceLayout);
function graphForceLayout(ecModel) {
	ecModel.eachSeriesByType(SERIES_TYPE_GRAPH, function(graphSeries) {
		var coordSys = graphSeries.coordinateSystem;
		if (coordSys && coordSys.type !== "view") return;
		if (graphSeries.get("layout") === "force") {
			var preservedPoints_1 = graphSeries.preservedPoints || {};
			var graph_1 = graphSeries.getGraph();
			var nodeData_1 = graph_1.data;
			var edgeData = graph_1.edgeData;
			var forceModel = graphSeries.getModel("force");
			var initLayout = forceModel.get("initLayout");
			if (graphSeries.preservedPoints) nodeData_1.each(function(idx) {
				var id = nodeData_1.getId(idx);
				nodeData_1.setItemLayout(idx, preservedPoints_1[id] || [NaN, NaN]);
			});
			else if (!initLayout || initLayout === "none") simpleLayout(graphSeries);
			else if (initLayout === "circular") circularLayout(graphSeries, "value");
			var nodeDataExtent_1 = nodeData_1.getDataExtent("value");
			var edgeDataExtent_1 = edgeData.getDataExtent("value");
			var repulsion = forceModel.get("repulsion");
			var edgeLength = forceModel.get("edgeLength");
			var repulsionArr_1 = isArray(repulsion) ? repulsion : [repulsion, repulsion];
			var edgeLengthArr_1 = isArray(edgeLength) ? edgeLength : [edgeLength, edgeLength];
			edgeLengthArr_1 = [edgeLengthArr_1[1], edgeLengthArr_1[0]];
			var nodes_1 = nodeData_1.mapArray("value", function(value, idx) {
				var point = nodeData_1.getItemLayout(idx);
				var rep = linearMap(value, nodeDataExtent_1, repulsionArr_1);
				if (isNaN(rep)) rep = (repulsionArr_1[0] + repulsionArr_1[1]) / 2;
				return {
					w: rep,
					rep,
					fixed: nodeData_1.getItemModel(idx).get("fixed"),
					p: !point || isNaN(point[0]) || isNaN(point[1]) ? null : point
				};
			});
			var forceInstance = forceLayout(nodes_1, edgeData.mapArray("value", function(value, idx) {
				var edge = graph_1.getEdgeByIndex(idx);
				var d = linearMap(value, edgeDataExtent_1, edgeLengthArr_1);
				if (isNaN(d)) d = (edgeLengthArr_1[0] + edgeLengthArr_1[1]) / 2;
				var edgeModel = edge.getModel();
				var curveness = retrieve3(edge.getModel().get(["lineStyle", "curveness"]), -getCurvenessForEdge(edge, graphSeries, idx, true), 0);
				return {
					n1: nodes_1[edge.node1.dataIndex],
					n2: nodes_1[edge.node2.dataIndex],
					d,
					curveness,
					ignoreForceLayout: edgeModel.get("ignoreForceLayout")
				};
			}), {
				rect: coordSys.getBoundingRect(),
				gravity: forceModel.get("gravity"),
				friction: forceModel.get("friction")
			});
			forceInstance.beforeStep(function(nodes, edges) {
				for (var i = 0, l = nodes.length; i < l; i++) if (nodes[i].fixed) copy(nodes[i].p, graph_1.getNodeByIndex(i).getLayout());
			});
			forceInstance.afterStep(function(nodes, edges, stopped) {
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (!nodes[i].fixed) graph_1.getNodeByIndex(i).setLayout(nodes[i].p);
					preservedPoints_1[nodeData_1.getId(i)] = nodes[i].p;
				}
				for (var i = 0, l = edges.length; i < l; i++) {
					var e = edges[i];
					var edge = graph_1.getEdgeByIndex(i);
					var p1 = e.n1.p;
					var p2 = e.n2.p;
					var points = edge.getLayout();
					points = points ? points.slice() : [];
					points[0] = points[0] || [];
					points[1] = points[1] || [];
					copy(points[0], p1);
					copy(points[1], p2);
					if (+e.curveness) points[2] = [(p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * e.curveness, (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * e.curveness];
					edge.setLayout(points);
				}
			});
			graphSeries.forceLayout = forceInstance;
			graphSeries.preservedPoints = preservedPoints_1;
			forceInstance.step();
		} else graphSeries.forceLayout = null;
	});
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/createView.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
function getViewRect(seriesModel, api, aspect) {
	var layoutRef = createBoxLayoutReference(seriesModel, api);
	var option = extend(seriesModel.getBoxLayoutParams(), { aspect });
	var viewRect = getLayoutRect(option, layoutRef.refContainer);
	return applyPreserveAspect(seriesModel, viewRect, aspect);
}
function createViewCoordSys(ecModel, api) {
	var viewList = [];
	ecModel.eachSeriesByType("graph", function(seriesModel) {
		injectCoordSysByOption({
			targetModel: seriesModel,
			coordSysType: "view",
			coordSysProvider: createViewCoordSys,
			isDefaultDataCoordSys: true
		});
		function createViewCoordSys() {
			var data = seriesModel.getData();
			var positions = data.mapArray(function(idx) {
				var itemModel = data.getItemModel(idx);
				return [+itemModel.get("x"), +itemModel.get("y")];
			});
			var min = [];
			var max = [];
			fromPoints(positions, min, max);
			if (max[0] - min[0] === 0) {
				max[0] += 1;
				min[0] -= 1;
			}
			if (max[1] - min[1] === 0) {
				max[1] += 1;
				min[1] -= 1;
			}
			var aspect = (max[0] - min[0]) / (max[1] - min[1]);
			var viewRect = getViewRect(seriesModel, api, aspect);
			if (isNaN(aspect)) {
				min = [viewRect.x, viewRect.y];
				max = [viewRect.x + viewRect.width, viewRect.y + viewRect.height];
			}
			var bbWidth = max[0] - min[0];
			var bbHeight = max[1] - min[1];
			var viewCoordSys = createViewCoordSysSimply(seriesModel, api, min[0], min[1], bbWidth, bbHeight, viewRect);
			viewList.push(viewCoordSys);
			return viewCoordSys;
		}
	});
	return viewList;
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/adjustEdge.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var v1 = [];
var v2 = [];
var v3 = [];
var quadraticAt = quadraticAt$1;
var v2DistSquare = distSquare;
var mathAbs = Math.abs;
function intersectCurveCircle(curvePoints, center, radius) {
	var p0 = curvePoints[0];
	var p1 = curvePoints[1];
	var p2 = curvePoints[2];
	var d = 1e400;
	var t;
	var radiusSquare = radius * radius;
	var interval = .1;
	for (var _t = .1; _t <= .9; _t += .1) {
		v1[0] = quadraticAt(p0[0], p1[0], p2[0], _t);
		v1[1] = quadraticAt(p0[1], p1[1], p2[1], _t);
		var diff = mathAbs(v2DistSquare(v1, center) - radiusSquare);
		if (diff < d) {
			d = diff;
			t = _t;
		}
	}
	for (var i = 0; i < 32; i++) {
		var next = t + interval;
		v2[0] = quadraticAt(p0[0], p1[0], p2[0], t);
		v2[1] = quadraticAt(p0[1], p1[1], p2[1], t);
		v3[0] = quadraticAt(p0[0], p1[0], p2[0], next);
		v3[1] = quadraticAt(p0[1], p1[1], p2[1], next);
		var diff = v2DistSquare(v2, center) - radiusSquare;
		if (mathAbs(diff) < .01) break;
		var nextDiff = v2DistSquare(v3, center) - radiusSquare;
		interval /= 2;
		if (diff < 0) {
			if (nextDiff >= 0) t = t + interval;
			else t = t - interval;
		} else if (nextDiff >= 0) t = t - interval;
		else t = t + interval;
	}
	return t;
}
function adjustEdge(graph, scale) {
	var tmp0 = [];
	var quadraticSubdivide$1 = quadraticSubdivide;
	var pts = [
		[],
		[],
		[]
	];
	var pts2 = [[], []];
	var v = [];
	scale /= 2;
	graph.eachEdge(function(edge, idx) {
		var linePoints = edge.getLayout();
		var fromSymbol = edge.getVisual("fromSymbol");
		var toSymbol = edge.getVisual("toSymbol");
		if (!linePoints.__original) {
			linePoints.__original = [clone(linePoints[0]), clone(linePoints[1])];
			if (linePoints[2]) linePoints.__original.push(clone(linePoints[2]));
		}
		var originalPoints = linePoints.__original;
		if (linePoints[2] != null) {
			copy(pts[0], originalPoints[0]);
			copy(pts[1], originalPoints[2]);
			copy(pts[2], originalPoints[1]);
			if (fromSymbol && fromSymbol !== "none") {
				var symbolSize = getSymbolSize(edge.node1);
				var t = intersectCurveCircle(pts, originalPoints[0], symbolSize * scale);
				quadraticSubdivide$1(pts[0][0], pts[1][0], pts[2][0], t, tmp0);
				pts[0][0] = tmp0[3];
				pts[1][0] = tmp0[4];
				quadraticSubdivide$1(pts[0][1], pts[1][1], pts[2][1], t, tmp0);
				pts[0][1] = tmp0[3];
				pts[1][1] = tmp0[4];
			}
			if (toSymbol && toSymbol !== "none") {
				var symbolSize = getSymbolSize(edge.node2);
				var t = intersectCurveCircle(pts, originalPoints[1], symbolSize * scale);
				quadraticSubdivide$1(pts[0][0], pts[1][0], pts[2][0], t, tmp0);
				pts[1][0] = tmp0[1];
				pts[2][0] = tmp0[2];
				quadraticSubdivide$1(pts[0][1], pts[1][1], pts[2][1], t, tmp0);
				pts[1][1] = tmp0[1];
				pts[2][1] = tmp0[2];
			}
			copy(linePoints[0], pts[0]);
			copy(linePoints[1], pts[2]);
			copy(linePoints[2], pts[1]);
		} else {
			copy(pts2[0], originalPoints[0]);
			copy(pts2[1], originalPoints[1]);
			sub(v, pts2[1], pts2[0]);
			normalize$1(v, v);
			if (fromSymbol && fromSymbol !== "none") {
				var symbolSize = getSymbolSize(edge.node1);
				scaleAndAdd$1(pts2[0], pts2[0], v, symbolSize * scale);
			}
			if (toSymbol && toSymbol !== "none") {
				var symbolSize = getSymbolSize(edge.node2);
				scaleAndAdd$1(pts2[1], pts2[1], v, -symbolSize * scale);
			}
			copy(linePoints[0], pts2[0]);
			copy(linePoints[1], pts2[1]);
		}
	});
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/GraphView.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var GraphView = function(_super) {
	__extends(GraphView, _super);
	function GraphView() {
		var _this = _super !== null && _super.apply(this, arguments) || this;
		_this.type = SERIES_TYPE_GRAPH;
		return _this;
	}
	GraphView.prototype.init = function(ecModel, api) {
		var symbolDraw = new SymbolDraw();
		var lineDraw = new LineDraw();
		var group = this.group;
		var mainGroup = new Group();
		this._controller = new RoamController(api.getZr());
		mainGroup.add(symbolDraw.group);
		mainGroup.add(lineDraw.group);
		group.add(mainGroup);
		this._symbolDraw = symbolDraw;
		this._lineDraw = lineDraw;
		this._mainGroup = mainGroup;
		this._firstRender = true;
	};
	GraphView.prototype.render = function(seriesModel, ecModel, api) {
		var _this = this;
		var ownCoordSys = getOwnRoamViewCoordSys(seriesModel);
		var isForceLayout = false;
		this._model = seriesModel;
		this._api = api;
		this._active = true;
		var mainGroup = this._mainGroup;
		var thumbnailInfo = this._getThumbnailInfo();
		if (thumbnailInfo) thumbnailInfo.bridge.reset(api);
		var symbolDraw = this._symbolDraw;
		var lineDraw = this._lineDraw;
		if (ownCoordSys) applyViewCoordSysTransToElement(mainGroup, 2, ownCoordSys, this._firstRender ? null : seriesModel);
		adjustEdge(seriesModel.getGraph(), getNodeGlobalScale(seriesModel));
		var data = seriesModel.getData();
		symbolDraw.updateData(data);
		var edgeData = seriesModel.getEdgeData();
		lineDraw.updateData(edgeData);
		this._updateNodeAndLinkScale();
		if (ownCoordSys) updateRoamControllerSimply(seriesModel, api, this._controller, function(e, x, y) {
			return seriesModel.coordinateSystem.containPoint([x, y]);
		}, null);
		clearTimeout(this._layoutTimeout);
		var forceLayout = seriesModel.forceLayout;
		var layoutAnimation = seriesModel.get(["force", "layoutAnimation"]);
		if (forceLayout) {
			isForceLayout = true;
			this._startForceLayoutIteration(forceLayout, api, layoutAnimation);
		}
		var layout = seriesModel.get("layout");
		data.graph.eachNode(function(node) {
			var idx = node.dataIndex;
			var el = node.getGraphicEl();
			var itemModel = node.getModel();
			if (!el) return;
			el.off("drag").off("dragend");
			var draggable = itemModel.get("draggable");
			if (draggable) el.on("drag", function(e) {
				switch (layout) {
					case "force":
						forceLayout.warmUp();
						!_this._layouting && _this._startForceLayoutIteration(forceLayout, api, layoutAnimation);
						forceLayout.setFixed(idx);
						data.setItemLayout(idx, [el.x, el.y]);
						break;
					case "circular":
						data.setItemLayout(idx, [el.x, el.y]);
						node.setLayout({ fixed: true }, true);
						circularLayout(seriesModel, "symbolSize", node, [e.offsetX, e.offsetY]);
						_this.updateLayout(seriesModel);
						break;
					default:
						data.setItemLayout(idx, [el.x, el.y]);
						simpleLayoutEdge(seriesModel.getGraph(), seriesModel);
						_this.updateLayout(seriesModel);
				}
			}).on("dragend", function() {
				if (forceLayout) forceLayout.setUnfixed(idx);
			});
			el.setDraggable(draggable, !!itemModel.get("cursor"));
			if (itemModel.get(["emphasis", "focus"]) === "adjacency") getECData(el).focus = node.getAdjacentDataIndices();
		});
		data.graph.eachEdge(function(edge) {
			var el = edge.getGraphicEl();
			var focus = edge.getModel().get(["emphasis", "focus"]);
			if (!el) return;
			if (focus === "adjacency") getECData(el).focus = {
				edge: [edge.dataIndex],
				node: [edge.node1.dataIndex, edge.node2.dataIndex]
			};
		});
		var circularRotateLabel = seriesModel.get("layout") === "circular" && seriesModel.get(["circular", "rotateLabel"]);
		var cx = data.getLayout("cx");
		var cy = data.getLayout("cy");
		data.graph.eachNode(function(node) {
			rotateNodeLabel(node, circularRotateLabel, cx, cy);
		});
		this._firstRender = false;
		if (!isForceLayout) this._renderThumbnail(seriesModel, api, this._symbolDraw, this._lineDraw);
	};
	GraphView.prototype.dispose = function() {
		this.remove();
		this._controller && this._controller.dispose();
	};
	GraphView.prototype._startForceLayoutIteration = function(forceLayout, api, layoutAnimation) {
		var self = this;
		var firstRendered = false;
		(function step() {
			forceLayout.step(function(stopped) {
				self.updateLayout(self._model);
				if (stopped || !firstRendered) {
					firstRendered = true;
					self._renderThumbnail(self._model, api, self._symbolDraw, self._lineDraw);
				}
				(self._layouting = !stopped) && (layoutAnimation ? self._layoutTimeout = setTimeout(step, 16) : step());
			});
		})();
	};
	/**
	* @implements RoamHostView['__updateOnOwnRoam']
	*/
	GraphView.prototype.__updateOnOwnRoam = function(payload, seriesModel, api) {
		var ownCoordSys = getOwnRoamViewCoordSys(seriesModel);
		if (!this._active || !ownCoordSys) return;
		applyViewCoordSysTransToElement(this._mainGroup, 2, ownCoordSys, null);
		if (isRoamPayloadHasZoom(payload)) {
			this._updateNodeAndLinkScale();
			adjustEdge(seriesModel.getGraph(), getNodeGlobalScale(seriesModel));
			this._lineDraw.updateLayout();
			api.updateLabelLayout();
		}
		this._updateThumbnailWindow();
	};
	GraphView.prototype._updateNodeAndLinkScale = function() {
		var seriesModel = this._model;
		var data = seriesModel.getData();
		var nodeScale = getNodeGlobalScale(seriesModel);
		data.eachItemGraphicEl(function(el, idx) {
			el && el.setSymbolScale(nodeScale);
		});
	};
	GraphView.prototype.updateLayout = function(seriesModel) {
		if (!this._active) return;
		adjustEdge(seriesModel.getGraph(), getNodeGlobalScale(seriesModel));
		this._symbolDraw.updateLayout();
		this._lineDraw.updateLayout();
	};
	GraphView.prototype.remove = function() {
		this._active = false;
		clearTimeout(this._layoutTimeout);
		this._layouting = false;
		this._layoutTimeout = null;
		this._symbolDraw && this._symbolDraw.remove();
		this._lineDraw && this._lineDraw.remove();
		this._controller && this._controller.disable();
	};
	/**
	* Get thumbnail data structure only if supported.
	*/
	GraphView.prototype._getThumbnailInfo = function() {
		var model = this._model;
		var coordSys = model.coordinateSystem;
		if (coordSys.type !== "view") return;
		var bridge = getThumbnailBridge(model);
		if (!bridge) return;
		return {
			bridge,
			coordSys
		};
	};
	GraphView.prototype._updateThumbnailWindow = function() {
		var info = this._getThumbnailInfo();
		if (info) info.bridge.updateWindow(viewCoordSysCopyOverallMatrix(null, info.coordSys), this._api);
	};
	GraphView.prototype._renderThumbnail = function(seriesModel, api, symbolDraw, lineDraw) {
		var info = this._getThumbnailInfo();
		if (!info) return;
		var bridgeGroup = new Group();
		var symbolNodes = symbolDraw.group.children();
		var lineNodes = lineDraw.group.children();
		var lineGroup = new Group();
		var symbolGroup = new Group();
		bridgeGroup.add(symbolGroup);
		bridgeGroup.add(lineGroup);
		for (var i = 0; i < symbolNodes.length; i++) {
			var node = symbolNodes[i];
			var sub = node.children()[0];
			var x = node.x;
			var y = node.y;
			var subShape = clone$1(sub.shape);
			var shape = extend(subShape, {
				width: sub.scaleX,
				height: sub.scaleY,
				x: x - sub.scaleX / 2,
				y: y - sub.scaleY / 2
			});
			var style = clone$1(sub.style);
			var subThumbnail = new sub.constructor({
				shape,
				style,
				z2: 151
			});
			symbolGroup.add(subThumbnail);
		}
		for (var i = 0; i < lineNodes.length; i++) {
			var node = lineNodes[i];
			var line = node.children()[0];
			var style = clone$1(line.style);
			var shape = clone$1(line.shape);
			var lineThumbnail = new ECLinePath({
				style,
				shape,
				z2: 151
			});
			lineGroup.add(lineThumbnail);
		}
		info.bridge.renderContent({
			api,
			roamType: seriesModel.get("roam"),
			viewportRect: null,
			group: bridgeGroup,
			targetTrans: viewCoordSysCopyOverallMatrix(null, info.coordSys)
		});
	};
	GraphView.type = SERIES_TYPE_GRAPH;
	return GraphView;
}(ChartView);
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/categoryFilter.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var graphCategoryFilterStageHandler = createSimpleOverallStageHandler(SERIES_TYPE_GRAPH, categoryFilter);
function categoryFilter(ecModel) {
	var legendModels = ecModel.findComponents({ mainType: "legend" });
	if (!legendModels || !legendModels.length) return;
	ecModel.eachSeriesByType(SERIES_TYPE_GRAPH, function(graphSeries) {
		var categoriesData = graphSeries.getCategoriesData();
		var data = graphSeries.getGraph().data;
		var categoryNames = categoriesData.mapArray(categoriesData.getName);
		data.filterSelf(function(idx) {
			var category = data.getItemModel(idx).getShallow("category");
			if (category != null) {
				if (isNumber(category)) category = categoryNames[category];
				for (var i = 0; i < legendModels.length; i++) if (!legendModels[i].isSelected(category)) return false;
			}
			return true;
		});
	});
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/categoryVisual.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var graphCategoryVisualStageHandler = createSimpleOverallStageHandler(SERIES_TYPE_GRAPH, categoryVisual);
function categoryVisual(ecModel) {
	var paletteScope = {};
	ecModel.eachSeriesByType(SERIES_TYPE_GRAPH, function(seriesModel) {
		var categoriesData = seriesModel.getCategoriesData();
		var data = seriesModel.getData();
		var categoryNameIdxMap = {};
		categoriesData.each(function(idx) {
			var name = categoriesData.getName(idx);
			categoryNameIdxMap["ec-" + name] = idx;
			var itemModel = categoriesData.getItemModel(idx);
			var style = itemModel.getModel("itemStyle").getItemStyle();
			if (!style.fill) style.fill = seriesModel.getColorFromPalette(name, paletteScope);
			categoriesData.setItemVisual(idx, "style", style);
			var symbolVisualList = [
				"symbol",
				"symbolSize",
				"symbolKeepAspect"
			];
			for (var i = 0; i < symbolVisualList.length; i++) {
				var symbolVisual = itemModel.getShallow(symbolVisualList[i], true);
				if (symbolVisual != null) categoriesData.setItemVisual(idx, symbolVisualList[i], symbolVisual);
			}
		});
		if (categoriesData.count()) data.each(function(idx) {
			var categoryIdx = data.getItemModel(idx).getShallow("category");
			if (categoryIdx != null) {
				if (isString(categoryIdx)) categoryIdx = categoryNameIdxMap["ec-" + categoryIdx];
				var categoryStyle = categoriesData.getItemVisual(categoryIdx, "style");
				var style = data.ensureUniqueItemVisual(idx, "style");
				extend(style, categoryStyle);
				var visualList = [
					"symbol",
					"symbolSize",
					"symbolKeepAspect"
				];
				for (var i = 0; i < visualList.length; i++) data.setItemVisual(idx, visualList[i], categoriesData.getItemVisual(categoryIdx, visualList[i]));
			}
		});
	});
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/chart/graph/install.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
function install(registers) {
	registers.registerChartView(GraphView);
	registers.registerSeriesModel(GraphSeriesModel);
	registers.registerProcessor(graphCategoryFilterStageHandler);
	registers.registerVisual(graphCategoryVisualStageHandler);
	registers.registerVisual(graphEdgeVisualStageHandler);
	registers.registerLayout(graphSimpleLayoutStageHandler);
	registers.registerLayout(registers.PRIORITY.VISUAL.POST_CHART_LAYOUT, graphCircularLayoutStageHandler);
	registers.registerLayout(graphForceLayoutStageHandler);
	registers.registerCoordinateSystem("graphView", {
		dimensions: View.dimensions,
		create: createViewCoordSys
	});
	registers.registerAction({
		type: "focusNodeAdjacency",
		event: "focusNodeAdjacency",
		update: "series:focusNodeAdjacency"
	}, noop);
	registers.registerAction({
		type: "unfocusNodeAdjacency",
		event: "unfocusNodeAdjacency",
		update: "series:unfocusNodeAdjacency"
	}, noop);
	registerRoamActionSimply(registers, COMPONENT_MAIN_TYPE_SERIES, SERIES_TYPE_GRAPH);
}
// ../plots/word-cloud/src/layout.ts
var shifted = (box, x, y) => ({
	...box,
	x: box.x + x,
	y: box.y + y
});
var area = (box) => box.width * box.height;
function intersection(a, b, gap = 0) {
	return Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x) + gap) * Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y) + gap);
}
function boxCircle(box, node, gap) {
	const x = Math.max(box.x, Math.min(node.x, box.x + box.width));
	const y = Math.max(box.y, Math.min(node.y, box.y + box.height));
	return Math.hypot(x - node.x, y - node.y) < node.body.width / 2 + gap;
}
function cloudBackgroundsOverlap(a, b) {
	return intersection(shifted(a.body, a.x, a.y), shifted(b.body, b.x, b.y)) > 0;
}
function cloudNodesCollide(a, b, gap, overlap) {
	var _a$overlapArea2, _b$overlapArea2;
	const ab = shifted(a.body, a.x, a.y), bb = shifted(b.body, b.x, b.y);
	if (a.circle && b.circle) {
		if (Math.hypot(a.x - b.x, a.y - b.y) < (a.body.width + b.body.width) / 2 + gap) return true;
		return a.labels.some((label) => boxCircle(shifted(label, a.x, a.y), b, gap)) || b.labels.some((label) => boxCircle(shifted(label, b.x, b.y), a, gap)) || a.labels.some((al) => b.labels.some((bl) => intersection(shifted(al, a.x, a.y), shifted(bl, b.x, b.y), gap) > 0));
	}
	if (a.rect && b.rect) {
		var _a$overlapArea, _b$overlapArea;
		const spacing = Math.max(8, gap);
		const width = Math.min(ab.x + ab.width, bb.x + bb.width) - Math.max(ab.x, bb.x);
		const height = Math.min(ab.y + ab.height, bb.y + bb.height) - Math.max(ab.y, bb.y);
		if (overlap === 0 || width <= 0 || height <= 0) return intersection(shifted(a.bounds, a.x, a.y), shifted(b.bounds, b.x, b.y), spacing) > 0;
		if (width < 6 || height < 6 || width * height > Math.min((_a$overlapArea = a.overlapArea) !== null && _a$overlapArea !== void 0 ? _a$overlapArea : area(ab), (_b$overlapArea = b.overlapArea) !== null && _b$overlapArea !== void 0 ? _b$overlapArea : area(bb)) * overlap) return true;
		return false;
	}
	if (overlap === 0) return intersection(shifted(a.bounds, a.x, a.y), shifted(b.bounds, b.x, b.y), gap) > 0;
	if (intersection(ab, bb, gap) > Math.min((_a$overlapArea2 = a.overlapArea) !== null && _a$overlapArea2 !== void 0 ? _a$overlapArea2 : area(ab), (_b$overlapArea2 = b.overlapArea) !== null && _b$overlapArea2 !== void 0 ? _b$overlapArea2 : area(bb)) * overlap) return true;
	return a.labels.some((label) => intersection(shifted(label, a.x, a.y), bb, gap) > 0) || b.labels.some((label) => intersection(shifted(label, b.x, b.y), ab, gap) > 0) || a.labels.some((al) => b.labels.some((bl) => intersection(shifted(al, a.x, a.y), shifted(bl, b.x, b.y), gap) > 0));
}
/** Bounded deterministic placement. Sorting never changes caller data or raw indices. */
function layoutCloud(nodes, frame, gap, overlap) {
	if (![
		frame.x,
		frame.y,
		frame.width,
		frame.height
	].every(Number.isFinite) || frame.width <= 0 || frame.height <= 0) return [];
	if (nodes.some((node) => node.rect)) gap = Math.max(8, gap);
	const placed = [];
	const cells = /* @__PURE__ */ new Map();
	const overlapCounts = /* @__PURE__ */ new Map();
	const oversized = [];
	const cellSize = 64;
	const keys = (box) => {
		const left = Math.floor((box.x - gap) / cellSize);
		const right = Math.floor((box.x + box.width + gap) / cellSize);
		const top = Math.floor((box.y - gap) / cellSize);
		const bottom = Math.floor((box.y + box.height + gap) / cellSize);
		if (![
			left,
			right,
			top,
			bottom
		].every(Number.isSafeInteger) || (right - left + 1) * (bottom - top + 1) > 4096) return;
		const result = [];
		for (let x = left; x <= right; x++) for (let y = top; y <= bottom; y++) result.push(`${x},${y}`);
		return result;
	};
	const order = [...nodes].sort((a, b) => b.value - a.value || area(b.bounds) - area(a.bounds) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
	const centerX = frame.x + frame.width / 2, centerY = frame.y + frame.height / 2;
	for (const node of order) {
		var _node$viewportBounds;
		const viewportBounds = (_node$viewportBounds = node.viewportBounds) !== null && _node$viewportBounds !== void 0 ? _node$viewportBounds : node.bounds;
		if (![
			node.body,
			node.bounds,
			viewportBounds,
			...node.labels
		].every((box) => [
			box.x,
			box.y,
			box.width,
			box.height
		].every(Number.isFinite) && box.width >= 0 && box.height >= 0) || viewportBounds.width > frame.width || viewportBounds.height > frame.height) continue;
		const tryPlace = (x, y) => {
			const box = shifted(node.bounds, x, y);
			const viewport = shifted(viewportBounds, x, y);
			if (viewport.x < frame.x || viewport.y < frame.y || viewport.x + viewport.width > frame.x + frame.width || viewport.y + viewport.height > frame.y + frame.height) return false;
			const candidate = {
				...node,
				x,
				y
			};
			const bucketKeys = keys(box);
			const nearby = new Set(bucketKeys ? [...oversized, ...bucketKeys.flatMap((key) => {
				var _cells$get;
				return (_cells$get = cells.get(key)) !== null && _cells$get !== void 0 ? _cells$get : [];
			})] : placed);
			if ([...nearby].some((other) => cloudNodesCollide(candidate, other, gap, overlap))) return false;
			const partners = node.rect && overlap > 0 ? [...nearby].filter((other) => other.rect && cloudBackgroundsOverlap(candidate, other)) : [];
			if (partners.length > 2 || partners.some((other) => overlapCounts.get(other) >= 2)) return false;
			overlapCounts.set(candidate, partners.length);
			for (const other of partners) overlapCounts.set(other, overlapCounts.get(other) + 1);
			placed.push(candidate);
			if (!bucketKeys) oversized.push(candidate);
			for (const key of bucketKeys !== null && bucketKeys !== void 0 ? bucketKeys : []) {
				var _cells$get2;
				const bucket = (_cells$get2 = cells.get(key)) !== null && _cells$get2 !== void 0 ? _cells$get2 : [];
				bucket.push(candidate);
				cells.set(key, bucket);
			}
			return true;
		};
		if (tryPlace(centerX, centerY)) continue;
		let done = false;
		if (node.circle) for (const anchor of placed.slice(-16)) {
			const radius = (node.body.width + anchor.body.width) / 2 + gap + .01;
			for (let step = 0; step < 24; step++) {
				const angle = step * Math.PI / 12;
				if (tryPlace(anchor.x + Math.cos(angle) * radius, anchor.y + Math.sin(angle) * radius)) {
					done = true;
					break;
				}
			}
			if (done) break;
		}
		if (done) continue;
		const aspect = Math.max(.25, Math.min(4, frame.width / frame.height));
		for (let step = 1; step <= 5e3; step++) {
			const angle = step * .28, radius = angle * 6 / (2 * Math.PI);
			if (tryPlace(centerX + Math.cos(angle) * radius * Math.sqrt(aspect), centerY + Math.sin(angle) * radius / Math.sqrt(aspect))) break;
		}
	}
	return placed;
}
function cloudSize(value, min, max, range, circle = false) {
	const t = max === 0 ? 0 : max === min ? .5 : (value - min) / (max - min);
	return circle ? Math.sqrt(range[0] ** 2 + t * (range[1] ** 2 - range[0] ** 2)) : range[0] + t * (range[1] - range[0]);
}
/** Scalar domain without the engine argument-count limit of Math.min(...values). */
function cloudExtent(values) {
	let min = 1e400;
	let max = 0;
	for (const value of values) {
		min = Math.min(min, value);
		max = Math.max(max, value);
	}
	return [values.length ? min : 0, max];
}
// ../plots/word-cloud/src/types.ts
var wordCloudSeriesProps = [
	"id",
	"name",
	"label",
	"itemStyle",
	"symbolSize",
	"categories",
	"emphasis",
	"blur",
	"select",
	"selectedMode",
	"labelLayout",
	"silent",
	"cursor",
	"legendHoverLink",
	"left",
	"right",
	"top",
	"bottom",
	"width",
	"height",
	"z",
	"zlevel"
];
var wordCloudProps = [
	...wordCloudSeriesProps,
	"data",
	"shape",
	"sizeRange",
	"gap",
	"overlap",
	"plotTheme",
	"motion"
];
// ../plots/word-cloud/src/createWordCloudOption.ts
function warn(message) {
	console.warn(`[IxWordCloudChart] ${message}`);
}
function textOpacity(value, min, max) {
	if (!Number.isFinite(value) || value < 0) return .35;
	if (min === max) return 1;
	return .35 + (value - min) / (max - min) * .65;
}
function createWordCloudOption(props) {
	var _props$shape, _props$sizeRange, _props$gap, _props$overlap, _props$data, _props$plotTheme, _theme$color, _motionInput$amplitud, _motionInput$amplitud2, _motionInput$duration, _motionInput$pauseOnH, _props$categories, _props$color;
	const finish = (series) => mergeNativePlotOptions({ series }, props, wordCloudProps);
	if (props.series !== void 0) return finish([]);
	const shape = (_props$shape = props.shape) !== null && _props$shape !== void 0 ? _props$shape : "text";
	const sizeRange = (_props$sizeRange = props.sizeRange) !== null && _props$sizeRange !== void 0 ? _props$sizeRange : shape === "text" ? [12, 48] : shape === "rect" ? [24, 40] : [48, 120];
	const gap = (_props$gap = props.gap) !== null && _props$gap !== void 0 ? _props$gap : shape === "text" ? 4 : 8;
	const overlap = (_props$overlap = props.overlap) !== null && _props$overlap !== void 0 ? _props$overlap : 0;
	if (![
		"text",
		"rect",
		"circle"
	].includes(shape) || !Array.isArray(sizeRange) || sizeRange.length !== 2 || !Array.from(sizeRange).every((n) => Number.isFinite(n) && n > 0) || sizeRange[1] < sizeRange[0] || !Number.isFinite(gap) || gap < 0 || !Number.isFinite(overlap) || overlap < 0 || overlap > .3) {
		warn("Expected a valid shape, positive ordered sizeRange, gap >= 0 and overlap in [0, 0.3].");
		return finish([]);
	}
	if (shape !== "rect" && overlap) warn("overlap only applies to rect; using 0.");
	const source = (_props$data = props.data) !== null && _props$data !== void 0 ? _props$data : [];
	const explicitIds = source.flatMap((row) => row.id == null ? [] : [String(row.id)]);
	if (new Set(explicitIds).size !== explicitIds.length) {
		warn("data contains duplicate ids.");
		return finish([]);
	}
	const valid = (row) => typeof row.name === "string" && !!row.name.trim() && typeof row.value === "number" && Number.isFinite(row.value) && row.value >= 0;
	const [min, max] = cloudExtent(source.filter(valid).map((row) => row.value));
	const dark = props.darkMode === true;
	const theme = (_props$plotTheme = props.plotTheme) !== null && _props$plotTheme !== void 0 ? _props$plotTheme : {};
	const primary = (_theme$color = theme.color) !== null && _theme$color !== void 0 ? _theme$color : seerColors[0];
	const motionInput = typeof props.motion === "object" ? props.motion : {};
	let motion = props.motion && props.animation !== false ? {
		amplitude: (_motionInput$amplitud = motionInput.amplitude) !== null && _motionInput$amplitud !== void 0 ? _motionInput$amplitud : 12,
		amplitudeRatio: (_motionInput$amplitud2 = motionInput.amplitudeRatio) !== null && _motionInput$amplitud2 !== void 0 ? _motionInput$amplitud2 : [1, 1],
		duration: (_motionInput$duration = motionInput.duration) !== null && _motionInput$duration !== void 0 ? _motionInput$duration : 6e3,
		pauseOnHover: (_motionInput$pauseOnH = motionInput.pauseOnHover) !== null && _motionInput$pauseOnH !== void 0 ? _motionInput$pauseOnH : true
	} : void 0;
	if (motion && (!Number.isFinite(motion.amplitude) || motion.amplitude < 0 || motion.amplitude > 20 || !Array.isArray(motion.amplitudeRatio) || motion.amplitudeRatio.length !== 2 || !Array.from(motion.amplitudeRatio).every((value) => Number.isFinite(value) && value >= 0) || !Number.isFinite(motion.duration) || motion.duration <= 0 || typeof motion.pauseOnHover !== "boolean")) {
		warn("Expected motion amplitude in [0, 20], non-negative finite amplitudeRatio [x, y], duration > 0 and boolean pauseOnHover; motion disabled.");
		motion = void 0;
	}
	const settings = {
		shape,
		sizeRange,
		gap: shape === "rect" ? Math.max(8, gap) : gap,
		overlap: shape === "rect" ? overlap : 0,
		min,
		max,
		motion,
		rows: []
	};
	const categories = cloneDeep((_props$categories = props.categories) !== null && _props$categories !== void 0 ? _props$categories : []);
	const occurrences = /* @__PURE__ */ new Map();
	const usedIds = new Set(explicitIds);
	let invalid = 0;
	const data = source.map((row) => {
		var _occurrences$get, _theme$fontFamily, _theme$textColor, _item$emphasis;
		const item = cloneDeep(row);
		const occurrence = (_occurrences$get = occurrences.get(row.name)) !== null && _occurrences$get !== void 0 ? _occurrences$get : 0;
		occurrences.set(row.name, occurrence + 1);
		if (item.id == null) {
			let id = `ix-word:${row.name}:${occurrence}`;
			while (usedIds.has(id)) id += ":";
			item.id = id;
			usedIds.add(id);
		}
		const categoryIndex = typeof row.category === "string" ? categories.findIndex((category) => category.name === row.category) : row.category;
		const category = categoryIndex == null ? void 0 : categories[categoryIndex];
		if (categoryIndex != null && categoryIndex >= 0) item.category = categoryIndex;
		const label = mergePlotOptions({
			show: true,
			position: "inside",
			formatter: "{b}",
			fontFamily: (_theme$fontFamily = theme.fontFamily) !== null && _theme$fontFamily !== void 0 ? _theme$fontFamily : "sans-serif",
			fontWeight: "normal",
			fontStyle: "normal",
			fontSize: shape === "text" ? cloudSize(row.value, min, max, settings.sizeRange) : 14,
			color: shape === "text" ? "inherit" : (_theme$textColor = theme.textColor) !== null && _theme$textColor !== void 0 ? _theme$textColor : dark ? "#E7EDF7" : "#454D61",
			opacity: shape === "text" ? textOpacity(row.value, min, max) : 1,
			...shape === "text" ? {
				padding: [2, 4],
				borderRadius: 2,
				backgroundColor: "transparent"
			} : {},
			...shape === "rect" ? { padding: [4, 10] } : {}
		}, props.label, category === null || category === void 0 ? void 0 : category.label, row.label);
		item.label = label;
		for (const state of [
			"emphasis",
			"blur",
			"select"
		]) item[state] = mergePlotOptions(props[state], category === null || category === void 0 ? void 0 : category[state], row[state]);
		const isValid = valid(row);
		if (!isValid) invalid++;
		settings.rows.push({
			valid: isValid,
			label: cloneDeep(label),
			emphasisLabel: cloneDeep((_item$emphasis = item.emphasis) === null || _item$emphasis === void 0 ? void 0 : _item$emphasis.label),
			explicitSize: row.symbolSize != null || (category === null || category === void 0 ? void 0 : category.symbolSize) != null || props.symbolSize != null
		});
		return item;
	});
	if (invalid) warn(`Skipped ${invalid} item(s) with empty names or invalid non-negative weights.`);
	const series = mergePlotOptions({
		id: "word-cloud",
		type: "graph",
		layout: "none",
		edges: [],
		roam: false,
		draggable: false,
		left: 16,
		right: 16,
		top: 16,
		bottom: 16,
		color: (_props$color = props.color) !== null && _props$color !== void 0 ? _props$color : theme.palette,
		symbol: shape === "circle" ? "circle" : "rect",
		itemStyle: {
			color: props.color === void 0 && theme.palette === void 0 ? shape !== "circle" ? primary : getAlphaColor(primary, dark ? .2 : .12) : void 0,
			opacity: shape === "text" ? 0 : shape === "rect" ? .15 : 1,
			borderWidth: 0,
			...shape === "rect" ? { borderRadius: 2 } : {}
		},
		emphasis: {
			scale: false,
			...shape === "rect" ? {
				itemStyle: {
					color: "inherit",
					opacity: 1
				},
				label: { color: "#fff" }
			} : {}
		},
		select: {
			itemStyle: {
				borderWidth: 0,
				...shape === "rect" ? { opacity: 1 } : {}
			},
			...shape === "rect" ? { label: { color: "#fff" } } : {}
		}
	}, pick(props, wordCloudSeriesProps), {
		data,
		categories,
		__ixWordCloud: settings
	});
	const tooltip = convertArray(props.tooltip)[0];
	return mergeNativePlotOptions({
		animation: true,
		...shape === "rect" ? { legend: { itemStyle: { opacity: 1 } } } : {},
		...theme.palette ? { color: theme.palette } : {},
		tooltip: {
			trigger: "item",
			formatter: createPlotTooltipFormatter((params) => {
				var _props$name, _tooltip$valueFormatt, _tooltip$valueFormatt2, _item$color;
				const item = Array.isArray(params) ? params[0] : params;
				if (!item || typeof item.value !== "number" || !Number.isFinite(item.value)) return;
				return {
					title: item.name,
					rows: [{
						name: String((_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : "数值"),
						value: (_tooltip$valueFormatt = tooltip === null || tooltip === void 0 || (_tooltip$valueFormatt2 = tooltip.valueFormatter) === null || _tooltip$valueFormatt2 === void 0 ? void 0 : _tooltip$valueFormatt2.call(tooltip, item.value, item.dataIndex)) !== null && _tooltip$valueFormatt !== void 0 ? _tooltip$valueFormatt : String(item.value),
						color: getTooltipsColor((_item$color = item.color) !== null && _item$color !== void 0 ? _item$color : primary)
					}]
				};
			})
		},
		series: [series]
	}, props, wordCloudProps);
}
// ../plots/word-cloud/src/selection.ts
/** Keep native item selection across option resets and theme instance rebuilds. */
function createWordCloudSelection() {
	const selected = /* @__PURE__ */ new Map();
	let previousExplicit = /* @__PURE__ */ new Map();
	const rows = (option) => {
		return (Array.isArray(option.series) ? option.series : [option.series]).flatMap((item, seriesIndex) => (item === null || item === void 0 ? void 0 : item.__ixWordCloud) ? [{
			seriesIndex,
			data: item.data
		}] : []);
	};
	return {
		apply(option) {
			const next = /* @__PURE__ */ new Map();
			for (const { data } of rows(option)) for (const item of data) {
				const id = String(item.id);
				next.set(id, item.selected);
				if (!previousExplicit.has(id) || previousExplicit.get(id) !== item.selected) {
					if (item.selected !== void 0) selected.set(id, item.selected);
				}
				if (selected.has(id)) item.selected = selected.get(id);
			}
			for (const id of selected.keys()) if (!next.has(id)) selected.delete(id);
			previousExplicit = next;
			return option;
		},
		bind(chart) {
			const batch = rows(chart.getOption()).flatMap(({ seriesIndex, data }) => data.flatMap((item, dataIndex) => selected.get(String(item.id)) ? [{
				seriesIndex,
				dataType: "node",
				dataIndex
			}] : []));
			if (batch.length) chart.dispatchAction({
				type: "select",
				batch
			}, { silent: true });
			chart.on("selectchanged", (event) => {
				const payload = event;
				for (const { seriesIndex, data } of rows(chart.getOption())) {
					var _payload$selected$fin, _payload$selected;
					const indices = new Set((_payload$selected$fin = (_payload$selected = payload.selected) === null || _payload$selected === void 0 || (_payload$selected = _payload$selected.find((item) => item.seriesIndex === seriesIndex && item.dataType !== "edge")) === null || _payload$selected === void 0 ? void 0 : _payload$selected.dataIndex) !== null && _payload$selected$fin !== void 0 ? _payload$selected$fin : []);
					data.forEach((item, index) => selected.set(String(item.id), indices.has(index)));
				}
			});
		}
	};
}
// ../plots/word-cloud/src/motion.ts
function motionAmplitude(settings, value) {
	var _settings$motion, _settings$motion$ampl, _settings$motion2;
	if (!((_settings$motion = settings.motion) === null || _settings$motion === void 0 ? void 0 : _settings$motion.amplitudeRatio.some((ratio) => ratio > 0))) return 0;
	const weight = settings.max === settings.min ? .5 : Math.max(0, Math.min(1, (value - settings.min) / (settings.max - settings.min)));
	return ((_settings$motion$ampl = (_settings$motion2 = settings.motion) === null || _settings$motion2 === void 0 ? void 0 : _settings$motion2.amplitude) !== null && _settings$motion$ampl !== void 0 ? _settings$motion$ampl : 0) * (1 - weight * .3);
}
/** Overlap permits free motion; reserve only viewport space in that mode. */
function reserveMotion(node, amplitude, allowOverlap = false) {
	if (!amplitude) return node;
	const expand = (box) => ({
		x: box.x - amplitude,
		y: box.y - amplitude,
		width: box.width + amplitude * 2,
		height: box.height + amplitude * 2
	});
	if (allowOverlap) return {
		...node,
		viewportBounds: expand(node.bounds)
	};
	return {
		...node,
		overlapArea: node.body.width * node.body.height,
		body: expand(node.body),
		bounds: expand(node.bounds),
		labels: node.labels.map(expand)
	};
}
function wordHash(id) {
	let hash = 0x811c9dc5;
	for (let index = 0; index < id.length; index++) hash = Math.imul(hash ^ id.charCodeAt(index), 16777619);
	hash = Math.imul(hash ^ hash >>> 16, 0x85ebca6b);
	hash = Math.imul(hash ^ hash >>> 13, 0xc2b2ae35);
	return (hash ^ hash >>> 16) >>> 0;
}
/** Own only the symbol's offset. Graph owns its parent's layout position and scale. */
function createMotion(api, view) {
	var _document$defaultView, _document$defaultView2;
	const dom = api.getDom();
	const document = dom.ownerDocument;
	const media = (_document$defaultView = document.defaultView) === null || _document$defaultView === void 0 || (_document$defaultView2 = _document$defaultView.matchMedia) === null || _document$defaultView2 === void 0 ? void 0 : _document$defaultView2.call(_document$defaultView, "(prefers-reduced-motion: reduce)");
	const entries = /* @__PURE__ */ new Map();
	let settings;
	const zr = api.getZr();
	let hoveredTarget;
	const isWordHovered = () => {
		let target = hoveredTarget;
		while (target) {
			var _target$__hostTarget;
			if (entries.has(target)) return true;
			target = (_target$__hostTarget = target.__hostTarget) !== null && _target$__hostTarget !== void 0 ? _target$__hostTarget : target.parent;
		}
		return false;
	};
	const clear = () => {
		for (const [path] of entries) {
			path.stopAnimation("ix-word-cloud-motion");
			path.attr({
				x: 0,
				y: 0
			});
		}
		entries.clear();
		hoveredTarget = void 0;
	};
	const pause = () => {
		var _settings$motion3;
		if (media === null || media === void 0 ? void 0 : media.matches) {
			clear();
			return;
		}
		const paused = document.hidden || dom.getAttribute("aria-busy") === "true" || isWordHovered() && (settings === null || settings === void 0 || (_settings$motion3 = settings.motion) === null || _settings$motion3 === void 0 ? void 0 : _settings$motion3.pauseOnHover);
		for (const { animator } of entries.values()) {
			if (!animator.getClip()) continue;
			if (paused) animator.pause();
			else animator.resume();
		}
		if (!paused && entries.size) api.getZr().wakeUp();
	};
	const move = (event) => {
		hoveredTarget = event.target;
		pause();
	};
	const leave = () => {
		hoveredTarget = void 0;
		pause();
	};
	const reduced = () => {
		if (media === null || media === void 0 ? void 0 : media.matches) clear();
		else if (series) sync(series, seriesFiltered);
	};
	let seriesFiltered = false;
	let series;
	const sync = (model, filtered = false) => {
		series = model;
		seriesFiltered = filtered;
		settings = model.option.__ixWordCloud;
		const motion = settings === null || settings === void 0 ? void 0 : settings.motion;
		if (!motion || !motion.amplitude || filtered || !model.isAnimationEnabled() || (media === null || media === void 0 ? void 0 : media.matches)) {
			clear();
			return;
		}
		const ratioScale = Math.max(...motion.amplitudeRatio);
		if (!ratioScale) {
			clear();
			return;
		}
		const rx = motion.amplitudeRatio[0] / ratioScale;
		const ry = motion.amplitudeRatio[1] / ratioScale;
		const ratioLength = Math.hypot(rx, ry);
		const retained = /* @__PURE__ */ new Set();
		const data = model.getData();
		data.each((index) => {
			const symbol = data.getItemGraphicEl(index);
			const path = symbol === null || symbol === void 0 ? void 0 : symbol.childAt(0);
			if (!path) return;
			retained.add(path);
			const hash = wordHash(data.getId(index));
			const amplitude = motionAmplitude(settings, Number(model.getRawValue(index)));
			const amplitudeX = amplitude * rx / ratioLength;
			const amplitudeY = amplitude * ry / ratioLength;
			const duration = motion.duration * (.8 + hash % 401 / 1e3);
			const matrix = symbol.getComputedTransform();
			const scaleX = matrix ? Math.hypot(matrix[0], matrix[1]) : 1;
			const scaleY = matrix ? Math.hypot(matrix[2], matrix[3]) : 1;
			if (!scaleX || !scaleY) return;
			const signature = JSON.stringify([
				amplitudeX,
				amplitudeY,
				duration,
				scaleX,
				scaleY
			]);
			const previous = entries.get(path);
			if ((previous === null || previous === void 0 ? void 0 : previous.signature) === signature && previous.animator.getClip()) return;
			path.stopAnimation("ix-word-cloud-motion");
			const phase = previous && amplitudeX > 0 && amplitudeY > 0 ? Math.atan2(path.y * scaleY / amplitudeY, path.x * scaleX / amplitudeX) : hash / 4294967296 * Math.PI * 2;
			const direction = hash % 2 ? 1 : -1;
			const offset = (progress) => ({
				x: Math.cos(phase + progress * Math.PI * 2 * direction) * amplitudeX / scaleX,
				y: Math.sin(phase + progress * Math.PI * 2 * direction) * amplitudeY / scaleY
			});
			path.attr(offset(0));
			const animator = path.animate("", true);
			animator.scope = "ix-word-cloud-motion";
			for (let step = 1; step <= 48; step++) animator.when(duration * step / 48, offset(step / 48));
			animator.start("linear");
			entries.set(path, {
				animator,
				signature
			});
		});
		for (const [path] of entries) {
			if (retained.has(path)) continue;
			path.stopAnimation("ix-word-cloud-motion");
			path.attr({
				x: 0,
				y: 0
			});
			entries.delete(path);
		}
		pause();
	};
	zr.on("mousemove", move);
	zr.on("globalout", leave);
	document.addEventListener("visibilitychange", pause);
	if (media === null || media === void 0 ? void 0 : media.addEventListener) media.addEventListener("change", reduced);
	else media === null || media === void 0 || media.addListener(reduced);
	const observer = new MutationObserver(pause);
	observer.observe(dom, {
		attributes: true,
		attributeFilter: ["aria-busy"]
	});
	const dispose = view.dispose;
	view.dispose = function(...args) {
		clear();
		observer.disconnect();
		zr.off("mousemove", move);
		zr.off("globalout", leave);
		document.removeEventListener("visibilitychange", pause);
		if (media === null || media === void 0 ? void 0 : media.removeEventListener) media.removeEventListener("change", reduced);
		else media === null || media === void 0 || media.removeListener(reduced);
		dispose.apply(this, args);
	};
	const remove = view.remove;
	view.remove = function(...args) {
		clear();
		remove.apply(this, args);
	};
	return { sync };
}
function installWordCloudMotion() {
	const controllers = /* @__PURE__ */ new WeakMap();
	registerPostUpdate((ecModel, api) => {
		if (api.isSSR() || !api.getDom()) return;
		ecModel.eachRawSeriesByType("graph", (model) => {
			var _model$option$__ixWor;
			const view = api.getViewOfSeriesModel(model);
			let controller = controllers.get(view);
			if (!controller && ((_model$option$__ixWor = model.option.__ixWordCloud) === null || _model$option$__ixWor === void 0 ? void 0 : _model$option$__ixWor.motion)) {
				controller = createMotion(api, view);
				controllers.set(view, controller);
			}
			controller === null || controller === void 0 || controller.sync(model, ecModel.isSeriesFiltered(model));
		});
	});
}
// ../plots/word-cloud/src/wordCloudLayout.ts
var measurementCaches = /* @__PURE__ */ new WeakMap();
var fontRevision = 0;
function invalidateWordCloudFonts() {
	fontRevision++;
}
var geometryKeys = [
	"show",
	"fontFamily",
	"fontSize",
	"fontStyle",
	"fontWeight",
	"lineHeight",
	"width",
	"height",
	"padding",
	"borderWidth",
	"align",
	"verticalAlign",
	"position",
	"distance",
	"offset",
	"rotate",
	"overflow",
	"lineOverflow",
	"ellipsis"
];
function union(boxes) {
	const left = Math.min(...boxes.map((box) => box.x)), top = Math.min(...boxes.map((box) => box.y));
	return {
		x: left,
		y: top,
		width: Math.max(...boxes.map((box) => box.x + box.width)) - left,
		height: Math.max(...boxes.map((box) => box.y + box.height)) - top
	};
}
/** Measure using the same native text parser and host positioning as GraphView. */
function measureLabel(label, text, width, height, context) {
	var _label$backgroundColo, _label$position, _label$distance, _label$rotate, _label$borderWidth;
	if (label.show === false || !text) return;
	const host = new Rect({ shape: {
		x: -width / 2,
		y: -height / 2,
		width,
		height
	} });
	const content = new ZRText({ style: {
		...createTextStyle(new Model(label, void 0, context.ecModel)),
		backgroundColor: (_label$backgroundColo = label.backgroundColor) !== null && _label$backgroundColo !== void 0 ? _label$backgroundColo : "transparent",
		text
	} });
	host.setTextContent(content);
	host.setTextConfig({
		position: (_label$position = label.position) !== null && _label$position !== void 0 ? _label$position : "inside",
		distance: (_label$distance = label.distance) !== null && _label$distance !== void 0 ? _label$distance : 5,
		offset: label.offset,
		rotation: ((_label$rotate = label.rotate) !== null && _label$rotate !== void 0 ? _label$rotate : 0) * Math.PI / 180
	});
	host.updateInnerText();
	const box = content.getBoundingRect().clone();
	box.applyTransform(content.getComputedTransform());
	const border = ((_label$borderWidth = label.borderWidth) !== null && _label$borderWidth !== void 0 ? _label$borderWidth : 0) / 2;
	return {
		x: box.x - border,
		y: box.y - border,
		width: box.width + border * 2,
		height: box.height + border * 2
	};
}
function installWordCloudLayout() {
	registerVisual(PRIORITY.VISUAL.CHART - 1, {
		seriesType: "graph",
		reset(seriesModel) {
			if (!seriesModel.option.__ixWordCloud) return;
			const data = seriesModel.getData();
			const sizes = [];
			data.each((index) => {
				sizes[data.getRawIndex(index)] = data.getItemVisual(index, "symbolSize");
			});
			data.setLayout("ixWordCloudSizes", sizes);
		}
	});
	registerLayout(PRIORITY.VISUAL.POST_CHART_LAYOUT + 10, {
		seriesType: "graph",
		reset(seriesModel, _ecModel, api) {
			const option = seriesModel.option;
			const settings = option.__ixWordCloud;
			if (!settings) return;
			const data = seriesModel.getData();
			const frame = getLayoutRect(option, {
				width: api.getWidth(),
				height: api.getHeight()
			});
			let cache = measurementCaches.get(seriesModel);
			if (!cache || cache.revision !== fontRevision) {
				cache = {
					revision: fontRevision,
					boxes: /* @__PURE__ */ new Map()
				};
				measurementCaches.set(seriesModel, cache);
			}
			const measure = (label, text, width, height) => {
				var _label$rich;
				const rich = Object.fromEntries(Object.entries((_label$rich = label.rich) !== null && _label$rich !== void 0 ? _label$rich : {}).map(([name, style]) => [name, pick(style, [...geometryKeys, "backgroundColor"])]));
				const key = JSON.stringify([
					text,
					width,
					height,
					pick(label, geometryKeys),
					rich
				]);
				if (cache.boxes.has(key)) return cache.boxes.get(key);
				if (cache.boxes.size >= 2048) cache.boxes.clear();
				const box = measureLabel(label, text, width, height, seriesModel);
				cache.boxes.set(key, box);
				return box;
			};
			const nodes = [];
			const invalidSizes = [];
			data.each((index) => {
				var _data$getItemVisual, _data$getLayout, _seriesModel$getForma2, _itemModel$getModel$g;
				data.setItemLayout(index, [NaN, NaN]);
				const rawIndex = data.getRawIndex(index);
				const row = settings.rows[rawIndex];
				if (!(row === null || row === void 0 ? void 0 : row.valid) || frame.width <= 0 || frame.height <= 0) return;
				const itemModel = data.getItemModel(index);
				const itemOption = itemModel.option;
				const value = Number(seriesModel.getRawValue(index));
				const size = cloudSize(value, settings.min, settings.max, settings.sizeRange, settings.shape === "circle");
				const visualSize = (_data$getItemVisual = data.getItemVisual(index, "symbolSize")) !== null && _data$getItemVisual !== void 0 ? _data$getItemVisual : (_data$getLayout = data.getLayout("ixWordCloudSizes")) === null || _data$getLayout === void 0 ? void 0 : _data$getLayout[rawIndex];
				let width = row.explicitSize ? Number(Array.isArray(visualSize) ? visualSize[0] : visualSize) : settings.shape === "circle" ? size : 0;
				let height = row.explicitSize ? Number(Array.isArray(visualSize) ? visualSize[1] : visualSize) : settings.shape === "circle" ? size : 0;
				if (row.explicitSize && (!(width > 0 && height > 0) || !Number.isFinite(width + height) || settings.shape === "circle" && width !== height)) {
					invalidSizes.push(rawIndex);
					return;
				}
				const label = mergePlotOptions(row.label);
				if (settings.shape === "text") {
					const fill = label.color === "inherit" || label.color == null ? data.getItemVisual(index, "style").fill : label.color;
					itemOption.emphasis = {
						...itemOption.emphasis,
						label: mergePlotOptions({
							color: typeof fill === "string" ? lift(fill, -.1) : void 0,
							opacity: 1
						}, row.emphasisLabel)
					};
				}
				if (label.width == null) {
					var _label$overflow, _seriesModel$getForma, _ref, _padding$, _ref2, _ref3, _padding$2, _natural$width;
					label.width = settings.shape === "circle" ? width * .7 : Math.max(0, Math.min(240, frame.width - 24));
					(_label$overflow = label.overflow) !== null && _label$overflow !== void 0 || (label.overflow = "truncate");
					const natural = measure({
						...label,
						width: void 0
					}, (_seriesModel$getForma = seriesModel.getFormattedLabel(index)) !== null && _seriesModel$getForma !== void 0 ? _seriesModel$getForma : data.getName(index), width, height);
					const padding = label.padding;
					const horizontalPadding = Array.isArray(padding) ? ((_ref = (_padding$ = padding[1]) !== null && _padding$ !== void 0 ? _padding$ : padding[0]) !== null && _ref !== void 0 ? _ref : 0) + ((_ref2 = (_ref3 = (_padding$2 = padding[3]) !== null && _padding$2 !== void 0 ? _padding$2 : padding[1]) !== null && _ref3 !== void 0 ? _ref3 : padding[0]) !== null && _ref2 !== void 0 ? _ref2 : 0) : (padding !== null && padding !== void 0 ? padding : 0) * 2;
					label.width = Math.min(label.width, Math.max(0, Math.ceil(((_natural$width = natural === null || natural === void 0 ? void 0 : natural.width) !== null && _natural$width !== void 0 ? _natural$width : 0) - horizontalPadding) + 2));
				}
				if (settings.shape === "circle" && label.height == null) {
					var _label$overflow2;
					label.height = height * .7;
					(_label$overflow2 = label.overflow) !== null && _label$overflow2 !== void 0 || (label.overflow = "truncate");
				}
				itemOption.label = label;
				const normalText = (_seriesModel$getForma2 = seriesModel.getFormattedLabel(index)) !== null && _seriesModel$getForma2 !== void 0 ? _seriesModel$getForma2 : data.getName(index);
				const initial = measure(label, normalText, width, height);
				if (!row.explicitSize) {
					if (settings.shape !== "circle") {
						var _initial$width, _initial$height;
						width = (_initial$width = initial === null || initial === void 0 ? void 0 : initial.width) !== null && _initial$width !== void 0 ? _initial$width : 1;
						height = Math.max((_initial$height = initial === null || initial === void 0 ? void 0 : initial.height) !== null && _initial$height !== void 0 ? _initial$height : 1, settings.shape === "rect" ? size : 1);
					}
				} else if (settings.shape === "text" && initial) {
					width = Math.max(width, initial.width);
					height = Math.max(height, initial.height);
				}
				const border = Math.max(Number((_itemModel$getModel$g = itemModel.getModel("itemStyle").getItemStyle().lineWidth) !== null && _itemModel$getModel$g !== void 0 ? _itemModel$getModel$g : 0), ...[
					"emphasis",
					"select",
					"blur"
				].map((state) => {
					var _itemOption$state$ite, _itemOption$state;
					return Number((_itemOption$state$ite = (_itemOption$state = itemOption[state]) === null || _itemOption$state === void 0 || (_itemOption$state = _itemOption$state.itemStyle) === null || _itemOption$state === void 0 ? void 0 : _itemOption$state.borderWidth) !== null && _itemOption$state$ite !== void 0 ? _itemOption$state$ite : 0);
				}));
				const body = {
					x: -width / 2 - border / 2,
					y: -height / 2 - border / 2,
					width: width + border,
					height: height + border
				};
				const labels = [];
				const normal = measure(label, normalText, width, height);
				if (normal) labels.push(normal);
				for (const state of [
					"emphasis",
					"select",
					"blur"
				]) {
					var _itemOption$state2, _seriesModel$getForma3;
					const stateLabel = mergePlotOptions(label, (_itemOption$state2 = itemOption[state]) === null || _itemOption$state2 === void 0 ? void 0 : _itemOption$state2.label);
					const stateText = (_seriesModel$getForma3 = seriesModel.getFormattedLabel(index, state)) !== null && _seriesModel$getForma3 !== void 0 ? _seriesModel$getForma3 : normalText;
					const box = measure(stateLabel, stateText, width, height);
					if (box) labels.push(box);
				}
				const outsideLabels = settings.shape === "circle" ? labels.filter((box) => [
					[box.x, box.y],
					[box.x + box.width, box.y],
					[box.x, box.y + box.height],
					[box.x + box.width, box.y + box.height]
				].some(([x, y]) => Math.hypot(x, y) > body.width / 2)) : labels;
				const rect = settings.shape === "rect";
				const extent = Math.max(width, height);
				data.setItemVisual(index, "symbolSize", rect ? [extent, extent] : [width, height]);
				data.setItemVisual(index, "symbolKeepAspect", rect);
				const borderRadius = itemModel.getModel("itemStyle").get("borderRadius");
				const radius = settings.shape === "rect" && typeof borderRadius === "number" && Number.isFinite(borderRadius) ? Math.max(0, Math.min(borderRadius, width / 2, height / 2)) : 0;
				const symbol = radius ? `path://M${radius},0H${width - radius}A${radius},${radius} 0 0 1 ${width},${radius}V${height - radius}A${radius},${radius} 0 0 1 ${width - radius},${height}H${radius}A${radius},${radius} 0 0 1 0,${height - radius}V${radius}A${radius},${radius} 0 0 1 ${radius},0Z` : rect ? `path://M0,0H${width}V${height}H0Z` : settings.shape === "circle" ? "circle" : "rect";
				data.setItemVisual(index, "symbol", symbol);
				nodes.push(reserveMotion({
					index,
					id: data.getId(index),
					value,
					body,
					labels: outsideLabels,
					bounds: union([body, ...labels]),
					circle: settings.shape === "circle",
					rect: settings.shape === "rect"
				}, motionAmplitude(settings, value), settings.shape === "rect" && settings.overlap > 0));
			});
			const invalidSizeKey = JSON.stringify(invalidSizes);
			if (invalidSizes.length && cache.invalidSizes !== invalidSizeKey) console.warn(`[IxWordCloudChart] Skipped invalid symbolSize at data indices ${invalidSizes.join(", ")}.`);
			cache.invalidSizes = invalidSizeKey;
			const placed = layoutCloud(nodes, frame, settings.gap, settings.overlap);
			const coord = seriesModel.coordinateSystem;
			placed.forEach((node, priority) => {
				data.setItemLayout(node.index, coord.pointToData([node.x, node.y]));
				data.setItemVisual(node.index, "liftZ", (placed.length - priority) / Math.max(1, placed.length));
			});
		}
	});
}
// ../plots/word-cloud/assets/loading.svg?raw
var loading_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"90\" height=\"90\" viewBox=\"0 0 90 90\" fill=\"none\"><ellipse cx=\"45\" cy=\"73\" rx=\"37\" ry=\"4\" fill=\"#F7F9FC\"/><g fill=\"#E1E5EB\"><rect x=\"26\" y=\"17\" width=\"38\" height=\"8\" rx=\"2\"/><rect x=\"9\" y=\"29\" width=\"29\" height=\"9\" rx=\"2\"/><rect x=\"43\" y=\"29\" width=\"38\" height=\"9\" rx=\"2\"/><rect x=\"23\" y=\"42\" width=\"44\" height=\"12\" rx=\"2\"/><rect x=\"10\" y=\"58\" width=\"32\" height=\"8\" rx=\"2\"/><rect x=\"47\" y=\"58\" width=\"30\" height=\"8\" rx=\"2\"/></g></svg>";
// ../plots/word-cloud/src/WordCloud.ts
var WordCloud_default = withChartProps()(defineComponent({
	name: "IxWordCloudChart",
	inheritAttrs: false,
	slots: Object,
	props: [...wordCloudProps],
	methods: plotInstanceMethods,
	setup(props, context) {
		const attrs = useReactiveAttrs(context.attrs);
		const dark = usePlotDark(() => attrs.value);
		let chart;
		const selection = createWordCloudSelection();
		const fonts = typeof document === "undefined" ? void 0 : document.fonts;
		const refreshFonts = () => {
			invalidateWordCloudFonts();
			if (chart && !chart.isDisposed()) chart.resize();
		};
		fonts === null || fonts === void 0 || fonts.addEventListener("loadingdone", refreshFonts);
		onBeforeUnmount(() => fonts === null || fonts === void 0 ? void 0 : fonts.removeEventListener("loadingdone", refreshFonts));
		return usePlotRender(context, () => ({
			...props,
			darkMode: dark.value
		}), (input) => {
			const option = createWordCloudOption({
				...input,
				motion: input.motion === "" ? true : input.motion,
				darkMode: dark.value
			});
			selection.apply(option);
			return option;
		}, {
			loadingIcon: loading_default,
			mergeDataUpdates: true,
			resetOnDataIdentityChange: true,
			onReady: (instance) => {
				chart = instance;
				selection.bind(instance);
			}
		});
	}
}));
// ../plots/word-cloud/index.ts
var IxWordCloudChart = createInstall(WordCloud_default, [
	install,
	installWordCloudLayout,
	installWordCloudMotion,
	installLabelLayout,
	install$1,
	install$2,
	install$3,
	install$4
]);
export { IxWordCloudChart as t };
