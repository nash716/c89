#include "ppapi/cpp/instance.h"
#include "ppapi/cpp/module.h"
#include "ppapi/cpp/network_list.h"
#include "ppapi/cpp/network_monitor.h"
#include "ppapi/cpp/net_address.h"
#include "ppapi/cpp/var.h"
#include "ppapi/cpp/var_array.h"
#include "ppapi/utility/completion_callback_factory.h"

class NetworkSurveyInstance : public pp::Instance {
	public:
	explicit NetworkSurveyInstance(PP_Instance instance) : pp::Instance(instance), factory_(this), monitor_(this) {	}
	virtual ~NetworkSurveyInstance() { }

	private:
	pp::NetworkMonitor monitor_;
	pp::CompletionCallbackFactory<NetworkSurveyInstance> factory_;

	virtual void HandleMessage(const pp::Var& var_message) {
		monitor_.UpdateNetworkList(factory_.NewCallbackWithOutput(&NetworkSurveyInstance::OnUpdateNetworkList));
	}

	void OnUpdateNetworkList(int result, pp::NetworkList list) {
		int elements = 0;
		pp::VarArray message;

		std::vector<pp::NetAddress> addrs;

		for (int i = 0; i < list.GetCount(); i++) {
			int ret = list.GetIpAddresses(i, &addrs);

			if (ret != PP_OK) {
				message.Set(elements++, "error");
				continue;
			}

			for (int j = 0; j < addrs.size(); j++) {
				message.Set(elements++, addrs[j].DescribeAsString(false).AsString());
			}
		}

		PostMessage(message);
	}
};

class NetworkSurveyModule : public pp::Module {
	public:
	NetworkSurveyModule() : pp::Module() { }
	virtual ~NetworkSurveyModule() { }

	virtual pp::Instance *CreateInstance(PP_Instance instance) {
		return new NetworkSurveyInstance(instance);
	}
};

namespace pp {
Module *CreateModule() {
	return new NetworkSurveyModule();
}
}
